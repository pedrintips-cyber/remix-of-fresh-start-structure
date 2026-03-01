import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PARADISE_API_KEY = Deno.env.get('PARADISE_API_KEY');
    if (!PARADISE_API_KEY) {
      throw new Error('PARADISE_API_KEY is not configured');
    }

    const { amount, name, email, document, phone, reference } = await req.json();

    // Validate required fields
    if (!amount || !name || !email || !document || !phone) {
      return new Response(
        JSON.stringify({ error: 'Campos obrigatórios: amount, name, email, document, phone' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate amount (minimum R$ 10,00 = 1000 centavos)
    if (typeof amount !== 'number' || amount < 1000) {
      return new Response(
        JSON.stringify({ error: 'Valor mínimo de doação: R$ 10,00' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const transactionRef = reference || `DOA-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    const payload = {
      amount,
      description: "Doação S.O.S UBÁ",
      reference: transactionRef,
      source: "api_externa",
      customer: {
        name,
        email,
        document: document.replace(/\D/g, ''),
        phone: phone.replace(/\D/g, ''),
      },
    };

    console.log('Creating Paradise transaction:', { amount, reference: transactionRef });

    const response = await fetch('https://multi.paradisepags.com/api/v1/transaction.php', {
      method: 'POST',
      headers: {
        'X-API-Key': PARADISE_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.log('Paradise API raw response:', responseText);
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      console.error('Failed to parse Paradise response:', responseText);
      return new Response(
        JSON.stringify({ error: 'Resposta inválida do gateway de pagamento' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!response.ok) {
      console.error('Paradise API error:', response.status, data);
      return new Response(
        JSON.stringify({ error: 'Erro ao criar pagamento', details: data }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Paradise full response:', JSON.stringify(data));

    const pixCode = data.qr_code || data.pix_copy_paste || data.pix?.copy_paste || null;
    const pixQrBase64 = data.qr_code_base64 || null;

    return new Response(
      JSON.stringify({
        success: true,
        message: data.message || null,
        transaction_id: data.transaction_id,
        id: data.id,
        qr_code: pixCode,
        qr_code_base64: pixQrBase64,
        amount: data.amount || null,
        expires_at: data.expires_at || null,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in create-pix-payment:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

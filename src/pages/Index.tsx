import Header from "@/components/Header";
import CampaignContent from "@/components/CampaignContent";
import DonationSidebar from "@/components/DonationSidebar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 lg:py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="min-w-0 flex-1 lg:max-w-[calc(100%-400px)]">
            <CampaignContent />
          </div>
          <DonationSidebar />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

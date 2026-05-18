import Banner from "@/components/banner";
import Category from "@/components/category";
import Product from "@/components/Product";
import PromoSection from "@/components/home/PromoSection";
import TrustStrip from "@/components/home/TrustStrip";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Banner />
      <TrustStrip />
      <Category />
      <Product />
      <PromoSection />
    </main>
  );
}

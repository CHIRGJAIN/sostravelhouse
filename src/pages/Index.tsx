import HeroSection from "@/components/home/HeroSection";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import WhyEngeeSection from "@/components/home/WhyEngeeSection";
import PopularPackages from "@/components/home/PopularPackages";
import ReviewsSection from "@/components/home/ReviewsSection";
import FAQSection from "@/components/home/FAQSection";
import NewsletterSection from "@/components/home/NewsletterSection";

const Index = () => {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <PopularPackages />
      <WhyEngeeSection />
      <ReviewsSection />
      <FAQSection />
      <NewsletterSection />
    </>
  );
};

export default Index;

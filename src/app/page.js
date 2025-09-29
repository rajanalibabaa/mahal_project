import dynamic from "next/dynamic";

const ProvidingEvents = dynamic(() => import("@/Components/ProvidingEvents/providingEvent"), {
  loading: () => <p>Loading...</p>, // optional fallback
});

const FAQSection = dynamic(() => import("@/Components/FaqComponents"));
const StatsSection = dynamic(() => import("@/Components/StatusSection"));

import HomePage from "./HomePage";
import EcoFriendly from "@/Components/EcoFriendly";
import Footer from "@/Components/Footer";

export default function Page() {
  return (
    <>
      <HomePage />
      <ProvidingEvents />
            <EcoFriendly/>

      <StatsSection />
      <FAQSection />
        <Footer/>
    </>
  );
}

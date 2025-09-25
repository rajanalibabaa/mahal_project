import ProvidingEvents from "@/Components/ProvidingEvents/providingEvent";
import HomePage from "./HomePage";
import FAQSection from "@/Components/FaqComponents";
import StatsSection from "@/Components/StatusSection";

export default function Page() {
    return (
        <>
        <HomePage />
        <ProvidingEvents  />
        <StatsSection/>
        <FAQSection/>
        </>
    );
}
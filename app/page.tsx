import {
    LandingCta,
} from "@/components/marketing/LandingCta";

import {
    LandingCustomerSection,
} from "@/components/marketing/LandingCustomerSection";

import {
    LandingDeveloperSection,
} from "@/components/marketing/LandingDeveloperSection";

import {
    LandingFooter,
} from "@/components/marketing/LandingFooter";

import {
    LandingHero,
} from "@/components/marketing/LandingHero";

import {
    LandingHowItWorks,
} from "@/components/marketing/LandingHowItWorks";

import {
    LandingMerchantSection,
} from "@/components/marketing/LandingMerchantSection";

import {
    LandingNavbar,
} from "@/components/marketing/LandingNavbar";

import {
    LandingSecuritySection,
} from "@/components/marketing/LandingSecuritySection";

import {
    LandingTrustBar,
} from "@/components/marketing/LandingTrustBar";

export default function HomePage() {
    return (
        <>
            <LandingNavbar />

            <main>

                <LandingHero />

                <LandingTrustBar />

                <LandingHowItWorks />

                <LandingMerchantSection />

                <LandingCustomerSection />

                <LandingDeveloperSection />

                <LandingSecuritySection />

                <LandingCta />

            </main>

            <LandingFooter />
        </>
    );
}



// here is the next flattened page, provide the realistic version(s), ensuring to maintain consistency
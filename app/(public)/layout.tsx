import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlobalBackground } from "@/components/layout/GlobalBackground";
import { OrderModal } from "@/components/modals/OrderModal";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <GlobalBackground />
            <Navbar />
            <main className="pt-24 flex-grow relative z-10">
                {children}
            </main>
            <Footer />
            <OrderModal />
        </>
    );
}

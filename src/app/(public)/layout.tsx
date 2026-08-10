import { NewsletterModalHost } from "@/components/newsletter/newsletter-modal-host";
import { SiteModalHost } from "@/components/site-modals";
import { WhatsAppCommunityFloat } from "@/components/community/whatsapp-community-float";
import { AlertBar } from "@/components/site/alert-bar";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AlertBar />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsAppCommunityFloat />
      <SiteModalHost />
      <NewsletterModalHost />
    </>
  );
}

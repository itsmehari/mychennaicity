import QRCode from "qrcode";

/** QR of the post-submit invite. Hidden on very small screens by the parent. */
export async function WhatsappJoinQr({ url }: { url: string }) {
  const svg = await QRCode.toString(url, {
    type: "svg",
    margin: 1,
    width: 168,
    errorCorrectionLevel: "M",
  });
  const safe = svg.replace(/<\?xml[^>]*>/, "").replace(/<!DOCTYPE[^>]*>/, "");
  return (
    <div
      className="rounded-2xl bg-white p-3"
      aria-hidden
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}

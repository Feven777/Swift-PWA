import OrderTracking from "@/components/order-tracking";
import Script from "next/script";

export default function TrackingPage({
  params,
}: {
  params: { orderNumber: string };
}) {
  const { orderNumber } = params;

  return (
    <>
      <Script
        id="google-maps"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        strategy="beforeInteractive"
      />
      <OrderTracking orderNumber={orderNumber} />
    </>
  );
}

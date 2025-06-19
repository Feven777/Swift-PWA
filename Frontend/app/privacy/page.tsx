export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Privacy Policy</h1>
      <p className="text-gray-700 mb-4">
        At Swift Delivery, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-600">1. Information We Collect</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li><strong>Personal Information:</strong> Name, email address, phone number, delivery address, and payment details.</li>
        <li><strong>Order Information:</strong> Products ordered, order history, and preferences.</li>
        <li><strong>Usage Data:</strong> Device information, IP address, browser type, and usage patterns.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-600">2. How We Use Your Information</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>To process and deliver your orders.</li>
        <li>To improve our services and personalize your experience.</li>
        <li>To communicate with you about your orders, offers, and updates.</li>
        <li>To comply with legal obligations and prevent fraud.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-600">3. Sharing Your Information</h2>
      <p className="text-gray-700 mb-4">
        We do not sell your personal information. We may share your data with trusted partners (such as supermarkets, delivery providers, and payment processors) only as necessary to fulfill your orders and provide our services.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-600">4. Cookies & Tracking</h2>
      <p className="text-gray-700 mb-4">
        We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage your cookie preferences in your browser settings.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-600">5. Your Rights & Choices</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>Access, update, or delete your personal information at any time.</li>
        <li>Opt out of marketing communications.</li>
        <li>Request a copy of the data we hold about you.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-600">6. Contact Us</h2>
      <p className="text-gray-700 mb-2">
        If you have any questions or concerns about your privacy, please <a href="/support" className="text-green-600 underline">contact our support team</a>.
      </p>
      <p className="text-xs text-gray-500 mt-8">This Privacy Policy may be updated from time to time. Please review it periodically for changes.</p>
    </div>
  );
} 
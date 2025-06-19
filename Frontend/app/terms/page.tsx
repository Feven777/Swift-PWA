export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Terms & Conditions</h1>
      <p className="text-gray-700 mb-4">
        Welcome to Swift Delivery! By using our website and services, you agree to the following terms and conditions. Please read them carefully.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-600">1. Acceptance of Terms</h2>
      <p className="text-gray-700 mb-4">
        By accessing or using Swift Delivery, you agree to be bound by these Terms & Conditions and our Privacy Policy. If you do not agree, please do not use our services.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-600">2. Use of Service</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>You must be at least 18 years old or have parental consent to use our service.</li>
        <li>You agree to provide accurate and complete information when creating an account or placing an order.</li>
        <li>We reserve the right to refuse service, terminate accounts, or cancel orders at our discretion.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-600">3. Orders & Payments</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>All orders are subject to availability and confirmation.</li>
        <li>Prices and availability may change without notice.</li>
        <li>Payment must be made in full at the time of order using approved payment methods.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-600">4. User Responsibilities</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>You are responsible for maintaining the confidentiality of your account information.</li>
        <li>You agree not to misuse the service or engage in fraudulent activity.</li>
        <li>Any violation of these terms may result in suspension or termination of your account.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-600">5. Limitation of Liability</h2>
      <p className="text-gray-700 mb-4">
        Swift Delivery is not liable for any indirect, incidental, or consequential damages arising from the use of our service. Our total liability is limited to the amount paid for your order.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-600">6. Changes to Terms</h2>
      <p className="text-gray-700 mb-4">
        We may update these Terms & Conditions from time to time. Continued use of the service constitutes acceptance of the revised terms.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-600">7. Contact Us</h2>
      <p className="text-gray-700 mb-2">
        If you have any questions about these Terms & Conditions, please <a href="/support" className="text-green-600 underline">contact our support team</a>.
      </p>
      <p className="text-xs text-gray-500 mt-8">Last updated: {new Date().getFullYear()}</p>
    </div>
  );
} 
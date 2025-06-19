export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4 text-green-700">About Us</h1>
      <p className="text-gray-700 mb-4">
        <strong>Swift Delivery</strong> was founded with a simple vision: to make grocery shopping effortless, fast, and accessible for everyone. We believe that your time is precious, and getting fresh groceries should never be a hassle.
      </p>
      <p className="text-gray-700 mb-4">
        Our platform connects you with the best supermarkets in your area, offering a wide selection of products delivered right to your doorstep. Whether you need fresh produce, pantry staples, or last-minute essentials, Swift Delivery is here to help.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-600">Our Mission</h2>
      <p className="text-gray-700 mb-4">
        To empower communities by making grocery shopping simple, transparent, and reliable. We are committed to providing exceptional service, supporting local businesses, and ensuring every customer enjoys a seamless experience.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-600">Our Values</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>Customer First: Your satisfaction is our top priority.</li>
        <li>Freshness Guaranteed: We partner with trusted supermarkets to deliver only the best.</li>
        <li>Community Focus: We support local stores and sustainable practices.</li>
        <li>Innovation: We continuously improve to serve you better.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-600">Meet the Team</h2>
      <p className="text-gray-700 mb-4">
        Our passionate team of shoppers, drivers, and support staff work around the clock to ensure your groceries arrive on time and in perfect condition. We're proud to be part of your community!
      </p>
      <div className="mt-8 p-4 bg-green-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-green-700">Have questions or feedback?</h3>
        <p className="text-gray-700 mb-2">We'd love to hear from you! Visit our <a href="/support" className="text-green-600 underline">Support</a> page to get in touch.</p>
      </div>
    </div>
  );
} 
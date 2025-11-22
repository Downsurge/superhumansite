export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="p-10 rounded-xl border border-white/20 bg-black/50 text-center">
        <h1 className="text-4xl font-bold mb-4 text-green-400">Payment Successful!</h1>
        <p className="text-gray-300 mb-4">
          Welcome to SUPERHUMAN Calisthenics.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Your training starts now.
        </p>
        <a
          href="/"
          className="px-6 py-3 border border-white/20 rounded-md hover:bg-white/10 transition"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}

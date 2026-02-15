import React, { useState } from "react";

const Subscription = () => {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");

  const handlePayment = () => {
    alert(`₹99 payment successful via ${selectedMethod}`);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold tracking-wide">
            Upgrade Your Experience
          </h1>
          <p className="text-neutral-400 mt-3">
            Choose a plan that fits your needs.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* Free Plan */}
          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Free Plan</h2>

            <p className="text-4xl font-bold mb-6">
              ₹0 <span className="text-base font-normal text-neutral-400">/month</span>
            </p>

            <ul className="space-y-3 text-neutral-400 mb-8">
              <li>Limited content access</li>
              <li>Ads included</li>
              <li>Standard quality streaming</li>
            </ul>

            <button className="w-full bg-neutral-700 py-3 rounded-lg cursor-not-allowed">
              Current Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="relative bg-neutral-950 border border-yellow-500 p-8 rounded-2xl shadow-2xl">

            <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-semibold px-4 py-1 rounded-bl-xl">
              MOST POPULAR
            </div>

            <h2 className="text-2xl font-semibold mb-4">Premium Plan</h2>

            <p className="text-4xl font-bold mb-6">
              ₹99 <span className="text-base font-normal text-neutral-400">/month</span>
            </p>

            <ul className="space-y-3 text-neutral-300 mb-8">
              <li>Unlimited Movies & Shows</li>
              <li>Ad-free streaming</li>
              <li>HD & Full HD quality</li>
              <li>Priority support</li>
            </ul>

            <button
              onClick={() => setShowPayment(true)}
              className="w-full bg-yellow-500 text-black font-semibold py-3 rounded-lg hover:bg-yellow-400 transition duration-300"
            >
              Upgrade for ₹99
            </button>

          </div>
        </div>

        {/* Payment Section */}
        {showPayment && (
          <div className="mt-16 max-w-2xl mx-auto bg-neutral-900 p-8 rounded-2xl border border-neutral-800 shadow-xl">

            <h2 className="text-2xl font-semibold mb-6 text-center">
              Complete Your Payment
            </h2>

            <p className="text-center text-neutral-400 mb-8">
              Total Amount: <span className="text-white font-semibold">₹99</span>
            </p>

            {/* Payment Methods */}
            <div className="space-y-4 mb-8">

              {["UPI", "Credit/Debit Card", "Net Banking"].map((method) => (
                <button
                  key={method}
                  onClick={() => setSelectedMethod(method)}
                  className={`w-full p-4 rounded-lg border transition duration-200 text-left ${
                    selectedMethod === method
                      ? "border-yellow-500 bg-neutral-800"
                      : "border-neutral-700 hover:border-neutral-500"
                  }`}
                >
                  {method}
                </button>
              ))}

            </div>

            <button
              disabled={!selectedMethod}
              onClick={handlePayment}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                selectedMethod
                  ? "bg-yellow-500 text-black hover:bg-yellow-400"
                  : "bg-neutral-700 cursor-not-allowed"
              }`}
            >
              Pay ₹99
            </button>

          </div>
        )}
<div className="border-t border-neutral-800 mt-20"></div>

      </div>
    </div>
  );
};

export default Subscription;

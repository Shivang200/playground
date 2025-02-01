import React from "react";

const FAQ = () => {
  return (
    <section id="faq" className="py-16 bg-black text-purple-500 relative overflow-hidden">
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-8 text-gray-300">
          Everything You Need to Know
        </h2>

        <div className="text-left mx-auto max-w-3xl">
          {[
            {
              q: "What is ChatHub?",
              a: "ChatHub is an anonymous messaging platform with chatrooms and private messaging.",
            },
            {
              q: "How can I create a customizable avatar?",
              a: "Use our avatar editor to create and personalize your chat identity.",
            },
            {
              q: "Is my data secure on ChatHub?",
              a: "Yes, we encrypt private messages and do not store personal data.",
            },
          ].map((faq, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">{faq.q}</h3>
              <p className="text-gray-300 text-lg">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Morphing Circle with Blur Effect */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-full animate-tiltCircle filter blur-xl opacity-60"></div>
    </section>
  );
};

export default FAQ;

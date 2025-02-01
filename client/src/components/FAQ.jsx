import React from "react";

const FAQ = () => {
  return (
    <section id="faq" className="py-16 bg-black text-purple-500 relative ">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-8 text-gray-300">
          Everything You Need to Know
        </h2>
        <div className=" text-left mx-auto max-w-3xl">
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
              <h3 className="text-2xl font-semibold mb-2">{faq.q}</h3>
              <p className="text-gray-300">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Morphing Circle in FAQ with Blur and Tilt */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-full animate-tiltCircle filter blur-lg"></div>
    </section>
  );
};

export default FAQ;

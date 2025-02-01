import React, { useEffect, useRef } from 'react';

const Feature = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (scrollContainer) {
      let scrollAmount = 0;
      const scrollSpeed = 1; // Adjust for speed

      const scrollFeatures = () => {
        scrollAmount += scrollSpeed;
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
        scrollContainer.style.transform = `translateX(-${scrollAmount}px)`;
        requestAnimationFrame(scrollFeatures);
      };

      scrollFeatures();
    }
  }, []);

  return (
    <section id="features" className="py-16 bg-black overflow-hidden">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-8">Features of ChatHub</h2>
        <div className="relative w-full overflow-hidden">
          <div className="flex space-x-8 w-max" ref={scrollRef}>
            {/* Feature Cards - Duplicated for Infinite Effect */}
            {Array(2)
              .fill([
                { title: 'Anonymous Chatrooms', desc: 'Join chatrooms and chat freely without revealing your identity.' },
                { title: 'Customizable Avatars', desc: 'Create and customize your own anonymous avatar.' },
                { title: 'Private Messaging', desc: 'Send private messages while keeping your identity concealed.' },
                { title: 'Moderation Tools', desc: 'Ensuring safe and respectful conversations for everyone.' }
              ])
              .flat()
              .map((feature, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-xs mx-4">
                  <h3 className="text-xl font-semibold text-purple-400 mb-4">{feature.title}</h3>
                  <p className="text-gray-300">{feature.desc}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;

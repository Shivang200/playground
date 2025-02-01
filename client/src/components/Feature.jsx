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
        <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-8">Features of GhostNet</h2>
        <div className="relative w-full overflow-hidden">
          <div className="flex space-x-8 w-max" ref={scrollRef}>
            {/* Feature Cards - Duplicated for Infinite Effect */}
            {Array(3)
              .fill([
                { title: 'Anonymous Chatrooms', desc: 'Join GhostNet and chat freely without revealing your identity, connecting with others in a safe and anonymous space.' },
                { title: 'Supportive Environment', desc: 'When anxiety feels overwhelming or you just need to vent, GhostNet is here for you. Come as you are, let it out.' },
                { title: 'Fun, Welcoming Community', desc: 'Connect with like-minded people for meaningful, supportive conversations that foster understanding and personal growth.' },
                { title: 'Private Groups', desc: 'Create your own private group, add people, and enjoy fun activities like guessing games—see if they can figure out who you are' },
                { title: 'Custom School Servers', desc: 'Create private servers for your college or school and chat anonymously with classmates in a fun, safe space.' },
                { title: 'Default Chatroom', desc: 'A welcoming space where all users can meet, chat, and connect freely in a supportive, anonymous environment.' }
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

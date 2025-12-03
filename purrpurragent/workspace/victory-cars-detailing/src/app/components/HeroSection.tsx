import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative bg-gray-900 text-white h-screen flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          src="/hero-bg.jpg"
          alt="Victory Cars Detailing"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
          Victory Cars Detailing
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Expert detailing for a showroom shine.
        </p>
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
          Discover Our Services
        </button>
      </div>
    </section>
  );
};

export default HeroSection;

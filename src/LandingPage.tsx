import React from 'react';
import Header from './Header';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      {/* Main content adjusted below fixed header */}
      <main className="bg-gray-300 flex flex-col md:flex-row justify-center items-center px-8 py-24 pt-40 gap-12">
        <div className="text-left max-w-md">
          <h2 className="text-2xl md:text-3xl font-semibold text-black">
            Welcome to the new age of mobile photography
          </h2>
        </div>
        <div className="bg-white flex items-center justify-center w-[500px] h-[500px] overflow-hidden rounded-xl shadow-lg">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/Dummyvid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </main>

      {/* Problem list section centered */}
      <section className="bg-gray-100 px-8 py-16 flex justify-center">
        <ul className="list-disc space-y-4 text-lg text-center text-black">
          <li>Issues taking photos of your partner?</li>
          <li>Random strangers unable to take good photos of you?</li>
          <li>Unpersonalized photos not enough for you?</li>
        </ul>
      </section>
    </div>
  );
};

export default LandingPage;
import React from 'react';
import Header from './Header';
import "tailwindcss";

const LandingPage: React.FC = () => {
  return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="bg-gray-300 px-8 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="text-left max-w-md">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">Welcome to the new age of mobile photography</h2>
            </div>
           
            <div className="bg-white flex items-center justify-center w-[100px] h-[15px] overflow-hidden rounded-xl shadow-lg ml-auto">
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
          </div>
        </main>
        <section className="px-8 py-12 text-left text-lg text-black">
          <p className="mb-4">Issues taking photos of your partner?</p>
          <p className="mb-4">Random strangers unable to take good photos of you?</p>
          <p className="mb-4">Unpersonalized photos not enough for you?</p>
          <p className="mt-6 font-semibold">Phanos fixes that.</p>
        </section>
      </div>
    );
};

export default LandingPage;
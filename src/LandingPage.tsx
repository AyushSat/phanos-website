import React, { useEffect } from 'react';
import Header from './Header';
import AOS from 'aos';
import 'aos/dist/aos.css';

const LandingPage: React.FC = () => {
  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="bg-gray-300 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-6 pt-20 flex flex-col md:flex-row justify-center items-center gap-8">
        <div className="text-left max-w-md">
          <h1 className="text-2xl md:text-3xl font-semibold text-black">
            Welcome to the new age of mobile photography
          </h1>
        </div>
        <div className="bg-white flex items-center justify-center w-[400px] overflow-hidden rounded-xl shadow-lg">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/angleDemo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </main>

      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-16 bg-purple-50 text-center animate-slide-up">
        <div className="space-y-6 px-8 max-w-3xl mx-auto">
          <ul className="list-none space-y-4 text-xl text-gray-700">
            <li>Issues taking photos of your partner?</li>
            <li>Random strangers unable to take good photos of you?</li>
            <li>Unpersonalized photos not enough for you?</li>
          </ul>
          <h2 className="text-3xl font-bold text-purple-800">Phanos takes care of that!</h2>
        </div>
      </section>

      <section className="bg-white py-12 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
  <div className="max-w-6xl mx-auto text-center px-4">
    <h2 className="text-3xl font-bold mb-10 text-gray-800">How it works</h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
      {/* Step 1 */}
      <div className="flex flex-col items-center text-center gap-4 transform transition-transform duration-1000 ease-in-out hover:scale-110 p-4" data-aos="fade-up" data-aos-delay={100}>
        <div>
          <h3 className="text-xl font-bold text-gray-600 mb-1">Step 1:</h3>
          <p className="text-sm text-gray-600">Select photos that you like</p>
        </div>
        <div className="flex justify-center">
          <img
            src="/iphoneT3.png"
            alt="Step 1"
            className="w-52 h-auto object-contain mx-auto"
          />
        </div>
      </div>

      {/* Step 2 */}
      <div className="flex flex-col items-center text-center gap-4 transform transition-transform duration-1000 ease-in-out hover:scale-110 p-4" data-aos="fade-up" data-aos-delay={200}>
        <div>
          <h3 className="text-xl font-bold text-gray-600 mb-1">Step 2:</h3>
          <p className="text-sm text-gray-600">Our ML will detect patterns and learn your photo style</p>
        </div>
        <div className="flex justify-center">
          <img
            src="/img2_iphone.png"
            alt="Step 2"
            className="w-52 h-auto object-contain mx-auto"
          />
        </div>
      </div>

      {/* Step 3 */}
      <div className="flex flex-col items-center text-center gap-4 transform transition-transform duration-1000 ease-in-out hover:scale-110 p-4" data-aos="fade-up" data-aos-delay={300}>
        <div>
          <h3 className="text-xl font-bold text-gray-600 mb-1">Step 3:</h3>
          <p className="text-sm text-gray-600">Just point and shoot — we handle the rest</p>
        </div>
        <div className="flex justify-center">
          <img
            src="/img3_iphone.png"
            alt="Step 3"
            className="w-52 h-auto object-contain mx-auto"
          />
        </div>
      </div>
    </div>
  </div>
</section>

      <section className="bg-white py-15 px-4 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-12 text-gray-800">Choose Your Plan</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Freemium Plan */}
      <div className="bg-gray-100 rounded-3xl p-8 shadow-md flex flex-col justify-between">
        <div>
          <div className="flex justify-center mb-4">
            <div className="bg-purple-100 text-purple-500 p-3 rounded-full">
              {/* Icon placeholder */}
              <span className="text-xl">👤</span>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-1 text-gray-800">Freemium</h3>
          <p className="text-sm text-gray-500 mb-6">Perfect for casual users</p>
          <p className="text-3xl font-bold mb-2 text-gray-800">$0<span className="text-base font-medium text-gray-600">/month</span></p>
          <ul className="text-left space-y-3 mt-6">
            <li className="flex items-center gap-2 text-gray-800"><span>✅</span>5 free photos per month</li>
            <li className="flex items-center gap-2 text-gray-800"><span>✅</span>Basic AI Personalization</li>
            <li className="flex items-center gap-2 text-gray-800"><span>✅</span>Standard customer support</li>
            <li className="flex items-center gap-2 text-gray-400 line-through"><span>❌</span>No cloud backup</li>
          </ul>
        </div>
        <button onClick={() => {alert("This will take you to the app store page!")}}className="mt-8 bg-purple-100 text-black font-semibold py-2 rounded-xl hover:bg-purple-200 transition">
          Get Started
        </button>
      </div>

      {/* Premium Plan */}
      <div className="bg-purple-600 text-white rounded-3xl p-8 shadow-lg flex flex-col justify-between">
        <div>
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <span className="text-xl">💜</span>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-1">Premium</h3>
          <p className="text-sm text-purple-100 mb-6">Unlimited photos & features</p>
          <p className="text-3xl font-bold mb-2">$2.99<span className="text-base font-medium text-purple-200">/month</span></p>
          <ul className="text-left space-y-3 mt-6">
            <li className="flex items-center gap-2"><span>✅</span>Unlimited photos</li>
            <li className="flex items-center gap-2"><span>✅</span>Advanced AI Personalization</li>
            <li className="flex items-center gap-2"><span>✅</span>Priority customer support</li>
            <li className="flex items-center gap-2"><span>✅</span>Cloud backup & sync</li>
          </ul>
        </div>
        <a href="/checkout" className="mt-8 bg-white text-purple-700 font-semibold py-2 rounded-xl hover:bg-purple-100 transition">
          Subscribe Now
        </a>
      </div>
    </div>
  </div>
</section>

<footer className="bg-gray-100 py-6">
  <div className="max-w-fit mx-auto bg-white px-6 py-3 rounded-md shadow-md text-sm text-gray-600">
    ©2025 Phanos. All rights reserved &nbsp;•&nbsp;
    Made with <span className="text-pink-500">❤️</span> by builders at Cornell
  </div>
</footer>
    </div>

    
  );
};

export default LandingPage;
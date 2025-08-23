'use client';

import React from 'react';
import { Shield, FileText, Cookie, Lock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const LegalPage = () => {

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header */}
      <header className="pt-24 pb-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Legal & Compliance
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Transparent information about how we protect your data and the terms governing our services.
            </p>
            <div className="mt-12 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-20">
            
            {/* Privacy Policy */}
            <section id="privacy-policy" className="scroll-mt-24">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  <Shield className="inline w-12 h-12 text-blue-600 mr-4 align-middle" />
                  Privacy Policy
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
                  How we collect, use, and protect your personal information with the highest standards of security
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-xl">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                      <h3 className="text-2xl font-bold text-gray-900">Information We Collect</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      We collect information you provide directly to us, such as when you create an account, 
                      use our services, or contact us for support. This may include your name, email address, 
                      company information, and usage data.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                      <h3 className="text-2xl font-bold text-gray-900">How We Use Your Information</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      We use the information we collect to provide, maintain, and improve our services, 
                      communicate with you, and ensure the security of our platform.
                    </p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="flex items-center mb-6">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                      <h3 className="text-2xl font-bold text-gray-900">Data Protection</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      We implement appropriate security measures to protect your personal information 
                      against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Terms of Service */}
            <section id="terms-of-service" className="scroll-mt-24">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  <FileText className="inline w-12 h-12 text-green-600 mr-4 align-middle" />
                  Terms of Service
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
                  The rules and guidelines that govern the use of our platform and services
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-xl">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                      <h3 className="text-2xl font-bold text-gray-900">Acceptance of Terms</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      By accessing or using our services, you agree to be bound by these Terms of Service. 
                      If you disagree with any part of these terms, you may not access our services.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                      <h3 className="text-2xl font-bold text-gray-900">Use of Services</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Our services are provided for lawful purposes only. You agree not to use our services 
                      to violate any applicable laws or regulations.
                    </p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="flex items-center mb-6">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                      <h3 className="text-2xl font-bold text-gray-900">Intellectual Property</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      All content, features, and functionality of our services are owned by us and are 
                      protected by copyright, trademark, and other intellectual property laws.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookie Policy */}
            <section id="cookie-policy" className="scroll-mt-24">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  <Cookie className="inline w-12 h-12 text-orange-600 mr-4 align-middle" />
                  Cookie Policy
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
                  How we use cookies and similar technologies to enhance your browsing experience
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-xl">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-4"></div>
                      <h3 className="text-2xl font-bold text-gray-900">What Are Cookies</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Cookies are small text files that are stored on your device when you visit our website. 
                      They help us provide you with a better experience and understand how you use our site.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-4"></div>
                      <h3 className="text-2xl font-bold text-gray-900">Types of Cookies We Use</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      We use essential cookies for basic functionality, analytics cookies to understand usage patterns, 
                      and preference cookies to remember your settings.
                    </p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="flex items-center mb-6">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-4"></div>
                      <h3 className="text-2xl font-bold text-gray-900">Managing Cookies</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      You can control and manage cookies through your browser settings. However, disabling certain 
                      cookies may affect the functionality of our website.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* GDPR */}
            <section id="gdpr" className="scroll-mt-24">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  <Lock className="inline w-12 h-12 text-purple-600 mr-4 align-middle" />
                  GDPR Compliance
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
                  Your rights and our obligations under the General Data Protection Regulation
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-xl">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-4"></div>
                      <h3 className="text-2xl font-bold text-gray-900">Your Rights</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Under GDPR, you have the right to access, rectify, erase, and restrict processing of your 
                      personal data. You also have the right to data portability and to object to processing.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-4"></div>
                      <h3 className="text-2xl font-bold text-gray-900">Data Processing</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      We process your personal data based on legitimate interests, contractual necessity, 
                      or your explicit consent, as required by GDPR.
                    </p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="flex items-center mb-6">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-4"></div>
                      <h3 className="text-2xl font-bold text-gray-900">Data Transfers</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      When we transfer your data outside the EEA, we ensure appropriate safeguards are in place 
                      to protect your information in accordance with GDPR requirements.
                    </p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalPage;

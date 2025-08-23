'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Check, 
  MessageSquare, 
  Users, 
  Zap, 
  BarChart3, 
  Puzzle,
  Clock,
  TrendingUp,
  Shield,
  Upload,
  Settings,
  Rocket,
  CheckCircle
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TestimonialsSection from '@/components/TestimonialsSection';

const LandingPage = () => {



  const benefits = [
    {
      icon: <Zap className="w-5 h-5" />,
      text: "Reduce support workload with an AI agent that answers instantly from your content"
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: "Capture leads directly from chat and sync them to your CRM"
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      text: "Human handover in one click—never leave customers hanging"
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      text: "Real-time analytics to see what's working and what's not"
    },
    {
      icon: <Puzzle className="w-5 h-5" />,
      text: "Works out-of-the-box with Shopify and more"
    }
  ];





  const outcomes = [
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "Faster Support",
      description: "Customers get accurate answers instantly, in their language. No more waiting or unhelpful responses.",
      metric: "90% faster response time"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      title: "More Conversions",
      description: "Smart lead capture means more qualified prospects in your funnel. Turn every conversation into a potential sale.",
      metric: "3x more qualified leads"
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-500" />,
      title: "Peace of Mind",
      description: "AI handles the busy work, while your team only steps in when needed. Focus on what matters most to your business.",
      metric: "70% reduction in support load"
    }
  ];

  const steps = [
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Create Your Bot",
      description: "Upload docs or connect your site. Our AI learns from your content in minutes, not hours."
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Customize & Embed",
      description: "Configure tone, style, and install with one snippet or WP plugin. No coding required."
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Engage & Grow",
      description: "Let AI handle support, capture leads, and escalate to humans when needed. Scale effortlessly."
    }
  ];





  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-32 right-1/4 w-64 h-64 bg-purple-100 rounded-full blur-2xl opacity-60"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="max-w-6xl mx-auto text-center">
            {/* Main headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              AI Chatbots That Actually{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Understand
              </span>{" "}
              Your Customers
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              For businesses, agencies, and website owners tired of clunky bots. Our SaaS platform makes it effortless to launch AI-powered chat, automate conversations, and seamlessly hand over to humans when needed.
            </p>
            
            {/* Benefits list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-3xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 text-left">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mt-0.5">
                    <div className="text-blue-600">
                      {benefit.icon}
                    </div>
                  </div>
                  <span className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                             <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-200 group flex items-center">
                 Get Started Free
                 <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
               </button>
               <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-200">
                 Watch Demo
               </button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-600" />
                <span>5-minute setup</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-600" />
                <span>14-day free trial</span>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Outcome Section */}
      <section id="outcomes" className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Imagine Every Visitor Getting{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Instant, Human-Like Help
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {outcomes.map((outcome, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex justify-center mb-6">
                    <div className="p-3 bg-gray-50 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      {outcome.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {outcome.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {outcome.description}
                  </p>
                  <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {outcome.metric}
                  </div>
                </div>
              ))}
            </div>
            
            {/* New paradigm */}
            <div className="mt-16 p-8 bg-blue-50 border border-blue-200 rounded-xl">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                The New Way Forward
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We combine AI + automation + human handover into one simple platform—so you never have to compromise between customer experience and efficiency.
              </p>
                             <Link href="/product" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-200 group flex items-center mx-auto w-fit">
                 See How It Works
                 <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="product" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Product introduction */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Meet{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ChatBot Pro
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                The AI Chatbot SaaS built for real businesses. With our n8n workflows and deep integrations, you can launch a powerful, reliable chatbot in minutes.
              </p>
            </div>

            {/* 3-step process */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white mb-6 shadow-lg">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Connection arrow */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 -right-4 transform translate-x-1/2">
                      <ArrowRight className="w-6 h-6 text-blue-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>



            {/* Testimonials Section */}
            <div className="mt-16 mb-16">
              <TestimonialsSection />
            </div>

            {/* Final CTA */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 md:p-12 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to Transform Your Customer Experience?
                </h3>
                <p className="text-lg mb-6 opacity-90">
                  Start your free trial today and see the difference—no credit card required.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-200 group flex items-center">
                    Launch My Chatbot
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <CheckCircle className="w-4 h-4" />
                    <span>14-day free trial included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;

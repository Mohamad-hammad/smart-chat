'use client';

import React from 'react';
import { 
  ArrowRight, 
  Check, 
  MessageSquare, 
  Users, 
  Zap, 
  BarChart3, 
  Puzzle,
  AlertTriangle,
  TrendingDown,
  DollarSign,
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
      text: "Works out-of-the-box with WordPress, Shopify, and more"
    }
  ];

  const painPoints = [
    {
      icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
      title: "Bots that feel robotic",
      description: "Most chatbots fail to understand real questions, frustrating visitors instead of helping them. Your customers end up more confused than when they started."
    },
    {
      icon: <TrendingDown className="w-8 h-8 text-orange-500" />,
      title: "Lost opportunities",
      description: "Without proper lead capture and handover, potential customers leave without converting. You're losing money every day from missed connections."
    },
    {
      icon: <DollarSign className="w-8 h-8 text-yellow-600" />,
      title: "Complex, expensive tools",
      description: "Competing solutions are bloated, hard to set up, and charge too much for too little. You need an enterprise team just to configure basic features."
    }
  ];

  const outcomes = [
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "Faster Support",
      description: "Customers get accurate answers instantly, in their own language. No more waiting for hours or dealing with unhelpful responses.",
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

  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for small businesses",
      features: [
        "1 AI chatbot",
        "1,000 conversations/month",
        "Basic customization",
        "Email support",
        "WordPress plugin"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      description: "Best for growing businesses",
      features: [
        "5 AI chatbots",
        "10,000 conversations/month",
        "Advanced customization",
        "Priority support",
        "All integrations",
        "Analytics dashboard",
        "Human handover"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations",
      features: [
        "Unlimited chatbots",
        "Unlimited conversations",
        "White-label solution",
        "Dedicated support",
        "Custom integrations",
        "SLA guarantee",
        "Advanced analytics"
      ],
      cta: "Contact Sales",
      popular: false
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
              For businesses, agencies, and website owners tired of clunky bots. Our SaaS platform + WordPress plugin makes it effortless to launch AI-powered chat, automate conversations, and seamlessly hand over to humans when needed.
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
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-200 group flex items-center">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200">
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

      {/* Pain Section */}
      <section id="pain" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Tired of Bots That{" "}
              <span className="text-red-500">Don&apos;t Deliver?</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {painPoints.map((pain, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-center mb-4">
                    {pain.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {pain.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {pain.description}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Belief deconstruction */}
            <div className="mt-16 p-8 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-lg md:text-xl text-gray-900 font-medium leading-relaxed">
                You don&apos;t need an enterprise team or weeks of training to launch a great chatbot.{" "}
                <span className="text-blue-600 font-semibold">
                  The problem isn&apos;t you—it&apos;s the tools.
                </span>
              </p>
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
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 group flex items-center mx-auto">
                See How It Works
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
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
                The AI Chatbot SaaS built for real businesses. With our WordPress plugin, n8n workflows, and deep integrations, you can launch a powerful, reliable chatbot in minutes.
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

            {/* Founder message */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 md:p-12 shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">JD</span>
                </div>
                <blockquote className="text-lg md:text-xl text-gray-900 leading-relaxed mb-6 italic">
                  &ldquo;We built this because we were tired of chatbots that overpromised and underdelivered. Our mission is simple: make AI chatbots that are fast, reliable, and actually useful for your business.&rdquo;
                </blockquote>
                <p className="text-gray-600 font-medium">
                  John Doe, Founder & CEO
                </p>
              </div>
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
                  <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 group flex items-center">
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

      {/* Pricing Section */}
      <section id="pricing" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Simple, Transparent{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Pricing
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Choose the plan that fits your needs. All plans include a 14-day free trial.
              </p>
            </div>

            {/* Pricing cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative bg-white border rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl ${
                    plan.popular
                      ? "border-blue-500 shadow-blue-100 scale-105"
                      : "border-gray-200"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">
                        {plan.price}
                      </span>
                      <span className="text-gray-600 ml-1">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 group flex items-center justify-center ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Questions? Check our{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  FAQ
                </a>{" "}
                or{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  contact us
                </a>
              </p>
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

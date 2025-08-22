import { CheckCircle, MessageCircle, Bot, Zap, Shield, BarChart3 } from "lucide-react";
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const ProductPage = () => {
  const steps = [
    {
      icon: <Bot className="w-8 h-8 text-blue-600" />,
      title: "Create Your Bot",
      description: "Build your AI chatbot in minutes with our intuitive drag-and-drop interface. No coding required."
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-green-600" />,
      title: "Train & Deploy",
      description: "Upload your content, train the AI on your business data, and deploy across all platforms instantly."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
      title: "Monitor & Optimize",
      description: "Track performance, analyze conversations, and continuously improve your bot's effectiveness."
    }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "Lightning Fast Setup",
      description: "Get your chatbot running in under 5 minutes with our streamlined onboarding process."
    },
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance with SOC 2, GDPR, and HIPAA standards."
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-blue-500" />,
      title: "Natural Conversations",
      description: "Advanced AI that understands context and provides human-like responses."
    },
    {
      icon: <Bot className="w-6 h-6 text-purple-500" />,
      title: "Multi-Platform Support",
      description: "Deploy on your website, WordPress, Shopify, or integrate with existing systems."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                ✨ AI-Powered Product
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              The Complete{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Chatbot Platform
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              Build, deploy, and optimize intelligent chatbots that actually understand your customers. 
              No technical skills required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:opacity-90 transition-opacity">
                Start Building Free
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-50 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From setup to optimization, we've made building AI chatbots as simple as possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create exceptional customer experiences with AI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-50 rounded-lg p-3 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Message */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              "We built this because we were tired of complex, expensive chatbot tools."
            </h3>
            <p className="text-xl opacity-90 mb-6">
              After struggling with existing solutions, we created the chatbot platform we wished existed. 
              Simple, powerful, and affordable for businesses of all sizes.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full"></div>
              <div className="text-left">
                <p className="font-semibold">Sarah Johnson</p>
                <p className="opacity-75">Founder & CEO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Customer Support?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using ChatBot Pro to provide better customer experiences 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:opacity-90 transition-opacity">
              Start Free Trial
            </button>
            <button className="border border-gray-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-800 transition-colors">
              Schedule Demo
            </button>
          </div>
          <p className="text-gray-400 mt-4">No credit card required • 14-day free trial</p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductPage;

import { MessageCircle, Settings, Palette, Code, Zap, Shield } from "lucide-react";
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const ChatWidgetPage = () => {
  const features = [
    {
      icon: <Palette className="w-6 h-6 text-pink-500" />,
      title: "Full Customization",
      description: "Match your brand with custom colors, fonts, and positioning options."
    },
    {
      icon: <Code className="w-6 h-6 text-blue-500" />,
      title: "Easy Integration",
      description: "Add to any website with just one line of code. No technical skills required."
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "Instant Responses",
      description: "Lightning-fast AI responses that engage visitors immediately."
    },
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      title: "Secure & Private",
      description: "Enterprise-grade security with full data privacy compliance."
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Configure Your Widget",
      description: "Customize appearance, set up welcome messages, and configure your bot's personality."
    },
    {
      step: "02", 
      title: "Copy the Code",
      description: "Get your unique embed code and installation instructions for any platform."
    },
    {
      step: "03",
      title: "Go Live Instantly",
      description: "Paste the code on your site and start engaging visitors immediately."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
                💬 Chat Widget
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Beautiful Chat Widget{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  for Any Website
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Add an AI-powered chat widget to your website in seconds. 
                No coding required, fully customizable, and works everywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:opacity-90 transition-opacity">
                  Try Live Demo
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-50 transition-colors">
                  View Examples
                </button>
              </div>
            </div>
            
            {/* Demo Widget Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 h-96 relative overflow-hidden">
                <div className="h-8 bg-gray-100 rounded mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded w-full"></div>
                  <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                </div>
                
                {/* Chat Widget */}
                <div className="absolute bottom-4 right-4">
                  <button className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </button>
                </div>
                
                {/* Chat Panel */}
                <div className="absolute bottom-20 right-4 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 p-4 flex flex-col">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">AI</span>
                      </div>
                      <span className="font-medium text-gray-900">ChatBot</span>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">×</button>
                  </div>
                  
                  <div className="flex-1 py-4 space-y-4">
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex-shrink-0"></div>
                      <div className="bg-gray-100 rounded-lg p-3 text-sm">
                        Hi! I'm here to help. What can I assist you with today?
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 justify-end">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-3 text-sm">
                        I need help with pricing
                      </div>
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex-shrink-0"></div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex-shrink-0"></div>
                      <div className="bg-gray-100 rounded-lg p-3 text-sm">
                        I'd be happy to help you with our pricing options! We have plans starting from $29/month...
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="text" 
                        placeholder="Type your message..."
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                      />
                      <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-lg hover:opacity-90 transition-opacity">
                        <span className="text-sm">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Everything You Need in a Chat Widget
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our chat widget comes packed with features that make customer engagement effortless.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-white rounded-lg p-3 flex-shrink-0 shadow-sm">
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

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Setup in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get your chat widget live on your website in less than 5 minutes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {step.step}
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

      {/* Integration Examples */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Works Everywhere
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our chat widget integrates seamlessly with any platform or framework.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['WordPress', 'Shopify', 'React', 'HTML'].map((platform, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{platform[0]}</span>
                </div>
                <h3 className="font-semibold text-gray-900">{platform}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Engage Your Website Visitors?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Add our AI-powered chat widget to your site today and start converting visitors into customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:opacity-90 transition-opacity">
              Get Your Widget
            </button>
            <button className="border border-gray-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-800 transition-colors">
              View Live Demo
            </button>
          </div>
          <p className="text-gray-400 mt-4">No setup fees • Works on any website • 14-day free trial</p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ChatWidgetPage;

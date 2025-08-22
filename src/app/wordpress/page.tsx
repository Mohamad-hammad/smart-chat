import { Download, Settings, Eye, FileText, CheckCircle, X, Zap } from "lucide-react";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const WordPressPage = () => {
  const features = [
    {
      icon: <Settings className="w-6 h-6 text-blue-500" />,
      title: "Easy Configuration",
      description: "Simple settings panel right in your WordPress dashboard. No code required."
    },
    {
      icon: <Eye className="w-6 h-6 text-green-500" />,
      title: "Live Preview",
      description: "See exactly how your chatbot looks before going live on your site."
    },
    {
      icon: <FileText className="w-6 h-6 text-purple-500" />,
      title: "Activity Logs",
      description: "Monitor conversations and sync data between WordPress and ChatBot Pro."
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "Auto-Sync",
      description: "Automatically sync your WordPress content to train your chatbot."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
              🔌 WordPress Plugin
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              ChatBot Pro for{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                WordPress
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              From complex manual setup to simple one-click installation. 
              Add AI chatbots to your WordPress site without touching a single line of code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:opacity-90 transition-opacity flex items-center justify-center">
                <Download className="w-5 h-5 mr-2" />
                Download Plugin
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-50 transition-colors">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Before-After-Bridge Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Transform Your WordPress Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stop fighting with complex integrations and start serving customers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl border border-red-200 bg-red-50">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <X className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-red-700 mb-4">Before</h3>
              <ul className="space-y-2 text-red-600">
                <li>• Edit theme files manually</li>
                <li>• Debug JavaScript errors</li>
                <li>• Configure complex settings</li>
                <li>• Risk breaking your site</li>
              </ul>
            </div>
            
            <div className="text-center p-6 rounded-xl border border-emerald-200 bg-emerald-50">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-emerald-700 mb-4">After</h3>
              <ul className="space-y-2 text-emerald-600">
                <li>• One-click plugin install</li>
                <li>• Paste your bot token</li>
                <li>• Preview before going live</li>
                <li>• Built-in troubleshooting</li>
              </ul>
            </div>
            
            <div className="text-center p-6 rounded-xl border border-blue-200 bg-blue-50">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-lg">→</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Bridge</h3>
              <p className="text-blue-600 text-sm">
                Built-in preview, logs, and troubleshooting keep you in control from your WordPress dashboard. Everything just works.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plugin Interface Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Simple WordPress Integration
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Manage everything from your familiar WordPress dashboard.
            </p>
          </div>
          
          {/* Mock WordPress Admin Interface */}
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
            {/* WordPress Admin Header */}
            <div className="bg-gray-800 px-6 py-3 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-500 rounded"></div>
                <span className="text-white font-medium">WordPress Admin</span>
              </div>
              <span className="text-gray-300 text-sm">› ChatBot Settings</span>
            </div>
            
            {/* Plugin Interface */}
            <div className="p-6">
              <div className="border-b border-gray-200 pb-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">CB</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">ChatBot Pro Settings</h3>
                    <p className="text-gray-600 text-sm">Configure your AI chatbot for WordPress</p>
                  </div>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="flex space-x-6 border-b border-gray-200 mb-6">
                <button className="pb-2 px-1 border-b-2 border-emerald-500 text-emerald-600 font-medium flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <button className="pb-2 px-1 text-gray-500 flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
                <button className="pb-2 px-1 text-gray-500 flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Logs & Sync</span>
                </button>
              </div>
              
              {/* Settings Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">API Authentication Token</label>
                  <div className="flex space-x-2">
                    <input 
                      type="password" 
                      value="cb_live_xxxxxxxxxxxxxxxxxxxx"
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
                      readOnly
                    />
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                      Validate
                    </button>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Token Valid</span>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">WordPress Site Domain</label>
                    <input 
                      type="url" 
                      placeholder="https://yoursite.com"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Local Response Cache</label>
                      <p className="text-xs text-gray-500">Cache responses to improve speed</p>
                    </div>
                    <div className="w-12 h-6 bg-emerald-500 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                  </div>
                </div>
                
                <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Save & Validate
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Everything Built Into WordPress
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              No external tools needed. Manage your chatbot directly from WordPress.
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

      {/* Installation Steps */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Install in 3 Minutes
            </h2>
            <p className="text-xl text-gray-600">
              Follow these simple steps to add AI chatbots to your WordPress site.
            </p>
          </div>
          
          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Download & Install",
                description: "Download the plugin and install it like any other WordPress plugin.",
                code: "1. Go to Plugins → Add New\n2. Upload chatbot-pro.zip\n3. Click 'Activate Plugin'"
              },
              {
                step: "02", 
                title: "Configure Settings",
                description: "Add your ChatBot Pro token and configure basic settings.",
                code: "1. Go to ChatBot → Settings\n2. Paste your API token\n3. Set your domain URL"
              },
              {
                step: "03",
                title: "Preview & Go Live",
                description: "Use the built-in preview to test, then activate on your site.",
                code: "1. Click the Preview tab\n2. Test your chatbot\n3. Save settings to go live"
              }
            ].map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono whitespace-pre-line">
                    {step.code}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Transform Your WordPress Site Today
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Stop losing visitors and start converting them with our WordPress chatbot plugin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:opacity-90 transition-opacity flex items-center justify-center">
              <Download className="w-5 h-5 mr-2" />
              Download Plugin
            </button>
            <button className="border border-gray-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-800 transition-colors">
              View Documentation
            </button>
          </div>
          <p className="text-gray-400 mt-4">Free download • Works with any WordPress theme • 14-day trial</p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default WordPressPage;

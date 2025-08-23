import React from 'react';
import Testimonial from './Testimonial';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "John Davis",
      role: "E-commerce Manager",
      company: "RetailPro",
      content: "Our customer support team was overwhelmed. This chatbot handles 80% of inquiries automatically, letting us focus on complex cases.",
      avatar: "images/john-davis.jpg",
      initials: "JD",
      color: "blue" as const
    },
    {
      name: "Sarah Mitchell",
      role: "Customer Success Lead",
      company: "TechFlow Inc",
      content: "Setup was incredibly easy. The AI learned our business quickly and now provides accurate, helpful responses 24/7.",
      avatar: "images/sarah-mitchell.jpg",
      initials: "SM",
      color: "green" as const
    },
    {
      name: "Robert Kim",
      role: "Tech Startup Founder",
      company: "InnovateLab",
      content: "We've seen a 40% increase in lead generation since implementing the chatbot. It's like having a sales team that never sleeps.",
      avatar: "images/robert-kim.jpg",
      initials: "RK",
      color: "purple" as const
    }
  ];

  const metrics = [
    { number: "500+", label: "Active Chatbots", color: "blue" },
    { number: "10M+", label: "Conversations", color: "green" },
    { number: "98%", label: "Customer Satisfaction", color: "purple" },
    { number: "70%", label: "Cost Reduction", color: "orange" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Trusted by Growing Businesses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how companies are transforming their customer support with our AI chatbot platform
          </p>
        </div>
        
        {/* Success Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center group">
              <div className={`text-4xl md:text-5xl font-bold mb-3 transition-all duration-300 group-hover:scale-110 ${
                metric.color === 'blue' ? 'text-blue-600' :
                metric.color === 'green' ? 'text-green-600' :
                metric.color === 'purple' ? 'text-purple-600' :
                'text-orange-600'
              }`}>
                {metric.number}
              </div>
              <div className="text-gray-600 font-medium">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Customer Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group h-full">
              <Testimonial
                name={testimonial.name}
                role={testimonial.role}
                company={testimonial.company}
                content={testimonial.content}
                initials={testimonial.initials}
                color={testimonial.color}
                avatar={testimonial.avatar}
              />
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default TestimonialsSection;

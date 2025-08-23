import React from 'react';

interface TestimonialProps {
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar?: string;
  initials: string;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'indigo';
}

const Testimonial: React.FC<TestimonialProps> = ({
  name,
  role,
  company,
  content,
  avatar,
  initials,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    pink: 'bg-pink-100 text-pink-600',
    indigo: 'bg-indigo-100 text-indigo-600'
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="flex items-center mb-4">
        {avatar ? (
          <img 
            src={avatar} 
            alt={name} 
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className={`w-12 h-12 ${colorClasses[color]} rounded-full flex items-center justify-center`}>
            <span className="font-bold text-lg">{initials}</span>
          </div>
        )}
        <div className="ml-4">
          <div className="font-semibold text-gray-900">{name}</div>
          <div className="text-sm text-gray-500">
            {role}
            {company && <span className="text-gray-400"> • {company}</span>}
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 italic leading-relaxed flex-grow">
        &ldquo;{content}&rdquo;
      </p>
    </div>
  );
};

export default Testimonial;

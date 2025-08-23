import React from 'react';

interface CompanyLogoProps {
  company: string;
  className?: string;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ company, className = "" }) => {
  // Generate initials from company name
  const initials = company
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Generate a consistent color based on company name
  const colors = [
    'bg-blue-500',
    'bg-green-500', 
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-red-500',
    'bg-teal-500'
  ];
  
  const colorIndex = company.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <div className={`inline-flex items-center justify-center px-3 py-1 rounded-lg text-white font-bold text-sm ${bgColor} ${className}`}>
      {initials}
    </div>
  );
};

export default CompanyLogo;

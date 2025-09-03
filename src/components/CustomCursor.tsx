'use client';

import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.matches('a, button, input, textarea, select, [role="button"], [tabindex]') ||
                           target.closest('a, button, input, textarea, select, [role="button"], [tabindex]');
      setIsHovering(!!isInteractive);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(true); // Keep visible even when leaving
    };

    // Add event listeners
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Ensure cursor is visible on page load
    setIsVisible(true);

    // Periodic check to ensure cursor stays visible
    const visibilityCheck = setInterval(() => {
      setIsVisible(true);
    }, 1000);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearInterval(visibilityCheck);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none custom-cursor"
      style={{
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        transform: 'translate(-50%, -50%)',
        opacity: 1, // Always visible
        zIndex: 999999999, // Higher than any dashboard element
        willChange: 'transform', // Optimize for performance
        visibility: 'visible', // Force visibility
        display: 'block', // Force display
        position: 'fixed', // Ensure fixed positioning
        isolation: 'isolate', // Create new stacking context
        contain: 'layout style paint', // Optimize rendering
        pointerEvents: 'none', // Ensure no pointer events
        userSelect: 'none', // Prevent text selection
        WebkitUserSelect: 'none', // Prevent text selection on webkit
        MozUserSelect: 'none', // Prevent text selection on firefox
        mixBlendMode: 'normal', // Ensure proper blending
        backfaceVisibility: 'hidden', // Optimize rendering
        transformStyle: 'preserve-3d', // Optimize 3D transforms
      }}
    >

    </div>
  );
};

export default CustomCursor;

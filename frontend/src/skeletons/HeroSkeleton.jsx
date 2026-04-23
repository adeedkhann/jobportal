import React from 'react';

const HeroSkeleton = () => {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content Column Skeleton */}
        <div className="space-y-8 animate-pulse">
          <div className="space-y-4">
            {/* Tagline */}
            <div className="h-4 w-32 bg-gray-200 rounded-md"></div>
            
            {/* Headline (3 lines) */}
            <div className="space-y-2">
              <div className="h-12 w-3/4 bg-gray-200 rounded-lg"></div>
              <div className="h-12 w-1/2 bg-gray-200 rounded-lg"></div>
            </div>
            
            {/* Paragraph */}
            <div className="space-y-2 pt-4">
              <div className="h-4 w-full bg-gray-100 rounded"></div>
              <div className="h-4 w-full bg-gray-100 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="h-12 w-40 bg-gray-200 rounded-full"></div>
            <div className="h-12 w-40 bg-gray-100 rounded-full"></div>
          </div>
        </div>

        {/* Right Image Column Skeleton */}
        <div className="relative animate-pulse">
          {/* Main Image Placeholder */}
          <div className="aspect-[4/3] w-full bg-gray-200 rounded-2xl"></div>
          
          {/* Floating Card Placeholder */}
          <div className="absolute -top-12 -left-12 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 w-[220px] hidden sm:block">
            {/* Stars */}
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-200 rounded-full"></div>
              ))}
            </div>
            {/* Card Text */}
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-full bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
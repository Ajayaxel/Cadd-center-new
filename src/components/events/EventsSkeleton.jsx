import React from 'react';

export default function EventsSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm animate-pulse flex flex-col"
        >
          {/* Cover image skeleton */}
          <div className="w-full aspect-[16/10] bg-slate-200 relative">
            <div className="absolute top-4 left-4 w-20 h-6 bg-slate-300 rounded-full" />
            <div className="absolute top-4 right-4 w-16 h-6 bg-slate-300 rounded-full" />
          </div>

          {/* Body skeleton */}
          <div className="p-5 sm:p-6 space-y-4 flex-grow flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="h-5 bg-slate-200 rounded-md w-3/4" />
              <div className="h-4 bg-slate-200 rounded-md w-full" />
              <div className="h-4 bg-slate-200 rounded-md w-5/6" />
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <div className="h-4 bg-slate-200 rounded-md w-1/3" />
              <div className="h-4 bg-slate-200 rounded-md w-1/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

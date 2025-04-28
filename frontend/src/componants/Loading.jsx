import React from "react";

const Loading = () => {
  return (
    <div className="animate-pulse p-4 space-y-4 max-w-4xl mx-auto">
      {/* Header Skeleton */}
      <div className="h-8 bg-gray-300 rounded-md w-3/4 mx-auto"></div>

      {/* Image Skeleton */}
      <div className="h-48 bg-gray-300 rounded-lg w-full"></div>

      {/* Text Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded-md w-full"></div>
        <div className="h-4 bg-gray-300 rounded-md w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded-md w-4/6"></div>
      </div>

      {/* Button Skeleton */}
      <div className="h-10 bg-gray-300 rounded-md w-1/4 mx-auto"></div>
    </div>
  );
};

export default Loading;
import React from "react";

interface HomeSectionProps {
  title: string;
}

const HomeSection: React.FC<HomeSectionProps> = ({ title }) => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder 콘텐츠 */}
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg">
          <h3 className="text-lg font-bold mb-2">Post Title 1</h3>
          <p className="text-sm text-gray-600">This is a brief description.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg">
          <h3 className="text-lg font-bold mb-2">Post Title 2</h3>
          <p className="text-sm text-gray-600">This is a brief description.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg">
          <h3 className="text-lg font-bold mb-2">Post Title 3</h3>
          <p className="text-sm text-gray-600">This is a brief description.</p>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;

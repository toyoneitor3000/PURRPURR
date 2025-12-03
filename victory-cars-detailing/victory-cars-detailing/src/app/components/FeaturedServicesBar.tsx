import React from 'react';
import { Car, Sparkles, ShieldCheck } from 'lucide-react'; // Assuming lucide-react is installed

const FeaturedServicesBar = () => {
  return (
    <section className="bg-white py-12 shadow-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Our Premium Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md">
            <Car className="text-red-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Exterior Detailing
            </h3>
            <p className="text-gray-600">
              Restore your car's exterior to a pristine condition with our
              advanced cleaning and protection techniques.
            </p>
          </div>

          {/* Service 2 */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md">
            <Sparkles className="text-red-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Interior Detailing
            </h3>
            <p className="text-gray-600">
              Deep cleaning and conditioning for your car's interior,
              leaving it fresh and spotless.
            </p>
          </div>

          {/* Service 3 */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md">
            <ShieldCheck className="text-red-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Paint Protection
            </h3>
            <p className="text-gray-600">
              Long-lasting ceramic coatings and sealants to protect your
              car's paint from the elements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServicesBar;

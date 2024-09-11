import React from 'react';
import useMyLocation from '../hooks/useMyLocation';
import { X } from 'lucide-react';


function Modals({  goToNextStep }) {
    const { position } = useMyLocation();
    const userPostion = position;
    const handleLocation= ()=>{
        console.log("userpostion" , userPostion);
        goToNextStep();
    }
  return (
    // Wrapper to apply backdrop and center the modal
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal content */}
      <div className="relative bg-white rounded-xl p-8 w-[20rem] shadow-lg z-10">
        <div className="flex justify-end">
          <button className="text-gray-600 hover:text-gray-800" onClick={goToNextStep}>
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-lg font-semibold">Location Access</h1>
          <p className="text-center text-gray-700">Do you want to give location access?</p>
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-violet-600 rounded-lg text-white hover:bg-violet-700"
              onClick={handleLocation}
            >
              Allow
            </button>
            <button
              className="px-4 py-2 bg-gray-300 rounded-lg text-gray-700 hover:bg-gray-400"
              onClick={goToNextStep}
            >
              Not Allow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modals;

import React from "react";

function Others({ handleGetBalance, updateAddressBalance }) {
  return (
    <div>
      <div className="p-4 rounded-lg">
        <label className="text-white">Balance of </label>
        <div className="flex items-center mt-2">
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            placeholder="Enter address to check balance..."
            onChange={updateAddressBalance}
          />
        </div>
        <button
          onClick={handleGetBalance}
          className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Get balance
        </button>
      </div>
    </div>
  );
}

export default Others;

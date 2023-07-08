import React, { useState, useEffect } from "react";
import "./Header.css";
function Header({handleConnectWallet, address}) {
  return (
    <>
      <header class="flex items-center justify-between bg-gray-200 p-4">
        <h3 class="logo">Klaytn</h3>
        {!address && (
          <button
            class="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleConnectWallet}
          >
            Connect
          </button>
        )}
      </header>
    </>
  );
}

export default Header;

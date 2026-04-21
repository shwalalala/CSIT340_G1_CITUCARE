import React, { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';

const ChatHeader = ({ onMenuClick }) => {

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">

          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
          >
            <Menu size={24} className="text-gray-700" />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              CITU-CARE
            </h1>
            <p className="text-xs text-gray-500">
              Chat Assistant
            </p>
          </div>

        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
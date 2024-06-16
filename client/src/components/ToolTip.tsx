import React from 'react';

const ToolTip = ({ title, x, y, visible }) => {
  if (!visible) return null;

  return (
    <div
      className="absolute bg-gray-700 text-white text-sm py-1 px-2 rounded"
      style={{ top: y, left: x }}
    >
      {title}
    </div>
  );
};

export default ToolTip;

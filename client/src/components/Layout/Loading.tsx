import React from 'react';

export const Loading: React.FC = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

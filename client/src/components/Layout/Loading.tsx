import React from 'react';
import Container from '@material-ui/core/Container';

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

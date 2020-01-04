import React, { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';

export const UserMain = () => {
  const [showLogin, setShowLogin] = useState<boolean>(true);

  const showRegisterPage = () => {
    setShowLogin(false);
  };

  const showLoginPage = () => {
    setShowLogin(true);
  };

  return (
    <div>
      {showLogin ? (
        <Login setShowRegister={showRegisterPage} />
      ) : (
        <Register showLoginPage={showLoginPage} />
      )}
    </div>
  );
};

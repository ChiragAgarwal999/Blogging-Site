import React, { createContext, useEffect, useState } from 'react';

// Create the context
export const UserEmailContext = createContext();

// Create a provider component
const UserEmailProvider = ({ children }) => {
  const [email, setEmail] = useState(null);

    // Load email from local storage on mount
    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
          setEmail(storedEmail);
        }
      }, []);
    
      // Save email to local storage whenever it changes
      useEffect(() => {
        if (email) {
          localStorage.setItem('email', email);
        } else {
          localStorage.removeItem('email');
        }
      }, [email]);

  return (
    <UserEmailContext.Provider value={{ email, setEmail }}>
      {children}
    </UserEmailContext.Provider>
  );
};

export default UserEmailProvider;

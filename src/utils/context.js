import React, {createContext, useState} from 'react';

export const UserContext = createContext(null);

export const TypeProvider = props => {
  const [user, setUser] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <UserContext.Provider value={{user, setUser, errorMessage, setErrorMessage}}>
      {props.children}
    </UserContext.Provider>
  )
};

export const TypeConsumer = UserContext.Consumer;

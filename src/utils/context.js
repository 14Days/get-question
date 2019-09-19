import React, {createContext, useState} from 'react';

export const UserContext = createContext(null);

export const TypeProvider = props => {
  let [user, setUser] = useState('');

  return (
    <UserContext.Provider value={{user, setUser}}>
      {props.children}
    </UserContext.Provider>
  )
};

export const TypeConsumer = UserContext.Consumer;

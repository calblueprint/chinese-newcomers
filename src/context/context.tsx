import React from 'react';
import { User } from '../types/types';
import getEmptyUser from '../utils/utils';

const createContext = <A extends {} | null>(defaultValue: A) => {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = React.createContext({
    state: defaultValue,
    update: defaultUpdate,
  });

  function Provider(props: React.PropsWithChildren<{}>) {
    const [state, update] = React.useState(defaultValue);
    // add use effect with onAuthStateChanged here?
    return <ctx.Provider value={{ state, update }} {...props} />;
  }
  return [ctx, Provider] as const; // alternatively, [typeof ctx, typeof Provider]
};

// create a context for the current logged in client
const [context, provider] = createContext<User>(getEmptyUser());
export const UserProvider = provider; // used in App.tsx
export const UserContext = context; // used by client context consumers

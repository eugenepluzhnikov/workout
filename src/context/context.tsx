import { FC, createContext, useContext, useState } from "react";

const AppContext = createContext<{
  user: any;
  setUser: (user: any)=> any;
}>({
  user: null,
  setUser: ()=>{}
});

type Props = {
  children?: any;
};

export const AppWrapper: FC<Props> = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}

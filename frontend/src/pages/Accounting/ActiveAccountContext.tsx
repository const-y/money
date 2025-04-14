import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

interface ActiveAccountContextProps {
  activeAccountId: number | null;
  setActiveAccountId: (accountId: number | null) => void;
}

const ActiveAccountContext = createContext<
  ActiveAccountContextProps | undefined
>(undefined);

export const useActiveAccount = (): ActiveAccountContextProps => {
  const context = useContext(ActiveAccountContext);
  if (!context) {
    throw new Error(
      'useActiveAccount must be used within an ActiveAccountProvider'
    );
  }
  return context;
};

export const ActiveAccountProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [activeAccountId, setActiveAccountId] = useState<number | null>(null);

  return (
    <ActiveAccountContext.Provider
      value={{ activeAccountId, setActiveAccountId }}
    >
      {children}
    </ActiveAccountContext.Provider>
  );
};

import { FC, ReactNode, createContext, useContext } from 'react';

interface FormIdProviderProps {
  children: ReactNode;
  formId: string;
}

const FormIdContext = createContext<string | null>(null);

export const FormIdProvider: FC<FormIdProviderProps> = ({
  children,
  formId,
}) => {
  return (
    <FormIdContext.Provider value={formId}>{children}</FormIdContext.Provider>
  );
};

export function useFormId() {
  const context = useContext(FormIdContext);

  if (!context) {
    throw new Error('useModal must be used within a FormIdProvider');
  }

  return context;
}

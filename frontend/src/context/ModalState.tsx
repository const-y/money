import { FC, ReactNode, createContext, useContext, useState } from 'react';

interface ModalStateProviderProps {
  children: ReactNode;
}

interface ModalState {
  activeModalId: string | null;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

interface SingleModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const ModalStateContext = createContext<ModalState | null>(null);

export const ModalStateProvider: FC<ModalStateProviderProps> = ({
  children,
}) => {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  const openModal = (modalId: string) => {
    setActiveModalId(modalId);
  };

  const closeModal = () => {
    setActiveModalId(null);
  };

  return (
    <ModalStateContext.Provider
      value={{ openModal, closeModal, activeModalId }}
    >
      {children}
    </ModalStateContext.Provider>
  );
};

export function useModalState(modalId: string): SingleModalState {
  const context = useContext(ModalStateContext);

  if (!context) {
    throw new Error('useModalState must be used within a ModalStateProvider');
  }

  const { openModal, closeModal: close, activeModalId } = context;

  const isOpen = activeModalId === modalId;

  const open = () => openModal(modalId);

  return { open, close, isOpen };
}

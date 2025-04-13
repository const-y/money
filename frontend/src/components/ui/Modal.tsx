import {
  forwardRef,
  cloneElement,
  ReactElement,
  MouseEvent,
  FC,
  PropsWithChildren,
} from 'react';
import {
  Group,
  Modal as MantineModal,
  ModalProps as MantineModalProps,
} from '@mantine/core';

interface ModalProps extends MantineModalProps {
  onOpen: () => void;
  trigger: ReactElement;
}

const Actions: FC<PropsWithChildren> = ({ children }) => (
  <Group mt="lg" justify="flex-end">
    {children}
  </Group>
);

const ModalBase = forwardRef<HTMLDivElement, ModalProps>(
  ({ trigger, onOpen, ...props }, ref) => {
    const enhancedTrigger = cloneElement(trigger, {
      onClick: (e: MouseEvent) => {
        trigger.props.onClick?.(e);
        onOpen();
      },
    });

    return (
      <>
        {enhancedTrigger}
        <MantineModal ref={ref} {...props} />
      </>
    );
  }
);

type ModalComponent = typeof ModalBase & {
  Actions: typeof Actions;
};

const Modal = ModalBase as ModalComponent;
Modal.Actions = Actions;

export default Modal;

import { FormIdProvider } from '@/context/FormId';
import { useModalState } from '@/context/ModalState';
import generateId from '@/helpers/generateId';
import { FC, ReactElement, ReactNode } from 'react';
import { Button, Modal } from '@/components/ui';

interface FormModalProps {
  children: ReactNode;
  title: string;
  cancelButtonLabel?: string;
  submitButtonLabel?: string;
  submitting: boolean;
  modalId: string;
  trigger: ReactElement;
}

const FormModal: FC<FormModalProps> = ({
  children,
  title,
  submitting,
  cancelButtonLabel,
  submitButtonLabel,
  modalId,
  trigger,
}) => {
  const { open, isOpen, close } = useModalState(modalId);

  const formId = generateId();

  return (
    <Modal
      onClose={close}
      onOpen={open}
      opened={isOpen}
      trigger={trigger}
      title={title}
    >
      <FormIdProvider formId={formId}>{children}</FormIdProvider>
      <Modal.Actions>
        <Button onClick={close} basic>
          {cancelButtonLabel}
        </Button>
        <Button type="submit" positive form={formId} loading={submitting}>
          {submitButtonLabel}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

FormModal.defaultProps = {
  cancelButtonLabel: 'Отмена',
  submitButtonLabel: 'Отправить',
};

export default FormModal;

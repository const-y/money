import { FC } from 'react';
import { Icon, Modal } from 'semantic-ui-react';
import { Button } from '@/components/ui';

interface CommonModalDeleteProps {
  onDelete: () => void;
  isLoading: boolean;
  name: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CommonModalDelete: FC<CommonModalDeleteProps> = ({
  onDelete,
  isLoading,
  name,
  setOpen,
  open,
}) => {
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    handleClose();
  };

  return (
    <Modal
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      trigger={<Icon link name="trash" />}
    >
      <Modal.Header>Удаление записи</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>Вы действительно хотите удалить запись "{name}"?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleClose} basic>
          Отмена
        </Button>
        <Button onClick={handleDelete} negative loading={isLoading}>
          Удалить
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CommonModalDelete;

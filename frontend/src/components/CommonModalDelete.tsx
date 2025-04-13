import { Button, Modal } from '@/components/ui';
import { FC } from 'react';
import { Icon } from 'semantic-ui-react';

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
      opened={open}
      trigger={<Icon link name="trash" />}
      title="Удаление записи"
    >
      <p>Вы действительно хотите удалить запись "{name}"?</p>
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

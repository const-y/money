import { deleteAccountType } from '@/api/accountTypes';
import queries from '@/constants/queries';
import { FC, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Button, Icon, Modal } from 'semantic-ui-react';

interface ModalDeleteProps {
  id: number;
  title: string;
}

const ModalDelete: FC<ModalDeleteProps> = ({ id, title }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(deleteAccountType, {
    onSuccess: () => {
      toast.success(`Запись "${title}" успешно удалена`);
      setOpen(false);
    },
    onError: () => {
      toast.error('Не удалось удалить запись');
    },
    onSettled: () => {
      queryClient.invalidateQueries(queries.ACCOUNT_TYPES);
    },
  });

  const handleDelete = () => {
    mutate(id);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Icon link name="trash" />}
    >
      <Modal.Header>Удаление записи</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>Вы действительно хотите удалить запись "{title}"?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} basic>
          Отмена
        </Button>
        <Button onClick={handleDelete} negative loading={isLoading}>
          Удалить
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalDelete;

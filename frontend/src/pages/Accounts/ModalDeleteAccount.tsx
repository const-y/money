import { deleteAccount } from '@/api/accounts';
import queries from '@/constants/queries';
import { FC, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Button, Icon, Modal } from 'semantic-ui-react';

interface ModalDeleteAccountProps {
  id: number;
  name: string;
}

const ModalDeleteAccount: FC<ModalDeleteAccountProps> = ({ id, name }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(deleteAccount, {
    onSuccess: () => {
      toast.success(`Запись "${name}" успешно удалена`);
      setOpen(false);
    },
    onError: () => {
      toast.error('Не удалось удалить запись');
    },
    onSettled: () => {
      queryClient.invalidateQueries(queries.ACCOUNTS);
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
          <p>Вы действительно хотите удалить запись "{name}"?</p>
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

export default ModalDeleteAccount;

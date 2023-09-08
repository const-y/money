import { deleteAccount } from '@/api/accounts';
import CommonModalDelete from '@/components/CommonModalDelete';
import queries from '@/constants/queries';
import { FC, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

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
    <CommonModalDelete
      onDelete={handleDelete}
      isLoading={isLoading}
      name={name}
      open={open}
      setOpen={setOpen}
    />
  );
};

export default ModalDeleteAccount;

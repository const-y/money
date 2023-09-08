import { deleteCategory } from '@/api/categories';
import CommonModalDelete from '@/components/CommonModalDelete';
import queries from '@/constants/queries';
import { FC, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

interface ModalDeleteProps {
  id: number;
  title: string;
}

const ModalDelete: FC<ModalDeleteProps> = ({ id, title }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(deleteCategory, {
    onSuccess: () => {
      toast.success(`Запись "${title}" успешно удалена`);
      setOpen(false);
    },
    onError: () => {
      toast.error('Не удалось удалить запись');
    },
    onSettled: () => {
      queryClient.invalidateQueries(queries.CATEGORIES);
    },
  });

  const handleDelete = () => {
    mutate(id);
  };

  return (
    <CommonModalDelete
      onDelete={handleDelete}
      isLoading={isLoading}
      name={title}
      open={open}
      setOpen={setOpen}
    />
  );
};

export default ModalDelete;

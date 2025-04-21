import { getMe } from '@/api/auth';
import queries from '@/constants/queries';
import User from '@/models/User';
import { useQuery } from 'react-query';

const useMeQuery = () => useQuery<User>(queries.ME, getMe);

export default useMeQuery;

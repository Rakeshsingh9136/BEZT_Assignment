import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, addUser } from '../store/userSlice';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';
import { fetchUsers, createUser as apiCreateUser } from '../services/api';
import { RootState } from '../store';

interface DefaultValues {
  username: string;
  phone: string;
  email: string;
  gender: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
}

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetchUsers();
        dispatch(setUsers(response.data));
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    loadUsers();
  }, [dispatch]);

  const handleCreateUser = async (data: DefaultValues) => {
    try {
      const response = await apiCreateUser(data);
      dispatch(addUser(response.data));
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">User Management</h1>
      <UserForm
        onSubmit={handleCreateUser}
        defaultValues={{
          username: '',
          phone: '',
          email: '',
          gender: '',
          address: '',
          pincode: '',
          city: '',
          state: '',
          country: '',
        }}
      />
      <UserList users={users} />
    </div>
  );
};

export default Home;

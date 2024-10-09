// pages/edit/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import UserForm from '../../components/UserForm';
import { updateUser as apiUpdateUser } from '../../services/api';

// Define types for User and Redux state
interface User {
  id: number;
  username: string; // Make sure to include all required properties
  phone: string;
  email: string;
  gender: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
}

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

interface RootState {
  user: User[];
}

const EditUser: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user);
  const user = users.find((user) => user.id === parseInt(id as string));

  const handleUpdateUser = async (data: DefaultValues) => {
    if (id) {
      await apiUpdateUser(parseInt(id as string), { ...data, id: parseInt(id as string) });
      router.push('/');
    }
  };

  return (
    <div className="p-4">
      {user ? (
        <UserForm
          onSubmit={handleUpdateUser}
          defaultValues={{
            username: user.username,
            phone: user.phone,
            email: user.email,
            gender: user.gender,
            address: user.address,
            pincode: user.pincode,
            city: user.city,
            state: user.state,
            country: user.country,
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditUser;

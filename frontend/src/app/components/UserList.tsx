import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../store/userSlice';
import { deleteUser as apiDeleteUser } from '../services/api';

interface User {
  id: number; // Use number or string based on your API data
  username: string;
}

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const dispatch = useDispatch();

  const handleDelete = async (id: number) => {
    await apiDeleteUser(id.toString()); // Convert id to string
    dispatch(deleteUser(id));
  };

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} className="flex justify-between">
          <span>{user.username}</span>
          <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white p-1">Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default UserList;

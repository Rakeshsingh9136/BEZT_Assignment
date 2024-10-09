"use client"
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { useEffect, useState } from 'react';
import { fetchUsers } from './services/api';

// Define the User type
interface User {
  id: number;
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

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetchUsers();
      // Ensure the data is correctly typed
      const data: User[] = response.data; // Adjust based on your API response structure
      setUsers(data);
    };

    getUsers();
  }, []);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    setSelectedUser(null); // Reset selected user after update
  };

  const handleFormSubmit = (data: Omit<User, 'id'>) => {
    const newUser: User = {
      id: users.length + 1, // Adjust based on your ID generation logic
      ...data,
    };
    setUsers([...users, newUser]);
    setSelectedUser(null); // Reset selected user after creation
  };

  return (
    <div>
      <h1>User Management</h1>
      <UserForm 
        onSubmit={handleFormSubmit} 
        defaultValues={selectedUser ? {
          username: selectedUser.username,
          phone: selectedUser.phone,
          email: selectedUser.email,
          gender: selectedUser.gender,
          address: selectedUser.address,
          pincode: selectedUser.pincode,
          city: selectedUser.city,
          state: selectedUser.state,
          country: selectedUser.country,
        } : {
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
      <UserList users={users}/>
    </div>
  );
}

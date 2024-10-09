import UserList from '../components/UserList';
import { useSelector } from 'react-redux';
import { RootState } from '../store'; // Import the RootState type

const UsersPage = () => {
  const users = useSelector((state: RootState) => state.user); // Directly access the user state

  return (
    <div>
      <h1>User List</h1>
      <UserList users={users} />
    </div>
  );
};

export default UsersPage;

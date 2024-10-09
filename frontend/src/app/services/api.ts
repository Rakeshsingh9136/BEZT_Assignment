import axios from 'axios';

const API_URL = 'http://localhost:3001/api/users';

// Define types for your data and id
interface UserData {
    
    email: string;
}

export const fetchUsers = () => axios.get(API_URL);
export const createUser = (data: UserData) => axios.post(API_URL, data);
export const updateUser = (id: string, data: UserData) => axios.patch(`${API_URL}/${id}`, data);
export const deleteUser = (id: string) => axios.delete(`${API_URL}/${id}`);

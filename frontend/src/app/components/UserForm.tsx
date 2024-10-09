import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  username: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
  gender: yup.string().required(),
  address: yup.string().required(),
  pincode: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  country: yup.string().required(),
});

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

interface UserFormProps {
  onSubmit: (data: DefaultValues) => void;
  defaultValues: DefaultValues;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit } = useForm<DefaultValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register('username')} placeholder="Username" />
      <input {...register('phone')} placeholder="Phone" />
      <input {...register('email')} placeholder="Email" />
      <input {...register('gender')} placeholder="Gender" />
      <input {...register('address')} placeholder="Address" />
      <input {...register('pincode')} placeholder="Pincode" />
      <input {...register('city')} placeholder="City" />
      <input {...register('state')} placeholder="State" />
      <input {...register('country')} placeholder="Country" />
      <button type="submit" className="bg-blue-500 text-white p-2">Submit</button>
    </form>
  );
};

export default UserForm;

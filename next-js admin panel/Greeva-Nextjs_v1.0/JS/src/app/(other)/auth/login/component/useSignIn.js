'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useQueryParams from '@/hooks/useQueryParams';
import { useAuthContext } from '@/context/useAuthContext';
const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const {
    push
  } = useRouter();
  const queryParams = useQueryParams();
  const { login: loginWithCookie } = useAuthContext();
  const loginFormSchema = yup.object({
    email: yup.string().email('Please enter a valid email').required('Please enter your email'),
    password: yup.string().required('Please enter your password')
  });
  const {
    control,
    handleSubmit
  } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const login = handleSubmit(async values => {
    setLoading(true);
    try {
      await loginWithCookie({
        email: values?.email,
        password: values?.password
      });
      push(queryParams['redirectTo'] ?? '/dashboard');
    } finally {
      setLoading(false);
    }
  });
  return {
    loading,
    login,
    control
  };
};
export default useSignIn;

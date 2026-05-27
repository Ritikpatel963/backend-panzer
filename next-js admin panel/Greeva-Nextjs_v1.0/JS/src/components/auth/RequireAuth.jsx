'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/useAuthContext';

const RequireAuth = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Keep it simple: send user to login page.
      // You can add returnTo later if needed.
      router.replace('/auth/login');
    }
  }, [isLoading, isAuthenticated, router, pathname]);

  if (isLoading) return null;
  if (!isAuthenticated) return null;
  return children;
};

export default RequireAuth;


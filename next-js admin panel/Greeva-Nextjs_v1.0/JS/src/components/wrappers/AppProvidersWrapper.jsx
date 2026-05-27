'use client';

import { ToastContainer } from 'react-toastify';
import dynamic from 'next/dynamic';
import { EmailProvider } from '@/context/useEmailContext';
import { AuthProvider } from '@/context/useAuthContext';
const LayoutProvider = dynamic(() => import('@/context/useLayoutContext').then(mod => mod.LayoutProvider), {
  ssr: false
});
const AppProvidersWrapper = ({
  children
}) => {
  return <>
      <AuthProvider>
        <LayoutProvider>
          <EmailProvider>
            {children}
            <ToastContainer theme="colored" />
          </EmailProvider>
        </LayoutProvider>
      </AuthProvider>
    </>;
};
export default AppProvidersWrapper;

"use client";

import { useLayoutContext } from '@/context/useLayoutContext';
import VerticalLayout from '@/components/layout/VerticalLayout';
import HorizontalLayout from '@/components/layout/HorizontalLayout';
import RequireAuth from '@/components/auth/RequireAuth';
const AdminLayout = ({
  children
}) => {
  const {
    layoutOrientation
  } = useLayoutContext();
  return <>
      {layoutOrientation === 'vertical' ? <VerticalLayout>
          <RequireAuth>{children}</RequireAuth>
        </VerticalLayout> : <>
          <HorizontalLayout>
            <RequireAuth>{children}</RequireAuth>
          </HorizontalLayout>
        </>}
    </>;
};
export default AdminLayout;

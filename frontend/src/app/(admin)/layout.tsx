
import { auth } from "@/auth";
import AdminContent from "@/components/layout/admin/admin.content";
import AdminFooter from "@/components/layout/admin/admin.footer";
import AdminHeader from "@/components/layout/admin/admin.header";
import AdminSider from "@/components/layout/admin/admin.sider";
import { AdminContextProvider } from "@/provider/admin.context";
// import React from 'react';

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth()
  return (
    <AdminContextProvider>
      <div style={{ display: "flex", width: "100%" }}>
        <div className='left-side' style={{
          // minWidth: 2,
        }}>
          <AdminSider />
        </div>
        <div className='right-side'
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1
          }}>
          <AdminHeader session={session} />
          <AdminContent>
            {children}
          </AdminContent>
          <AdminFooter />
        </div>
      </div>
    </AdminContextProvider>
  )
}
export default AdminLayout;
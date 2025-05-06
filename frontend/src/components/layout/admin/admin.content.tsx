'use client'

import { Layout } from "antd";

const { Content } = Layout;
const AdminContent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Content style={{ margin: '24px 16px 0' }}>
      <div
        style={{
          // padding: 24,
          minHeight: 'calc(100vh - 180px)',
          // width: 'calc(100vw - 180px )'
        }}
      >
        {children}
      </div>
    </Content>
  )
}
export default AdminContent;
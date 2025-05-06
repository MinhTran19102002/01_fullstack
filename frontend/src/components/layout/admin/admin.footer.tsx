'use client'
import { Layout } from 'antd';

const AdminFooter = () => {

  const { Footer } = Layout;
  return (
    <Footer style={{
      position: "sticky",
      bottom: 0,
      zIndex: 1000,
      textAlign: 'center',
      padding: 0,
      margin: 0,
    }}>
      MinhTran©{new Date().getFullYear()} Created by Minh Tran
    </Footer>
  )
}
export default AdminFooter;
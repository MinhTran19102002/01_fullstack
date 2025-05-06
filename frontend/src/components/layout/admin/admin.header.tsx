'use client'
import { AdminContext } from '@/provider/admin.context';
import { DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Dropdown, Layout, MenuProps, Space } from 'antd';
import { signOut } from 'next-auth/react';
import { useContext } from 'react';

const AdminHeader = (pros: any) => {

  const { Header } = Layout;
  const { collapseMenu, setCollapseMenu } = useContext(AdminContext)!;
  // const { data: session, status } = useSession()
  const { session } = pros
  // console.log("checkdata<<<: ", session, status)

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span>Thông tin cá nhân</span>
    },
    {
      key: '4',
      danger: true,
      label: <span onClick={() => signOut({ callbackUrl: '/auth/login' })}>Đăng xuất</span>,
    },
  ];
  return (
    <Header style={{
      position: "sticky",
      top: 0,
      zIndex: 1000,
      // width: "80%",
      padding: 0,
      display: "flex",
      background: "#f5f5f5",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <Button
        type="text"
        icon={collapseMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapseMenu(!collapseMenu)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <Dropdown menu={{ items }} >
        <a onClick={(e) => e.preventDefault()}
          style={{ color: "unset", lineHeight: "0 !important", marginRight: 20 }}
        >
          <Space>
            {session?.user.name.toUpperCase()}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </Header>
  )
}
export default AdminHeader;
'use client'
import React, { useContext } from 'react';
import { Layout, Menu } from 'antd';
import { AppstoreOutlined, CarOutlined, EnvironmentOutlined, RetweetOutlined, TeamOutlined } from '@ant-design/icons';
import { AdminContext } from '@/provider/admin.context';
import type { MenuProps } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];
const AdminSider = () => {

  const { collapseMenu } = useContext(AdminContext)!;

  const { Sider } = Layout;

  const items: MenuItem[] = [
    {
      key: "dashboard",
      label: <Link href={"/dashboard"}>Dashboard</Link>,
      icon: <AppstoreOutlined />,
    },
    {
      key: "user",
      label: <Link href={"/user"}>Users</Link>,
      icon: <TeamOutlined />,
    },
    {
      key: "bus",
      label: <Link href={"/bus"}>Buses</Link>,
      icon: <CarOutlined />,
    },
    {
      key: "busRoute",
      label: <Link href={"/busRoute"}>Buses Route</Link>,
      icon: <RetweetOutlined />,
    },
    {
      key: "trip",
      label: <Link href={"/trip"}>Trip</Link>,
      icon: <EnvironmentOutlined />,
    }
  ]
  const pathname = usePathname();
  const selectedKey = items.find(item => pathname.endsWith(String(item?.key) || 'defaultKey'))?.key || 'dashboard';
  return (
    <Sider
      collapsed={collapseMenu}
      width={collapseMenu ? 80 : 150}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 999,
        margin: 0,
        padding: 0
      }}
    >
      <div className="demo-logo-vertical" />
      {/* defaultSelectedKeys={['dashboard']}  */}
      <Menu theme="dark" mode="inline" selectedKeys={[String(selectedKey)]} items={items} style={{ height: '100vh' }} />
    </Sider>
  )
}
export default AdminSider;
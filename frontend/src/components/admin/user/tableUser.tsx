'use client'
import React, { useEffect, useState } from 'react';
import { Button, notification, Popconfirm, Space, Table, Tag } from 'antd';
import type { TableColumnsType } from 'antd';
import { createStyles } from 'antd-style';
import { userAll, userDelete } from '@/utils/actions/user.action';
import ModalEditUser from './modal.editUser';
import ModalAddUser from './modal.addUser';


const TableUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [dataSource, setDataSource] = useState<IUser[]>([]);

  const columns: TableColumnsType<IUser> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 250
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 200
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (value, record) => (
        <span style={{ color: value === 'admin' ? 'red' : value === 'guest' ? 'blue' : 'brown' }}>
          {value}
        </span>
      )
    },
    {
      title: "Action",
      key: "action",
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>Sửa</Button>
          <Popconfirm title="Bạn có chắc xóa người này?" onConfirm={() => handleDelete(record)}>
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),

    },
  ];



  const handleDelete = async (record: any) => {
    try {
      const res = await userDelete(record._id)
      if (res?.error) {
        notification.error({
          message: 'Delete user error',
          description: res?.message,
        });
        // 
        return
      }
      notification.success({
        message: 'Delete user success',
      });
      fetchData()
    } catch (error) {

    }
  }

  const handleEdit = async (record: any) => {
    setUser(record)
    setIsModalOpen(true)
  }
  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("check")
      const res = await userAll(); // ← Đổi thành API của bạn
      if (res && 'data' in res && res.data) {
        const list = res.data.data; // OK!
        setDataSource(list);
      }
      return
      // Assumes response is an array
    } catch (error) {
      console.error('Lỗi gọi API:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (<>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
      <h2>Quản lý người dùng</h2>
      <ModalAddUser fetchData={fetchData} />
    </div>
    <Table
      bordered
      columns={columns}
      dataSource={dataSource}
      loading={loading}
    />
    <ModalEditUser isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} user={user} setUser={setUser} fetchData={fetchData} />
  </>
  );
};

export default TableUser;
'use client'
import React, { useEffect, useState } from 'react';
import { Button, notification, Popconfirm, Space, Table, Tag } from 'antd';
import type { TableColumnsType } from 'antd';
import { createStyles } from 'antd-style';
import { userAll, userDelete } from '@/utils/actions/user.action';
import { busAll, busDelete } from '@/utils/actions/bus.action';
import ModalEditBus from './modal.editBus';
import { CarOutlined, ToolOutlined } from '@ant-design/icons';
import ModalAddBus from './modal.addBus';


const TableBus = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false);
  const [bus, setBus] = useState({})
  const [dataSource, setDataSource] = useState<IBus[]>([]);

  const columns: TableColumnsType<IBus> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200
    },
    {
      title: 'License Plate',
      dataIndex: 'licensePlate',
      key: 'licensePlate',
      width: 250
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (value, record) => (
        <Tag
          icon={value === 'seat' ? <CarOutlined /> : <ToolOutlined />}
          color={value === 'seat' ? 'red' : 'blue'}
        >
          {value}
        </Tag>
      )
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
      width: 250
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
      console.log(record)
      const res = await busDelete(record._id)
      console.log(res)
      if (res?.error) {
        notification.error({
          message: 'Delete bus error',
          description: res?.message,
        });
        // 
        return
      }
      notification.success({
        message: 'Delete bus success',
      });
      fetchData()
    } catch (error) {

    }
  }

  const handleEdit = async (record: IBus) => {
    setBus(record)
    setIsModalOpen(true)
  }

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("check")
      const res = await busAll(); // ← Đổi thành API của bạn
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
      <h2>Quản lý xe</h2>
      <ModalAddBus fetchData={fetchData} />
    </div>
    <Table
      bordered
      columns={columns}
      dataSource={dataSource}
      loading={loading}
    />
    <ModalEditBus isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} bus={bus} setBus={setBus} fetchData={fetchData} />
  </>
  );
}

export default TableBus;

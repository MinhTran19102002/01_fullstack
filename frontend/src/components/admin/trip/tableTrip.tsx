'use client'
import React, { useEffect, useState } from 'react';
import { Button, notification, Popconfirm, Space, Table, Tag } from 'antd';
import type { TableColumnsType } from 'antd';
import { createStyles } from 'antd-style';
import { userAll, userDelete } from '@/utils/actions/user.action';
import { busAll, busDelete } from '@/utils/actions/bus.acction';
import { CarOutlined, ToolOutlined } from '@ant-design/icons';
import ModalAddBusRoute from './modal.addTrip';
import ModalEditBusRoute from './modal.editTrip';
import { busRouteAll } from '@/utils/actions/busRoute';
import { tripAll, tripDelete } from '@/utils/actions/trip.action';
import { toVietnamTimeDate } from '@/utils/util';


const TableTrip = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false);
  const [busRoute, setBusRoute] = useState({})
  const [dataSource, setDataSource] = useState<ITrip[]>([]);

  const columns: TableColumnsType<ITrip> = [
    {
      title: 'Xe',
      dataIndex: ['bus', 'licensePlate'],
      key: 'bus',
      width: 100
    },
    {
      title: 'Tài xế',
      dataIndex: ['driver', 'name'],
      key: 'driver.name',
      width: 200
    },
    {
      title: 'Tuyến',
      dataIndex: ['busRoute', 'departure'],
      key: 'busRoute',
      render: (text, record) => (
        < p>{record.busRoute?.departure} {record.is_outbound ? '->' : '<-'} {record.busRoute?.destination}</p>
      ),
      width: 250
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price),
      width: 100
    },
    {
      title: 'Thời gian khởi hành',
      dataIndex: 'departure_time',
      key: 'departure_time',
      width: 200,
      render: (value, record) => {
        return value ? toVietnamTimeDate(value) : '-';
      }
    },
    {
      title: 'Thời gian đến',
      dataIndex: 'arrival_time',
      key: 'arrival_time',
      width: 200,
      render: (value, record) => {
        return value ? toVietnamTimeDate(value) : '-';
      }
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
      const res = await tripDelete(record._id)
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

  const handleEdit = async (record: ITrip) => {
    setBusRoute(record)
    setIsModalOpen(true)
  }

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await tripAll(); // ← Đổi thành API của bạn
      // const res = {}
      if (res && 'data' in res && res.data) {
        let list = res.data.data; // OK!
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
      <h2>Quản lý tuyến xe</h2>
      <ModalAddBusRoute fetchData={fetchData} />
    </div>
    <Table
      bordered
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      scroll={{ y: 55 * 5 }}
      style={{ width: '99%' }}
    />
    <ModalEditBusRoute isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} busRoute={busRoute} setBusRoute={setBusRoute} fetchData={fetchData} />
  </>
  );
}

export default TableTrip;

'use client'
import React, { useEffect, useState } from 'react';
import { Button, notification, Popconfirm, Space, Table, Tag } from 'antd';
import type { TableColumnsType } from 'antd';
import { createStyles } from 'antd-style';
import { userAll, userDelete } from '@/utils/actions/user.action';
import { busAll, busDelete } from '@/utils/actions/bus.action';
import { CarOutlined, ToolOutlined } from '@ant-design/icons';
import ModalAddBusRoute from './modal.addBusRoute';
import ModalEditBusRoute from './modal.editBusRoute';
import { busRouteAll, busRouteDelete } from '@/utils/actions/busRoute.action';
import ModalEditSchudule from './modal.EditShudule';


const TableBusRoute = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalSheduleOpen, setIsModalSheduleOpen] = useState(false)
  const [loading, setLoading] = useState(false);
  const [busRoute, setBusRoute] = useState({})
  const [dataSource, setDataSource] = useState<IBusRoute[]>([]);

  const columns: TableColumnsType<IBusRoute> = [
    {
      title: 'Điểm đi',
      dataIndex: 'departure',
      key: 'departure',
      width: 150
    },
    {
      title: 'Điểm đến',
      dataIndex: 'destination',
      key: 'destination',
      width: 150
    },
    {
      title: 'Giá cho xe giường nằm',
      dataIndex: 'priceForSleep',
      key: 'priceForSleep',
      width: 50,
      render: (value) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <span>{value}</span>
          <Tag color="yellow">
            <span style={{ fontSize: '12px' }}>VND</span>
          </Tag>

        </div>
      ),
    },
    {
      title: 'Giá cho xe ghế ngồi',
      dataIndex: 'priceForSeat',
      key: 'priceForSeat',
      width: 50,
      render: (value) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <span>{value}</span>
          <Tag color="yellow">
            <span style={{ fontSize: '12px' }}>VND</span>
          </Tag>

        </div>
      ),
    },
    {
      title: 'Khoảng cách',
      dataIndex: 'distance',
      key: 'distance',
      width: 50,
      render: (value) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <span>{value}</span>
          <Tag color="blue">
            <span style={{ fontSize: '12px' }}>km</span>
          </Tag>

        </div>
      ),
    },
    {
      title: 'Thời gian ước tính',
      dataIndex: 'estimatedTime',
      key: 'estimatedTime',
      width: 50,
      render: (value) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <span>{value}</span>
          <Tag color="red">
            <span style={{ fontSize: '12px' }}>giờ</span>
          </Tag>

        </div>
      ),
    },

    {
      title: "Action",
      key: "action",
      fixed: 'right',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleSchedule(record)}>Sửa lịch trình</Button>
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
      const res = await busRouteDelete(record._id)
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

  const handleEdit = async (record: IBusRoute) => {
    setBusRoute(record)
    setIsModalOpen(true)
  }


  const handleSchedule = async (record: IBusRoute) => {
    setBusRoute(record)
    setIsModalSheduleOpen(true)
  }

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("check")
      const res = await busRouteAll(); // ← Đổi thành API của bạn
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
      <h2>Quản lý tuyến xe</h2>
      <ModalAddBusRoute fetchData={fetchData} />
    </div>
    <Table
      bordered
      columns={columns}
      dataSource={dataSource}
      loading={loading}
    />
    <ModalEditBusRoute isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} busRoute={busRoute} setBusRoute={setBusRoute} fetchData={fetchData} />
    <ModalEditSchudule isModalSheduleOpen={isModalSheduleOpen} setIsModalSheduleOpen={setIsModalSheduleOpen} busRoute={busRoute} setBusRoute={setBusRoute} fetchData={fetchData} />
  </>
  );
}

export default TableBusRoute;

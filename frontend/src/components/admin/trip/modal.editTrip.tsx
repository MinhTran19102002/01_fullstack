'use client'

import { busUpdate } from "@/utils/actions/bus.acction";
import { busRouteUpdate } from "@/utils/actions/busRoute";
import { userUpdate } from "@/utils/actions/user.action";
import { SwapOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, InputNumber, Modal, notification, Radio, Row } from "antd";
import { useEffect, useState } from "react";

const ModalEditTrip = (pros: any) => {
  const { isModalOpen, setIsModalOpen, busRoute, setBusRoute, fetchData } = pros
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldValue("_id", busRoute?._id)
    form.setFieldValue("departure", busRoute?.departure)
    form.setFieldValue("destination", busRoute?.destination)
    form.setFieldValue("distance", busRoute?.distance)
    form.setFieldValue("estimatedTime", busRoute?.estimatedTime)
  }, [busRoute])

  const onCancel = () => {
    setIsModalOpen(false)
  }
  const onFinish = async (values: any) => {
    const { departure, destination, ...updateBusRoute } = values
    const res = await busRouteUpdate(updateBusRoute);
    if (res?.error) {
      fetchData()
      notification.error({
        message: 'Update error',
        description: res?.message,
      });
      // 
      return
    }
    notification.success({
      message: 'Update success',
    });
    fetchData()
    setBusRoute(null)
    setIsModalOpen(false)
  }

  return <>
    <Modal title="Sửa thông tin tuyến"
      open={isModalOpen}
      onOk={() => setIsModalOpen(false)}
      onCancel={onCancel}
      maskClosable={false}
      footer={null}>

      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        layout='vertical'
        form={form}
      >
        <Form.Item
          label={null}
          name="_id"
          hidden
        >
          <Input hidden />
        </Form.Item>
        <Row gutter={16}>
          <Col span={11}>
            <Form.Item
              label="Điểm đi"
              name="departure"
            >
              <Input disabled />
            </Form.Item >
          </Col>
          <Col span={2} style={{ textAlign: 'center' }}>
            <SwapOutlined style={{ fontSize: '20px', color: '#888' }} />
          </Col>
          <Col span={11}>
            <Form.Item
              label="Điểm đến"
              name="destination"
            >
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Khoảng cách"
              name="distance"
              rules={[{ required: true, message: 'Please input your distance!' }]}
            >
              <InputNumber addonAfter="km" style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Thời gian ước tính"
              name="estimatedTime"
              rules={[{ required: true, message: 'Please input your estimated time!' }]}
            >
              <InputNumber addonAfter="h" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Sửa
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  </>
}

export default ModalEditTrip;
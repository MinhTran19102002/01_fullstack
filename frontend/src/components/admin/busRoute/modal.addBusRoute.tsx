'use client'

import { busAdd } from "@/utils/actions/bus.action";
import { busRouteAdd } from "@/utils/actions/busRoute.action";
import { userAdd } from "@/utils/actions/user.action";
import { Button, Col, Form, Input, InputNumber, Modal, notification, Radio, Row, Select } from "antd";
import { useState } from "react";

export const LOCATIONS = ['Kiên Giang', 'An Giang', 'Cần Thơ', 'Đồng Tháp', 'Bình Dương', 'Đồng Nai', 'Hồ Chí Minh'];

const ModalAddBusRoute = (pros: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm();
  const { fetchData } = pros

  const { Option } = Select;



  const onCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
  }
  const onFinish = async (values: any) => {
    // const { email, ...updateUser } = values
    const res = await busRouteAdd(values);
    if (res?.error) {
      notification.error({
        message: 'Add bus route error',
        description: res?.message,
      });
      // 
      return
    }
    notification.success({
      message: 'Add bus route success',
    });
    fetchData()
    onCancel()
  }

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>Thêm tuyến</Button>
      <Modal title="Thêm tuyến"
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
            label="Điểm đi"
            name="departure"
            rules={[
              {
                required: true,
                message: 'Please input your departure!',
              },
            ]}
          >
            <Select placeholder="Chọn điểm đi">
              {LOCATIONS.map((loc) => (
                <Option key={loc} value={loc}>
                  {loc}
                </Option>
              ))}
            </Select>
          </Form.Item >

          <Form.Item
            label="Điểm đến"
            name="destination"
            rules={[
              { required: true, message: 'Please input your destination!' },
            ]}
          >
            <Select placeholder="Chọn điểm đến">
              {LOCATIONS.map((loc) => (
                <Option key={loc} value={loc}>
                  {loc}
                </Option>
              ))}
            </Select>
          </Form.Item>


          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Giá cho xe giường nằm"
                name="priceForSleep"
                rules={[{ required: true, message: 'Please input your priceForSleep!' }]}
              >
                <InputNumber<number> addonAfter="vnd" min={1000}
                  step={1000} // bước nhảy 1000
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value ? parseInt(value.replace(/,/g, '')) : 0} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Giá cho xe ghế ngồi"
                name="priceForSeat"
                rules={[{ required: true, message: 'Please input your priceForSeat!' }]}
              >
                <InputNumber<number> addonAfter="vnd" min={1000}
                  step={1000} // bước nhảy 1000
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value ? parseInt(value.replace(/,/g, '')) : 0} />
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
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ModalAddBusRoute;
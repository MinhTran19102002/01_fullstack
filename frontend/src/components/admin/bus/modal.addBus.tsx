'use client'

import { busAdd } from "@/utils/actions/bus.acction";
import { userAdd } from "@/utils/actions/user.action";
import { Button, Form, Input, Modal, notification, Radio } from "antd";
import { useState } from "react";

const ModalAddBus = (pros: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm();
  const { fetchData } = pros

  const onCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
  }
  const onFinish = async (values: any) => {
    // const { email, ...updateUser } = values
    const res = await busAdd(values);
    if (res?.error) {
      notification.error({
        message: 'Add bus error',
        description: res?.message,
      });
      // 
      return
    }
    notification.success({
      message: 'Add bus success',
    });
    fetchData()
    // setUser(null)
    onCancel()
  }

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>Thêm xe</Button>
      <Modal title="Sửa tài khoản"
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
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
              { pattern: /^Xe-[0-9]{2}$/, message: 'Name must be in format Xe-XX (e.g., Xe-01)' },
            ]}
          >
            <Input placeholder="Xe-XX" defaultValue="Xe-XX" />
          </Form.Item >

          <Form.Item
            label="License Plate"
            name="licensePlate"
            rules={[
              { required: true, message: 'Please input your license plate!' },
              { pattern: /^[0-9]{2}[A-Z]-[0-9]{5}$/, message: 'License Plate must be in format 12A-12345 (Ex: 12A-12345)' },
            ]}
          >
            <Input placeholder="Ex: 12A-12345" />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please input your type!' }]}
          >
            <Radio.Group defaultValue="seat">
              <Radio value={"seat"}>Giường ngồi (45 chỗ)</Radio>
              <Radio value={"bed"}>Giường nằm (40 chỗ)</Radio>
            </Radio.Group>
          </Form.Item>
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

export default ModalAddBus;
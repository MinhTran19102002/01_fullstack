'use client'

import { userAdd, userUpdate } from "@/utils/actions/user.action";
import { Button, Form, Input, Modal, notification, Radio } from "antd";
import { useState } from "react";

const ModalAddUser = (pros: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm();
  const { fetchData } = pros

  const onCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }
  const onFinish = async (values: any) => {
    const { email, ...updateUser } = values
    const res = await userAdd(values);
    if (res?.error) {
      notification.error({
        message: 'Add user error',
        description: res?.message,
      });
      // 
      return
    }
    notification.success({
      message: 'Add user success',
    });
    fetchData()
    // setUser(null)
    onCancel()
  }

  return <>
    <Button type="primary" onClick={() => setIsModalOpen(true)}>Thêm tài khoản</Button>
    <Modal title="Thêm tài khoản tài khoản"
      centered
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
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Username"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: 'Please input your phone!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Radio.Group>
            <Radio.Button value="guest">Khách</Radio.Button>
            <Radio.Button value="driver">Tài xế</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  </>
}

export default ModalAddUser;
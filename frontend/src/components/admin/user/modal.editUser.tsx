'use client'

import { userUpdate } from "@/utils/actions/user.action";
import { Button, Form, Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";

const ModalEditUser = (pros: any) => {
  const { isModalOpen, setIsModalOpen, user, setUser, fetchData } = pros
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldValue("_id", user?._id)
    form.setFieldValue("email", user?.email)
    form.setFieldValue("name", user?.name)
    form.setFieldValue("phone", user?.phone)
    form.setFieldValue("address", user?.address)
  }, [user])

  const onCancel = () => {
    setIsModalOpen(false)
  }
  const onFinish = async (values: any) => {
    const { email, ...updateUser } = values
    const res = await userUpdate(updateUser);
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
    setUser(null)
    setIsModalOpen(false)
  }

  return <>
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
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Name"
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
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Sửa
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  </>
}

export default ModalEditUser;
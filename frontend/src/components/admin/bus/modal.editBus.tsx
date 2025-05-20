'use client'

import { busUpdate } from "@/utils/actions/bus.action";
import { userUpdate } from "@/utils/actions/user.action";
import { Button, Form, Input, Modal, notification, Radio } from "antd";
import { useEffect, useState } from "react";

const ModalEditBus = (pros: any) => {
  const { isModalOpen, setIsModalOpen, bus, setBus, fetchData } = pros
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldValue("_id", bus?._id)
    form.setFieldValue("name", bus?.name)
    form.setFieldValue("licensePlate", bus?.licensePlate)
    form.setFieldValue("type", bus?.type)
  }, [bus])

  const onCancel = () => {
    setIsModalOpen(false)
  }
  const onFinish = async (values: any) => {
    const { name, ...updateBus } = values
    const res = await busUpdate(updateBus);
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
    setBus(null)
    setIsModalOpen(false)
  }

  return <>
    <Modal title="Sửa thông tin xe"
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
          ]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="License Plate"
          name="licensePlate"
          rules={[{ required: true, message: 'Please input your license plate!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: 'Please input your type!' }]}
        >
          <Radio.Group>
            <Radio value={"seat"}>Giường ngồi (45 chỗ)</Radio>
            <Radio value={"bed"}>Giường nằm (40 chỗ)</Radio>
          </Radio.Group>
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

export default ModalEditBus;
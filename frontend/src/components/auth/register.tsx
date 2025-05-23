'use client'
import React from 'react';
import { Button, Col, Divider, Form, Input, Row } from 'antd';
import Link from 'next/link';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { sendRequest } from '@/utils/api';
import { useRouter } from 'next/navigation'


const Register = () => {
  const router = useRouter()

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    let user = null
    user = await sendRequest<IBackendRes<any>>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BACKEND}/v1/auth/register`,
      body: {
        ...values
      }
    })
    console.log(user);
    if (user?.data._id) {
      router.push(`/auth/verify/${user?.data._id}`)
    }
  };
  return (
    <Row justify={"center"} style={{ marginTop: "30px" }}>
      <Col lg={8} md={12} xs={24} >
        <fieldset style={{
          padding: "15px",
          margin: "5px",
          border: "1px solid #ccc",
          borderRadius: "5px"
        }}>
          <legend>Đăng Ký</legend>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            layout='vertical'
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
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Link href={"/home"}><ArrowLeftOutlined /> Quay lại trang chủ</Link>
          <Divider />
          <div style={{ textAlign: "center" }}>
            Đã có tài khoản? <Link href={"/auth/login"}>Đăng nhập</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  )
}

export default Register;
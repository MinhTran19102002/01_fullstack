'use client'
import React, { useState } from 'react';
import { Button, Col, Divider, Form, Input, notification, Row } from 'antd';
import Link from 'next/link';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { authenticate } from '@/utils/actions/user.action';
import { useRouter } from 'next/navigation'
import ModalReactive from './modal.reactive';
import { auth } from '@/auth';
import { useSession } from 'next-auth/react';


const Login = () => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const { data } = useSession();


  const onFinish = async (values: any) => {
    setUserEmail("")
    const { email, password } = values
    const res = await authenticate(email, password)
    if (res?.error) {
      if (res?.code === 2) {
        setUserEmail(email)
        setIsModalOpen(true)
      }
      // thong bao loi
      notification.error({
        message: 'Login error',
        description: res?.error,
      });

    } else {
      //redirect sang dashboard
      console.log("check o login<<<", res)
      // if (data?.user.role === "admin") {
      router.push("/auth/login")
      // }
      // else {
      //   router.push('/home')
      // }

    }
  };
  return (
    <>
      <Row justify={"center"} style={{ marginTop: "30px" }}>
        <Col lg={8} md={12} xs={24} >
          <fieldset style={{
            padding: "15px",
            margin: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px"
          }}>
            <legend>Đăng Nhập</legend>
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
              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <Link href={"/home"}><ArrowLeftOutlined /> Quay lại trang chủ</Link>
            <Divider />
            <div style={{ textAlign: "center" }}>
              Chưa có tài khoản? <Link href={"/auth/register"}>Đăng ký tại đây</Link>
            </div>
          </fieldset>
        </Col>
      </Row>
      <ModalReactive isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} userEmail={userEmail} />
    </>
  )
}

export default Login;
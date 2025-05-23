'use client'
import React from 'react';
import { Button, Col, Divider, Form, Input, notification, Row } from 'antd';
import Link from 'next/link';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { sendRequest } from '@/utils/api';
import { useRouter } from 'next/navigation'

const Verify = (pros: any) => {
  const router = useRouter()
  const { id } = pros
  console.log(id)
  const onFinish = async (values: any) => {
    console.log('Success:', values);
    // let user = null
    const res = await sendRequest<IBackendRes<any>>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BACKEND}/v1/auth/verify`,
      body: {
        ...values
      }
    })
    if (res?.error) {
      notification.error({
        message: 'Verify error',
        description: res?.message,
      });
    }
    notification.success({
      message: 'Verify success',
    });
    router.push('/auth/login')
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
          <legend>Kích hoạt tài khoản</legend>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            layout='vertical'
          >

            <Form.Item
              label="Id"
              name="_id"
              initialValue={id}
              hidden
              rules={[
                {
                  required: true,

                },
              ]}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Code"
              name="codeId"
              rules={[{ required: true, message: 'Please input your code!' }]}
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

export default Verify;
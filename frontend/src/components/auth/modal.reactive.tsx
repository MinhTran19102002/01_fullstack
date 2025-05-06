'use client'

import { useHasMounted } from "@/utils/customHook";
import { Button, Form, Input, Modal, notification, Steps } from "antd";
import { useEffect, useState } from "react";
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import Email from "next-auth/providers/email";
import { sendRequest } from "@/utils/api";


const ModalReactive = (pros: any) => {
  const { isModalOpen, setIsModalOpen, userEmail } = pros
  const [stepCurrent, setStepCurrent] = useState(0)
  const [id, setId] = useState("")
  const hasMounted = useHasMounted();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldValue("email", userEmail)
  }, [userEmail]);


  if (!hasMounted) return <></>

  const onFinish0 = async (value: any) => {

    const res = await sendRequest<IBackendRes<any>>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BACKEND}/v1/auth/retryCode`,
      body: {
        ...value
      }
    })
    if (res?.error) {
      notification.error({
        message: 'Retry error',
        description: res?.message,
      });
    } else {
      setId(res.data._id)
      setStepCurrent(1);
    }
  }

  const onFinish1 = async (value: any) => {
    const { codeId } = value
    const res = await sendRequest<IBackendRes<any>>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BACKEND}/v1/auth/verify`,
      body: {
        _id: id,
        codeId: codeId
      }
    })
    if (res?.error) {
      notification.error({
        message: 'Verify error',
        description: res?.message,
      });
      return
    }
    notification.success({
      message: 'Verify success',
    });
    setStepCurrent(2);
  }

  const onCancel = () => {
    setIsModalOpen(false), setStepCurrent(0), setId("")
  }


  return (
    <>
      <Modal title="Kích hoạt tài khoản"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={onCancel}
        maskClosable={false}
        footer={null}>

        <Steps
          current={stepCurrent}
          items={[
            {
              title: 'Login',
              // status: 'finish',
              icon: <UserOutlined />,
            },
            {
              title: 'Verification',
              // status: 'finish',
              icon: <SolutionOutlined />,
            },
            {
              title: 'Done',
              // status: 'wait',
              icon: <SmileOutlined />,
            },
          ]}
        />
        <div style={{ marginTop: 24 }}>
          {stepCurrent === 0 && (
            <>
              <div style={{ marginBottom: 24 }}>
                <p>Tài khoản của bạn chưa được kích hoạt, nhấn gửi để nhận mã xác nhận từ gmail</p>
              </div>
              <Form
                name="basic"
                onFinish={onFinish0}
                autoComplete="off"
                layout='vertical'
                form={form}
              >
                <Form.Item
                  label={null}
                  name="email"
                >
                  <Input disabled />
                </Form.Item>
                <Form.Item label={null}>
                  <Button type="primary" htmlType="submit">
                    Gửi
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}
          {stepCurrent === 1 && (
            <div><p style={{ marginBottom: 24 }}>Kiểm tra lại mail bạn vừa đăng ký, nhập mã code xác thực dưới đây</p>
              <Form
                name="basic"
                onFinish={onFinish1}
                autoComplete="off"
                layout='vertical'
              >
                <Form.Item
                  label="Code"
                  name="codeId"
                  required
                >
                  <Input />
                </Form.Item>
                <Form.Item label={null}>
                  <Button type="primary" htmlType="submit">
                    Xác nhận
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}
          {stepCurrent === 2 && (
            <div>
              <p style={{ marginBottom: 24 }}> Chúc mừng bạn đã xác thực thành công, vui lòng đăng nhập</p>
              <Button type="primary" onClick={onCancel}>Ok</Button>
            </div>
          )}
        </div>



      </Modal>
    </>
  );
}

export default ModalReactive;
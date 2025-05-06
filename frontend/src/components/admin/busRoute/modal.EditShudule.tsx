import { busRouteUpdate } from "@/utils/actions/busRoute";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, notification, Space } from "antd"
import { useForm } from "antd/es/form/Form"
import { useEffect } from "react";

const ModalEditSchudule = (pros: any) => {
  const { isModalSheduleOpen, setIsModalSheduleOpen, busRoute, setBusRoute, fetchData } = pros
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldValue('_id', busRoute?._id)
    form.setFieldValue('schedules', busRoute?.schedules)
  }, [busRoute])

  const onCancel = () => {
    fetchData()
    setBusRoute(null)
    setIsModalSheduleOpen(false)
  }
  const onFinish = async (values: any) => {
    const { ...updateBusRoute } = values
    console.log(updateBusRoute)
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
    onCancel()
  }

  return <>
    <Modal title="Sửa thông tin lịch trình"
      open={isModalSheduleOpen}
      onCancel={onCancel}
      maskClosable={false}
      width={300}
      footer={null}
      bodyStyle={{
        maxHeight: '60vh', // giới hạn chiều cao body modal
        overflowY: 'auto',  // nếu vẫn còn dài quá thì cho scroll nhẹ
      }}
      centered>

      <Form
        form={form}
        name="trip_locations"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label={null}
          name="_id"
          hidden
        >
          <Input hidden />
        </Form.Item>
        <Form.List
          name="schedules"
        // rules={[
        //   {
        //     validator: async (_, locations) => {
        //       if (!locations || locations.length < 1) {
        //         return Promise.reject(new Error('Hãy thêm ít nhất một địa điểm!'));
        //       }
        //     },
        //   },
        // ]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={name}
                    fieldKey={fieldKey}
                    rules={[{ required: true, message: 'Vui lòng nhập địa điểm' }]}
                  >
                    <Input placeholder="Nhập địa điểm" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} style={{ color: 'red' }} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Thêm địa điểm
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu danh sách
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  </>
}

export default ModalEditSchudule;
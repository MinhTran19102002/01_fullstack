'use client'

import { busAdd } from "@/utils/actions/bus.action";
import { busRouteAdd } from "@/utils/actions/busRoute.action";
import { getDataTrip, tripAdd } from "@/utils/actions/trip.action";
import { userAdd } from "@/utils/actions/user.action";
import { Button, Col, DatePicker, Form, Input, InputNumber, Modal, notification, Radio, Row, Select } from "antd";
import { User } from "next-auth";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';

const ModalAddTrip = (pros: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [time, setTime] = useState(0)
  const [priceDefault, setPriceDefault] = useState<any>(null)
  const [bus, setBus] = useState<BusOption[]>([])
  const [driver, setDriver] = useState<UserOption[]>([])
  const [busRoute, setBusRoute] = useState<BusRouteOption[]>([])
  const [form] = Form.useForm();
  const { fetchData } = pros
  const { Option } = Select;
  const now = dayjs();

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await getDataTrip();
        setBus(data?.data.bus)
        setBusRoute(data?.data.busRoute)
        setDriver(data?.data.user)
        // làm gì đó với data
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataAsync();
    if (priceDefault) {
      onChangePrice();
    }
    if (time) {
      onChangeHour();
    }
  }, [priceDefault, time])

  const onCancel = () => {
    fetchData()
    form.resetFields()
    setIsModalOpen(false)
  }
  const onFinish = async (values: any) => {
    // const { email, ...updateUser } = values

    const { bus, busRoute, driver, departure_time, arrival_time, price, is_outbound } = values

    const { _id: routeId } = JSON.parse(busRoute);
    const { _id: busId } = JSON.parse(bus);
    const res = await tripAdd({ bus: busId, busRoute: routeId, driver, departure_time, arrival_time, price, is_outbound });
    console.log(departure_time)

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

    onCancel()
  }


  const onChangeHour = () => {
    const value = form.getFieldValue('departure_time')
    console.log(value)
    if (value) {
      const updatedTime = value.add(time, 'hour');
      form.setFieldValue('arrival_time', updatedTime)
    }
  };

  const onChangePrice = () => {
    const value = form.getFieldValue('bus')
    if (!value) {
      return
    }
    const { type } = JSON.parse(value);
    console.log(type)
    console.log(priceDefault)
    if (type && priceDefault) {
      type === "bed" ? form.setFieldValue("price", priceDefault.priceForSleep) : form.setFieldValue("price", priceDefault.priceForSeat)
    }
  };

  const onChangeestimatedTime = (value: any) => {
    const { estimatedTime, priceForSleep, priceForSeat } = JSON.parse(value)
    setPriceDefault({ priceForSleep: priceForSleep, priceForSeat: priceForSeat })
    setTime(estimatedTime)
    console.log("goi khi thay doi route: ", priceDefault, { priceForSleep: priceForSleep, priceForSeat: priceForSeat })
    // onChangePrice()
    // onChangeHour()
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>Thêm tuyến</Button>
      <Modal title="Thêm chuyến"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={onCancel}
        maskClosable={false}
        footer={null}
        centered>

        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          layout='vertical'
          form={form}
          initialValues={{
            is_outbound: true, // ✅ đặt giá trị mặc định ở đây
          }}
        >
          <Form.Item
            label="Xe chạy"
            name="bus"
            rules={[
              {
                required: true,
                message: 'Please input your bus!',
              },
            ]}
          >
            <Select onChange={onChangePrice} >
              {bus?.map((loc) => (
                <Option key={loc._id} value={JSON.stringify(loc)}>
                  {loc?.name + ':       '}{loc?.licensePlate} ({loc?.type === 'seat' ? 'Ghế' : 'Giường'})
                </Option>
              ))}
            </Select>
          </Form.Item >

          <Form.Item
            label="Tài xế"
            name="driver"
            rules={[
              { required: true, message: 'Please input your driver!' },
            ]}
          >
            <Select placeholder="Chọn tài xế">
              {driver?.map((loc) => (
                <Option key={loc._id} value={loc._id} >
                  {loc?.name} ({loc?.email})
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Row gutter={5}>
            <Col span={16}>
              <Form.Item
                label="Tuyến"
                name="busRoute"
                rules={[
                  { required: true, message: 'Please input your busRoute!' },
                ]}
              >
                <Select onChange={onChangeestimatedTime}>
                  {busRoute?.map((loc) => (
                    <Option key={loc._id} value={JSON.stringify(loc)} >
                      <p>{loc?.departure} {'->'}  {loc?.destination} ({'Thời lượng: ' + loc.estimatedTime + 'h'})</p>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Chiều"
                name="is_outbound"
                rules={[{ required: true, message: 'Please input your is_outbound!' }]}
              >
                <Radio.Group>
                  <Radio value={true}>Xuôi</Radio>
                  <Radio value={false}>Ngược</Radio>
                </Radio.Group>
              </Form.Item>

            </Col>
          </Row>

          <Form.Item
            label="Giá"
            name="price"
            rules={[
              { required: true, message: 'Please input your price!' },
            ]} >
            <InputNumber<number> addonAfter="vnd" min={1000}
              step={1000} // bước nhảy 1000
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value ? parseInt(value.replace(/,/g, '')) : 0} />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Thời gian khởi hành"
                name="departure_time"
                rules={[
                  { required: true, message: 'Please input your departure_time!' },
                ]}
              >
                <DatePicker
                  showTime
                  onChange={onChangeHour}
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Chọn ngày giờ"
                  disabledDate={(current) => {
                    // Không cho chọn ngày trong quá khứ
                    return current && current.isBefore(dayjs(), 'day');
                  }}

                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Thời gian đến"
                name="arrival_time"
                rules={[
                  { required: true, message: 'Please input your arrival_time!' },
                ]}
              >
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Chọn ngày giờ"
                  disabled
                />
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

export default ModalAddTrip;
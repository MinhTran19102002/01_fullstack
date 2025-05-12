import { Modal } from "antd";


const ModalSchedule = (pros: any) => {
  const { isModalOpen, setIsModalOpen, schedule = [] } = pros

  const onCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <Modal title="Lịch trình xe chạy"
      open={isModalOpen}
      onOk={() => setIsModalOpen(false)}
      onCancel={onCancel}
      maskClosable={false}
      footer={null}
      centered>
    </Modal>
  )

}


export default ModalSchedule;
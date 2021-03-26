import { LikeOutlined } from "@ant-design/icons";
import { Button, Input, notification, Form, Modal } from "antd";
import { useState } from "react";
import { useApi } from "../contexts/ApiContext";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const tailLayout = {
  wrapperCol: { offset: 10, span: 2 },
};

const AddModal = (props) => {
  const [isValid, setValidForm] = useState(false);
  const { burgers } = useApi();
  const { mutate } = burgers.usePostBurger();

  const onFinish = async (values) => {
    try {
      const data = await mutate(values);
      setValidForm(true);
    } catch (e) {
      notification.open({
        message: e.message,
        description: "Échec, veuillez réessayer.",
        type: "error",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };
  return (
    <Modal
      title="Ajouter un burger"
      visible={props.showModal}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
    >
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="Intitulé" name="title">
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>

        <Form.Item label="Prix" name="price">
          <Input />
        </Form.Item>

        <Form.Item label="Image" name="image">
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button htmlType="submit">Confirmer</Button>
          {isValid && <LikeOutlined />}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;

import React, { useState } from "react";
import { Modal, Button, Form, Input, notification } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import { useApi } from "../contexts/ApiContext";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const tailLayout = {
  wrapperCol: { offset: 10, span: 2 },
};

const EditModal = (props) => {
  const [isValid, setValidForm] = useState(false);
  const { burgers } = useApi();
  const { mutateAsync } = burgers.usePutBurger();

  const onFinish = async (values) => {
    try {
      const result = { id: props.id, values: values };
      await mutateAsync(result);
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
    <>
      <Modal
        title="Modifier ce burger"
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
            <Input placeholder={props.title} />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input placeholder={props.description} />
          </Form.Item>

          <Form.Item label="Prix" name="price">
            <Input placeholder={props.price} />
          </Form.Item>

          <Form.Item label="Image" name="image">
            <Input placeholder={props.image} />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button htmlType="submit">Modifier</Button>
            {isValid && <LikeOutlined />}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditModal;

import React, { useState } from "react";
import { Modal, Button, Form, Input, notification, message } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import { useApi } from "../contexts/ApiContext";
import {
  layout,
  notificationError,
  returnUiMessage,
  tailLayout,
} from "../utils/utils";

const EditModal = (props) => {
  const { burgers } = useApi();

  const [isValid, setValidForm] = useState(false);

  const { mutate, status, error } = burgers.usePutBurger();

  const onFinish = (values) => {
    try {
      const result = { id: props.id, values: values };
      mutate(result);
      setValidForm(true);
    } catch (e) {
      notificationError(e);
    }
    returnUiMessage(status, error, "Burger modifié 🍔");
  };

  const onFinishFailed = (errorInfo) => {
    message.error(`Il y a eu une erreur ${errorInfo}`);
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
            <Input placeholder={props.title} data-cy="edit-title-burger" />
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
            <Button htmlType="submit" data-cy="submit-edit-burger">
              Modifier
            </Button>
            {isValid && <LikeOutlined />}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditModal;

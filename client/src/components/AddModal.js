import { LikeOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal } from "antd";
import { useState } from "react";
import { useApi } from "../contexts/ApiContext";
import {
  layout,
  notificationError,
  returnUiMessage,
  tailLayout,
} from "../utils/utils";

const AddModal = (props) => {
  const { burgers } = useApi();

  const [isValid, setValidForm] = useState(false);

  const { mutate, status, error } = burgers.usePostBurger();

  const onFinish = (values) => {
    const formData = new FormData();
    var imagedata = document.querySelector('input[type="file"]').files[0];
    formData.append("burgerImage", imagedata);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price);
    try {
      mutate(formData);
      setValidForm(true);
    } catch (e) {
      notificationError(e);
    }
    returnUiMessage(status, error, "Burger ajouté 🍔");
  };

  const onFinishFailed = (errorInfo) => {
    message.error(`Il y a eu une erreur ${errorInfo}`);
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
          <Input data-cy="add-title-burger" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input data-cy="add-desc-burger" />
        </Form.Item>

        <Form.Item label="Prix" name="price">
          <Input data-cy="add-price-burger" />
        </Form.Item>

        <Form.Item label="Image" name="image">
          <Input type="file" name="burgerImage" data-cy="add-img-burger" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button htmlType="submit" data-cy="submit-add-burger">
            Confirmer
          </Button>
          {isValid && <LikeOutlined />}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;

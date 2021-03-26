import { Button, Form, Input, Radio } from "antd";
import { useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../contexts/AuthContext";

import { layout, tailLayout } from "../utils/utils";

const RegisterForm = () => {
  const { register } = useAuth();

  let history = useHistory();

  const redirectToBurgers = () => {
    history.push("/burgers");
  };

  const onFinish = (values) => {
    register(values);
    redirectToBurgers();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      style={{
        width: "50%",
      }}
      {...layout}
      name="ok"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" shape="round">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;

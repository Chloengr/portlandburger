import { Button, Form, Input } from "antd";
import { Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { layout, tailLayout } from "../utils/utils";

const RegisterForm = () => {
  const { register, user } = useAuth();

  const onFinish = (values) => {
    register(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  if (user.id !== null) {
    return <Redirect to={"/burgers"} />;
  }

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
          Inscription
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;

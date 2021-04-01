import { Button, Form, Input } from "antd";
import { Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { layout, tailLayout } from "../utils/utils";

const LoginForm = () => {
  const { login, user } = useAuth();

  const onFinish = (values) => {
    login(values);
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
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input data-cy="username-input" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password data-cy="password-input" />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          shape="round"
          data-cy="submit-login"
        >
          Connexion
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;

import { Button, Form, Input, message } from "antd";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { layout, tailLayout } from "../utils/utils";

const LoginForm = () => {
  const { login } = useAuth();
  let history = useHistory();

  const redirectToBurgers = () => {
    history.push("/burgers");
  };

  const onFinish = (values) => {
    try {
      login(values);
      redirectToBurgers();
    } catch (e) {
      message.error(e);
    }
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
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;

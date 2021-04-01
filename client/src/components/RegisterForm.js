import { Button, Form, Input, message } from "antd";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { layout, tailLayout } from "../utils/utils";

const RegisterForm = () => {
  const { register } = useAuth();

  let history = useHistory();

  const redirectToBurgers = () => {
    history.push("/burgers");
  };
  const onFinish = (values) => {
    try {
      register(values);
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

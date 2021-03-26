import { Button, Form, Input } from "antd";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 12 },
};

const Homepage = () => {
  const { login } = useAuth();
  let history = useHistory();

  const redirectToBurgers = () => {
    history.push("/burgers");
  };

  const onFinish = (values) => {
    login(values);
    redirectToBurgers();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 className="title">Bienvenue cher ami !</h1>
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
      </div>
    </>
  );
};

export default Homepage;

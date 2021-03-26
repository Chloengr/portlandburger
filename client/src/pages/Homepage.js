import { Radio } from "antd";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Homepage = () => {
  const [isRegister, setIsRegister] = useState(true);

  const onChange = (e) => {
    console.log(`radio checked:${e.target.value}`);
    if (e.target.value === "login") {
      return setIsRegister(false);
    } else {
      return setIsRegister(true);
    }
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
        <Radio.Group onChange={onChange}>
          <Radio.Button value="resgiter">Inscription</Radio.Button>
          <Radio.Button value="login">Connexion</Radio.Button>
        </Radio.Group>
        {isRegister && <RegisterForm />}
        {!isRegister && <LoginForm />}
      </div>
    </>
  );
};

export default Homepage;

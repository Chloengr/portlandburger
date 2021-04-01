import { Button } from "antd";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Homepage = () => {
  const [isRegister, setIsRegister] = useState(false);

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

        {!isRegister && 
        <>
          <h2>Connecte-toi</h2>
          <LoginForm />
          <Button
            onClick={() => setIsRegister(true)}
            style={{ marginBottom: "2rem" }}
          >
            Je ne suis pas encore inscris
          </Button>
        </>}
        
        {isRegister && 
        <>
          <h2>Inscrit-toi</h2>
          <RegisterForm />
          <Button
            onClick={() => setIsRegister(false)}
            style={{ marginBottom: "2rem" }}
          >
            J'ai déjà un compte
          </Button>
        </>}
      </div>
    </>
  );
};

export default Homepage;

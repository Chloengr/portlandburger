import { FireOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Congrats = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Confetti />
        <Result
          status="success"
          title="Régalez vous !"
          subTitle="Votre burger est devant la porte"
          extra={[
            <Link to="/burgers">
              <Button shape="round" icon={<FireOutlined />}>
                Retour aux burgers
              </Button>
            </Link>,
          ]}
        />
        ,
      </div>
    </>
  );
};

export default Congrats;

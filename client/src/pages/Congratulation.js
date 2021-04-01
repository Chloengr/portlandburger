import { FireOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { useEffect } from "react";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useApi } from "../contexts/ApiContext";
import { useAuth } from "../contexts/AuthContext";
import { notificationError } from "../utils/utils";

const Congrats = () => {
  const { carts } = useApi();
  const { user } = useAuth();

  const {
    mutate: mutateRemove,
  } = carts.useDeleteCart();

  useEffect(
    () => {
      try {
        mutateRemove(user.id);
      } catch (e) {
        notificationError(e);
      }
    },
    [mutateRemove, user.id]
  );

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
            </Link>
          ]}
        />
      </div>
    </>
  );
};

export default Congrats;

import BurgerCard from "../components/BurgerCard/BurgerCard";
import Header from "../components/Header";
import { Row, Col, Button, Modal, Form, Input, notification } from "antd";
import { useApi } from "../contexts/ApiContext";
import { CURRENT_USER } from "../contexts/AuthContext";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { isAdmin } from "../utils/utils";
import AddModal from "../components/AddModal";
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const tailLayout = {
  wrapperCol: { offset: 10, span: 2 },
};

const Burgers = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { burgers } = useApi();
  const token = localStorage.getItem('jwt');


  const user = localStorage.getItem(CURRENT_USER);
  if (!user) {
    return <Redirect to="/" />;
  }

  const { isLoading, error, data } = burgers.useGetBurgers();

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="title">Venez découvrir nos burgers !</h1>
        <Row justify="center" align="top" style={{ marginBottom: "2rem" }}>
          {isAdmin && (
             <>
             <Button onClick={() => setIsModalVisible(true)} shape="round">
               Ajouter un burger
             </Button>
             <AddModal
               showModal={isModalVisible}
               handleCancel={() => setIsModalVisible(false)}
               handleOk={() => setIsModalVisible(false)}
             />
           </>
          )}
        </Row>

        <Row gutter={[48, 24]}>
          {data.map((burger) => (
            <Col
              span={{ xs: 12, sm: 8, md: 6, lg: 4 }}
              key={burger.id}
              style={{ marginBottom: "2rem" }}
            >
              <BurgerCard
                id={burger.id}
                title={burger.title}
                description={burger.description}
                image={burger.image}
                price={burger.price}
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Burgers;
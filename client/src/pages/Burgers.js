import { Button, Col, Row } from "antd";
import { useState } from "react";
import BurgerCard from "../components/BurgerCard/BurgerCard";
import Header from "../components/Header";
import { useApi } from "../contexts/ApiContext";
import { isAdmin } from "../utils/utils";

import AddModal from "../components/AddModal";

const Burgers = () => {
  const { burgers } = useApi();
<<<<<<< HEAD
  const [isModalVisible, setIsModalVisible] = useState(false);
=======
  const token = localStorage.getItem('jwt');

  const { mutateAsync } = useMutation((params) =>{
    const formData = new FormData();

    var imagedata = document.querySelector('input[type="file"]').files[0];
    formData.append('burgerImage', imagedata)
    formData.append('title',params.title)
    formData.append('description',params.description)
    formData.append('price',params.price)

  console.log(params)
  
    axios.post("http://localhost:7000/burgers", formData, {headers:{'Authorization': 'Bearer ' + token,'content-type': 'multipart/form-data'}})
  });

  const user = localStorage.getItem(CURRENT_USER);
  if (!user) {
    return <Redirect to="/" />;
  }
>>>>>>> 3338c29 (upload image dans l'ajout burger)

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
<<<<<<< HEAD
=======
          <Modal
            title="Ajouter un burger"
            visible={isModalVisible}
            onOk={() => setIsModalVisible(false)}
            onCancel={() => setIsModalVisible(false)}
          >
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              enctype="multipart/form-data"
            >
              <Form.Item
                label="Intitulé"
                name="title"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Description" name="description">
                <Input />
              </Form.Item>

              <Form.Item label="Prix" name="price">
                <Input />
              </Form.Item>

              <Form.Item label="Image" name="image">
                <Input type="file" name="burgerImage" />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button htmlType="submit">Confirmer</Button>
              </Form.Item>
            </Form>
          </Modal>
>>>>>>> 3338c29 (upload image dans l'ajout burger)
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

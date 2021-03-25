import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useState } from "react";
import { useApi } from "../../contexts/ApiContext";
import ConfirmDelete from "../ConfirmDelete";
import "./BurgerCard.scss";

const { Meta } = Card;

const BurgerCard = (props) => {
  const [isModalVisibleDel, setIsModalVisibleDel] = useState(false);

  const { burgers } = useApi();

  const { mutate } = burgers.useRemoveBurger();
  const handleOk = () => {
    mutate(props.id);
    setIsModalVisibleDel(false);
  };

  const handleCancel = () => {
    setIsModalVisibleDel(false);
  };

  const { image, title, description, price } = props;
  return (
    <>
      <Card
        style={{ width: 300 }}
        cover={<img alt="example" src={image} />}
        actions={[
          <ShoppingCartOutlined
            style={{ fontSize: "25px", color: "white" }}
            onClick={() => console.log("Ajouter au paniner")}
          />,
          <DeleteOutlined
            style={{ fontSize: "25px", color: "white" }}
            onClick={() => {
              setIsModalVisibleDel(true);
            }}
          />,
        ]}
      >
        <Meta title={title} description={description} />
        <p className="price">
          <span>{price} € </span>
        </p>
      </Card>
      <ConfirmDelete
        showModal={isModalVisibleDel}
        handleCancel={handleCancel}
        handleOk={handleOk}
        {...props}
      />
    </>
  );
};

export default BurgerCard;

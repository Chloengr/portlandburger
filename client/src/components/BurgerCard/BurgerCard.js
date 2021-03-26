import { DeleteOutlined, EditOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useState } from "react";
import { useApi } from "../../contexts/ApiContext";
import ConfirmDelete from "../ConfirmDelete";

import EditModal from "../EditModal";
import "./BurgerCard.scss";
import { isAdmin } from "../../utils/utils";

const { Meta } = Card;

const BurgerCard = (props) => {
  const { image, title, description, price } = props;
  const [isModalVisibleDel, setIsModalVisibleDel] = useState(false);
  const [isEditModal, setEditModal] = useState(false)

  const { burgers } = useApi();

  const { mutate } = burgers.useRemoveBurger();
  const handleOk = () => {
    mutate(props.id);
    setIsModalVisibleDel(false);
  };

  const handleCancel = () => {
    setIsModalVisibleDel(false);
  };

  const actionsAdmin = [
    <ShoppingCartOutlined
      style={{ fontSize: "25px", color: "white" }}
      onClick={() => console.log("Ajouter au paniner")}
    />,
    <EditOutlined style={{ fontSize: "25px", color: "white" }}
    onClick={() => {
      setEditModal(true);
    }}/>,
    <DeleteOutlined
      style={{ fontSize: "25px", color: "white" }}
      onClick={() => {
        setIsModalVisibleDel(true);
      }}
    />,
  ];

  const actionsUser = [
    <ShoppingCartOutlined
      style={{ fontSize: "25px", color: "white" }}
      onClick={() => console.log("Ajouter au paniner")}
    />,
  ];

  return (
    <>
      <Card
        style={{ width: 300 }}
        cover={<img alt="image burger" src={image} />}
        actions={isAdmin ? actionsAdmin : actionsUser}
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
      <EditModal
        showModal={isEditModal}
        handleCancel={() => setEditModal(false)}
        handleOk={() => setEditModal(false)}
        {...props}
      />
    </>
  );
};

export default BurgerCard;

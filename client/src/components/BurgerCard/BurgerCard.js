import {
  DeleteOutlined,
  EditOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Card, InputNumber, message } from "antd";
import { useState } from "react";
import { useApi } from "../../contexts/ApiContext";
import { useAuth } from "../../contexts/AuthContext";
import ConfirmDelete from "../ConfirmDelete";
import EditModal from "../EditModal";
import "./BurgerCard.scss";

const { Meta } = Card;

const BurgerCard = (props) => {
  const { image, title, description, price, id } = props;
  const [isModalVisibleDel, setIsModalVisibleDel] = useState(false);
  const [isEditModal, setEditModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { burgers } = useApi();
  const { user } = useAuth();

  const { mutate } = burgers.useRemoveBurger();

  const handleOk = () => {
    mutate(id);
    setIsModalVisibleDel(false);
  };

  const handleCancel = () => {
    setIsModalVisibleDel(false);
  };

  const actionsAdmin = [
    <EditOutlined
      style={{ fontSize: "20px", color: "white" }}
      onClick={() => {
        setEditModal(true);
      }}
    />,
    <DeleteOutlined
      style={{ fontSize: "20px", color: "white" }}
      onClick={() => {
        setIsModalVisibleDel(true);
      }}
    />,
  ];

  const actionsUser = [
    <ShoppingCartOutlined
      style={{ fontSize: "20px", color: "white" }}
      onClick={() => addBurgerinCart()}
    />,
  ];

  const chooseQuantity = (qte) => {
    setQuantity(qte);
  };

  const { carts } = useApi();
  const { mutateAsync, isSuccess, isError } = carts.useAddBurgerInCart();
  const { data } = carts.useGetUserPanier(user.id);

  const addBurgerinCart = () => {
    console.log("data", data);
    mutateAsync({
      BurgerId: id,
      PanierId: data?.panierId.id,
      UserId: user.id,
      qte: quantity,
    });
  };

  return (
    <>
      <Card
        style={{ width: 300 }}
        cover={<img alt="burger" src={image} />}
        actions={user.isAdmin ? actionsAdmin : actionsUser}
      >
        <Meta title={title} description={description} />
        <div className="flex">
          <InputNumber
            min={1}
            max={10}
            defaultValue={1}
            onChange={(qte) => chooseQuantity(qte)}
          />
          <p className="price">
            <span>{price} € </span>
          </p>
        </div>
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

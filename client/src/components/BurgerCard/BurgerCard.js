import {
  DeleteOutlined,
  EditOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Card, InputNumber } from "antd";
import { useState } from "react";
import { useApi } from "../../contexts/ApiContext";
import { useAuth } from "../../contexts/AuthContext";
import { notificationError, returnUiMessage } from "../../utils/utils";
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
  const { carts } = useApi();

  const {
    mutate: mutateRemove,
    status: statusRemove,
    error: errorRemove,
  } = burgers.useRemoveBurger();

  const {
    mutate: mutateAdd,
    status: statusAdd,
    error: errorAdd,
  } = carts.useAddBurgerInCart();
  const { data } = carts.useGetUserCart(user.id);

  const addBurgerinCart = () => {
    try {
      mutateAdd({
        BurgerId: id,
        PanierId: data?.panierId.id,
        UserId: user.id,
        qte: quantity,
      });
    } catch (e) {
      notificationError(e);
    }
    returnUiMessage(statusAdd, errorAdd, "Burger.s ajouté au panier 🍔");
  };

  const handleOk = () => {
    try {
      mutateRemove(id);
    } catch (e) {
      notificationError(e);
    }
    returnUiMessage(statusRemove, errorRemove, "Burger supprimé 🍔");
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
      data-cy="delete-burger-btn"
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

  return (
    <>
      <Card
        style={{ width: 300 }}
        cover={<img alt="burger" src={image} />}
        actions={user.isAdmin ? actionsAdmin : actionsUser}
      >
        <Meta title={title} description={description} data-cy="title-burger" />
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

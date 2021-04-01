import { DeleteOutlined, EuroOutlined } from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useApi } from "../contexts/ApiContext";
import { useAuth } from "../contexts/AuthContext";
import { notificationError, returnUiMessage } from "../utils/utils";

const ShoppingCart = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantité",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Prix",
      dataIndex: "price",
      key: "price",
      render: (text) => `${text} €`,
    },
    {
      title: "Action",
      key: "action",
      render: (rowKey) => (
        <Space size="middle">
          <Button
            type="danger"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => deleteBurger(rowKey.burgerId)}
          />
        </Space>
      ),
    },
  ];

  const { carts } = useApi();
  const { user } = useAuth();

  const { isLoading, data, error } = carts.useGetUserCart(user.id);
  const {
    mutate: mutateDelete,
    status: statusDelete,
    error: errorDelete,
  } = carts.useDeleteBurgersInCart();

  const deleteBurger = (burgerId) => {
    try {
      mutateDelete({
        PanierId: data.panierId,
        BurgerId: burgerId,
      });
    } catch (e) {
      notificationError(e);
    }

    returnUiMessage(statusDelete, errorDelete, "Burger supprimé du panier.");
  };

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const formatData = (data) => {
    return data?.map((el) => {
      return {
        burgerId: el.Burger.id,
        name: el.Burger.title,
        quantity: el.qte,
        price: el.Burger.price,
      };
    });
  };

  const {
    mutate: mutateRemove,
  } = carts.useDeleteCart();

  const removeCart = () =>{
    try {
      mutateRemove(user.id);
    } catch (e) {
      notificationError(e);
    }
  }
  
  return (
    <>
      <Header />
      <div className="container">
        <h1 style={{ marginTop: "4rem" }}>Récapitulatif de votre commande</h1>
        <Table
          data-cy="cart-table"
          columns={columns}
          dataSource={formatData(data?.panier)}
          rowKey={(obj) => obj.burgerId}
        />
        <h2>Total {data?.total} €</h2>
        <Link to="/congrats">
          <Button
            type="primary"
            shape="round"
            size="large"
            icon={<EuroOutlined />}
            disabled={!data?.panier.length}
            onClick={() => removeCart()}
          >
            Je veux commander
          </Button>
        </Link>
      </div>
    </>
  );
};
export default ShoppingCart;

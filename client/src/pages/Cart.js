import { DeleteOutlined } from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import Header from "../components/Header";
import { useApi } from "../contexts/ApiContext";
import { useAuth } from "../contexts/AuthContext";

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
      render: (text) => <a>{text} €</a>,
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

  const { isLoading, error, data } = carts.useGetUserPanier(user.id);
  const { mutate } = carts.useDeleteBurgersInCart();

  const deleteBurger = (burgerId) => {
    mutate({
      PanierId: data.panier[0].PanierId,
      BurgerId: burgerId,
    });
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

  return (
    <>
      <Header />
      <div className="container">
        <h1>Récapitulatif de votre commande</h1>
        <Table
          columns={columns}
          dataSource={formatData(data?.panier)}
          rowKey={(obj) => obj.burgerId}
        />
        <h2>Total {data?.total} €</h2>
        <Button shape="round" style={{ marginRight: "2%" }}>
          Annuler
        </Button>
        <Button shape="round" type="primary">
          Payer
        </Button>
      </div>
    </>
  );
};
export default ShoppingCart;

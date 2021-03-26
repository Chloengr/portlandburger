import Header from "../components/Header";
import { Table, Space, Button } from "antd";
import { useApi } from "../contexts/ApiContext";
import { userId } from "../utils/utils";

const ShoppingCart = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
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
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const { carts } = useApi();

  const { isLoading, error, data } = carts.useGetUserPanier(userId);

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const formatData = (data) => {
    return data.map((el) => {
      return {
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
        <Table columns={columns} dataSource={formatData(data.panier)} />
        <h2>Total {data.total ? data.total : "ça marche pô"}</h2>
        <Button>Annuler</Button>
        <Button>Payer</Button>
      </div>
    </>
  );
};
export default ShoppingCart;

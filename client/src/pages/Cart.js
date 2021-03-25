import Header from "../components/Header";
import { Table, Space, Button } from "antd";

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

  const data = [
    {
      key: "1",
      name: "John Brown",
      quantity: 2,
      price: 20,
    },
    {
      key: "2",
      name: "Jim Green",
      quantity: 4,
      price: 14,
    },
    {
      key: "3",
      name: "Joe Black",
      quantity: 2,
      price: 12,
    },
  ];

  return (
    <>
      <Header />
      <div className="container">
        <h1>Récapitulatif de votre commande</h1>
        <Table columns={columns} dataSource={data} />
        <Button>Annuler</Button>
        <Button>Payer</Button>
      </div>
    </>
  );
};
export default ShoppingCart;

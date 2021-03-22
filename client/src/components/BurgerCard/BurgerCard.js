import { Card, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./BurgerCard.scss";

const { Meta } = Card;
const { Text } = Typography;

const BurgerCard = (props) => {
  return (
    <Card
      style={{ width: 300 }}
      cover={<img alt="example" src={props.image} />}
      actions={[
        <ShoppingCartOutlined style={{ fontSize: "25px", color: "white" }} />,
      ]}
    >
      <Meta title={props.title} description={props.description} />
      <p className="price">
        <span>{props.price} € </span>
      </p>
    </Card>
  );
};

export default BurgerCard;

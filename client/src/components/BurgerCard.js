import { Card } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Meta } = Card;

const BurgerCard = (props) => {
  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src={props.visual}
        />
      }
      actions={[<ShoppingCartOutlined />]}
    >
      <Meta title={props.label} description={props.description} />
    </Card>
  );
};

export default BurgerCard;

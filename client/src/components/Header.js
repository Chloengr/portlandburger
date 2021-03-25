import { ShoppingCartOutlined } from "@ant-design/icons";
import { PageHeader, Button } from "antd";
import { Link } from "react-router-dom";
import { isAdmin } from "../utils/utils";

const Header = () => {
  return (
    <div
      style={{
        backgroundColor: "#F5F5F5",
        padding: 4,
      }}
    >
      <PageHeader
        ghost={false}
        title="Portland Burger"
        subTitle="Les burgers nantais"
        avatar={{
          src:
            "https://image.freepik.com/vecteurs-libre/icone-burger-collection-restauration-rapide-icone-nourriture-isolee_194824-6.jpg",
        }}
        extra={
          !isAdmin && [
            <>
              <Link to="/cart">
                <Button
                  type="primary"
                  shape="round"
                  icon={<ShoppingCartOutlined />}
                >
                  Panier
                </Button>
              </Link>
            </>,
          ]
        }
      ></PageHeader>
    </div>
  );
};

export default Header;

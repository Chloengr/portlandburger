import { ShoppingCartOutlined } from "@ant-design/icons";
import { PageHeader, Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import { isAdmin, userId } from "../utils/utils";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { logout } = useAuth();
  let history = useHistory();

  const redirectHome = () => {
    history.push("/");
  };
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
        extra={[
          <>
            {!isAdmin && (
              <Link to="/cart">
                <Button
                  type="primary"
                  shape="round"
                  icon={<ShoppingCartOutlined />}
                >
                  Panier
                </Button>
              </Link>
            )}
          </>,
          <>
            {userId && (
              <Button
                type="primary"
                shape="round"
                icon={<ShoppingCartOutlined />}
                onClick={() => {
                  logout();
                  redirectHome();
                }}
              >
                Se deconnecter
              </Button>
            )}
          </>,
        ]}
      ></PageHeader>
    </div>
  );
};

export default Header;

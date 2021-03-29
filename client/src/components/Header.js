import {
  FireOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, PageHeader } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { logout, user } = useAuth();
  let history = useHistory();
  let location = useLocation();

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
            {location.pathname !== "/burgers" && (
              <Link to="/burgers">
                <Button shape="round" icon={<FireOutlined />}>
                  Burgers
                </Button>
              </Link>
            )}
          </>,
          <>
            {!user.isAdmin && location.pathname !== "/cart" && (
              <Link to="/cart">
                <Button shape="round" icon={<ShoppingCartOutlined />}>
                  Panier
                </Button>
              </Link>
            )}
          </>,
          <>
            {user.isLoggedIn && location.pathname !== "/cart" && (
              <Button
                type="primary"
                shape="round"
                icon={<LogoutOutlined />}
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

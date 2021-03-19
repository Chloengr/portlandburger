import { PageHeader, Button } from "antd";
import { Link } from "react-router-dom";

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
        avatar={{src: 'https://image.freepik.com/vecteurs-libre/icone-burger-collection-restauration-rapide-icone-nourriture-isolee_194824-6.jpg'}}
        extra={[
          <>
            <Link to="/cart">
              <Button key="1" type="primary">
                Panier
              </Button>
            </Link>
          </>,
        ]}
      ></PageHeader>
    </div>
  );
};

export default Header;

import { PageHeader, Button } from "antd";
import { Link } from "react-router-dom";

import { ReactComponent as BurgerIcon } from "../assets/burger.svg";

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
        extra={[
          <>
            {/* <BurgerIcon/> */}
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

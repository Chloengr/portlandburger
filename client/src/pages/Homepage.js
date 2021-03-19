import BurgerCard from "../components/BurgerCard";
import Header from "../components/Header";
import { Row, Col } from "antd";

const burgers = [
  {
      id: 1,
    label: "ldkjfh",
    description: "soidhfv",
    photo:
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  },
  {
      id: 2,
    label: "ldkjfh",
    description: "soidhfv",
    photo:
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  },
];

const Homepage = () => {
  return (
    <>
      <Header />
      <Row justify="space-around" align="middle">
        {burgers.map((burger) => (
          <Col span={4} key={burger.id}>
            <BurgerCard
              label={burger.label}
              description={burger.description}
              visual={burger.photo}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Homepage;

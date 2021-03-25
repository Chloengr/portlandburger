import BurgerCard from "../components/BurgerCard/BurgerCard";
import Header from "../components/Header";
import { Row, Col } from "antd";
import { useApi } from "../contexts/ApiContext";

const Homepage = () => {
  const { burgers } = useApi();

  const { isLoading, error, data } = burgers.useGetBurgers();

  console.log("data", data);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="title">Venez découvrir nos burgers !</h1>

        <Row gutter={[48, 24]}>
          {data.map((burger) => (
            <Col
              span={{ xs: 12, sm: 8, md: 6, lg: 4 }}
              key={burger.id}
              style={{ marginBottom: "2rem" }}
            >
              <BurgerCard
                title={burger.title}
                description={burger.description}
                image={burger.image}
                price={burger.price}
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Homepage;

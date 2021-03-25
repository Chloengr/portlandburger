import { BrowserRouter, Route, Switch } from "react-router-dom";
import ShoppingCart from "../pages/Cart";
import Burgers from "../pages/Burgers";
import Homepage from "../pages/Homepage";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={Homepage} />
        <Route exact path={"/burgers"} component={Burgers} />
        <Route path={"/cart"} component={ShoppingCart} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

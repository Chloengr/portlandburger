import { BrowserRouter, Route, Switch } from "react-router-dom";
import ShoppingCart from "../pages/Cart";
import Burgers from "../pages/Burgers";
import Homepage from "../pages/Homepage";
import PrivateRoute from "./privateRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={Homepage} />
        <PrivateRoute exact path={"/burgers"} component={Burgers} />
        <PrivateRoute path={"/cart"} component={ShoppingCart} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

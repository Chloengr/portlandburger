import { BrowserRouter, Route, Switch } from "react-router-dom";
import ShoppingCart from "../pages/Cart";
import Homepage from "../pages/Homepage";

const Router = () => {
    return (
      <BrowserRouter>
        <Switch>
          {/* <Route path={"/login"} component={Login} /> */}
  
          <Route exact path={"/"} component={Homepage} />
          <Route  path={"/cart"} component={ShoppingCart} />
        </Switch>
      </BrowserRouter>
    );
  };
  
  export default Router;
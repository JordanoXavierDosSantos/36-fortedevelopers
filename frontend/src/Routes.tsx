import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import { TestComponent } from "./pages/TestComponent";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={TestComponent} />{" "}
    </Switch>
  );
}

export default Routes;

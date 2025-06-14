import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

function Router() {
  return (
    <BrowserRouter>
      <div
        className={"vh-100-good"}
        style={{
          width: "100vw",
          overflowX: "hidden",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default Router;

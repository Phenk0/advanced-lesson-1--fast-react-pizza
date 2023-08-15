import Header from "./Header.jsx";
import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../feature/cart/CartOverview.jsx";
import Loader from "./Loader.jsx";

function AppLayout() {
  const { state } = useNavigation();
  const isLoading = state === "loading";
  return (
    <div className="layout">
      <Header />
      {isLoading && <Loader />}
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;

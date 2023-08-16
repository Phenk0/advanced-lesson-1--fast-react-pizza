import Header from "./Header.jsx";
import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../feature/cart/CartOverview.jsx";
import Loader from "./Loader.jsx";

function AppLayout() {
  const { state } = useNavigation();
  const isLoading = state === "loading";
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-y-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home.jsx";
import Menu from "./feature/menu/Menu.jsx";
import Cart from "./feature/cart/Cart.jsx";
import Order from "./feature/order/Order.jsx";
import CreateOrder from "./feature/order/CreateOrder.jsx";
import Error from "./ui/Error.jsx";

function App() {
  const router = createBrowserRouter([
    { path: "/", Component: Home, errorElement: <Error /> },
    { path: "/menu", Component: Menu },
    { path: "/cart", Component: Cart },
    { path: "/order/new", Component: CreateOrder },
    { path: "/order/:orderId", Component: Order },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

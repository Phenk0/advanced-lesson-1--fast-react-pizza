import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home.jsx";
import Menu, { loader as menuLoader } from "./feature/menu/Menu.jsx";
import Cart from "./feature/cart/Cart.jsx";
import Order, { loader as orderLoader } from "./feature/order/Order.jsx";
import CreateOrder, { action } from "./feature/order/CreateOrder.jsx";
import Error from "./ui/Error.jsx";
import AppLayout from "./ui/AppLayout.jsx";

function App() {
  const router = createBrowserRouter([
    {
      Component: AppLayout,
      errorElement: <Error />,
      children: [
        { path: "/", Component: Home },
        {
          path: "/menu",
          Component: Menu,
          loader: menuLoader,
          errorElement: <Error />,
        },
        { path: "/cart", Component: Cart },
        { path: "/order/new", Component: CreateOrder, action },
        {
          path: "/order/:orderId",
          Component: Order,
          loader: orderLoader,
          errorElement: <Error />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

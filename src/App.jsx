import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './ui/Home.jsx';
import Menu, { loader as menuLoader } from './feature/menu/Menu.jsx';
import Cart from './feature/cart/Cart.jsx';
import Order, { loader as orderLoader } from './feature/order/Order.jsx';
import CreateOrder, {
  action as createOrderAction
} from './feature/order/CreateOrder.jsx';
import Error from './ui/Error.jsx';
import AppLayout from './ui/AppLayout.jsx';
import { action as updateOrderAction } from './feature/order/UpdateOrder.jsx';

function App() {
  const router = createBrowserRouter([
    {
      Component: AppLayout,
      errorElement: <Error />,
      children: [
        { path: '/', Component: Home },
        {
          path: '/menu',
          Component: Menu,
          loader: menuLoader,
          errorElement: <Error />
        },
        { path: '/cart', Component: Cart },
        {
          path: '/order/new',
          Component: CreateOrder,
          action: createOrderAction
        },
        {
          path: '/order/:orderId',
          Component: Order,
          loader: orderLoader,
          action: updateOrderAction,
          errorElement: <Error />
        }
      ]
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;

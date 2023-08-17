import Button from '../../ui/Button.jsx';
import LinkButton from '../../ui/LinkButton.jsx';
import CartItem from './CartItem.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from '../../store/cartSlice.js';
import { getUser } from '../../store/userSlice.js';
import EmptyCart from './EmptyCart.jsx';

function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector(getUser);
  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart());
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="mt-3 border-b divide-y divide-stone-200">
        {cart.map((pizza) => (
          <CartItem item={pizza} key={pizza.pizzaId} />
        ))}
      </ul>
      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={handleClearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;

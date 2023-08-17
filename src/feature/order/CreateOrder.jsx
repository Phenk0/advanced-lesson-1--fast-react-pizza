// https://uibakery.io/regex-library/phone-number
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant.js';
import Button from '../../ui/Button.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart,
  getCart,
  getTotalCartPrice
} from '../../store/cartSlice.js';
import EmptyCart from '../cart/EmptyCart.jsx';
import store from '../../store/store.js';
import { formatCurrency } from '../../utils/helpers.js';
import { useState } from 'react';
import { fetchAddress } from '../../store/userSlice.js';

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    username,
    address,
    position,
    status: addressStatus,
    error: errorAddress
  } = useSelector((state) => state.user);
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const totalOrderPrice = withPriority ? totalCartPrice * 1.2 : totalCartPrice;

  const isLoading = addressStatus === 'loading';
  const isSubmitting = navigation.state === 'submitting';
  const formErrors = useActionData();
  function handleGetPosition(e) {
    e.preventDefault();
    dispatch(fetchAddress());
  }
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="grow input"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="w-full input" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-xl bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="flex-grow">
            <input
              className="w-full input"
              type="text"
              name="address"
              defaultValue={address}
              disabled={isLoading}
              required
            />
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-xl bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitude && (
            <span className="absolute right-1 z-50 top-[35px] sm:top-[3px] md:top-[5px]">
              <Button
                type="small"
                onClick={handleGetPosition}
                isDisabled={isLoading}
              >
                {isLoading ? 'Getting it...' : 'Get position'}
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ''
            }
          />
          <Button isDisabled={isSubmitting || isLoading} type="primary">
            {isSubmitting
              ? 'Placing order ...'
              : `Order now ${formatCurrency(totalOrderPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on'
  };
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  //If everything is Ok, create new order and redirect
  const newOrder = await createOrder(order);

  //do NOT overUse it (performance issues)
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;

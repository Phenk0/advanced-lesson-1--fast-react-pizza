import { useDispatch, useSelector } from 'react-redux';

import { formatCurrency } from '../../utils/helpers.js';
import Button from '../../ui/Button.jsx';
import { addItem, getCurrentQuantityById } from '../../store/cartSlice.js';
import DeleteItem from '../cart/DeleteItem.jsx';
import UpdateItemQuantity from '../cart/UpdateItemQuantity.jsx';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  const handleAddToCart = () => {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1
    };
    dispatch(addItem(newItem));
  };
  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {!soldOut &&
            (!currentQuantity ? (
              <Button type="small" onClick={handleAddToCart}>
                Add to cart
              </Button>
            ) : (
              <div className="flex items-center gap-3 sm:gap-8">
                <UpdateItemQuantity id={id} />
                <DeleteItem id={id} />
              </div>
            ))}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;

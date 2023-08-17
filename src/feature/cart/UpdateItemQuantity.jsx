import Button from '../../ui/Button.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseItemQuantity,
  getCurrentQuantityById,
  increaseItemQuantity
} from '../../store/cartSlice.js';

function UpdateItemQuantity({ id }) {
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button type="round" onClick={() => dispatch(decreaseItemQuantity(id))}>
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button type="round" onClick={() => dispatch(increaseItemQuantity(id))}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;

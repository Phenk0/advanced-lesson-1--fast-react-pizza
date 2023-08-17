import Button from '../../ui/Button.jsx';
import { useDispatch } from 'react-redux';
import { deleteItem } from '../../store/cartSlice.js';

function DeleteItem({ id }) {
  const dispatch = useDispatch();

  function handleDeleteCartItem() {
    dispatch(deleteItem(id));
  }
  return (
    <Button type="small" onClick={handleDeleteCartItem}>
      Delete
    </Button>
  );
}

export default DeleteItem;

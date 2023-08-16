import { useState } from "react";
import Button from "../../ui/Button.jsx";
import { useDispatch } from "react-redux";
import { updateName } from "../../store/userSlice.js";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    if (username.length >= 3) {
      dispatch(updateName(username));
      navigate("/menu");
    } else alert("User's name must be at least 3 chars!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-6 w-72 input"
      />

      {username !== "" && (
        <div>
          <Button type="small">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;

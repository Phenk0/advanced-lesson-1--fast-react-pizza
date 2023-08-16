import { useSelector } from "react-redux";

function Username() {
  const username = useSelector(({ user }) => user.username);

  return (
    <div
      className={`hidden text-sm font-semibold md:block cursor-default ${
        !username ? "text-stone-400" : ""
      }`}
    >
      {username || "guest"}
    </div>
  );
}

export default Username;

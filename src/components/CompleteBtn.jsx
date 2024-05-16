import axios from "axios";
import useAuthContext from "../hook/useAuthContext";

const CompleteBtn = ({ setToDos, toDos, id, disable }) => {
  const { user } = useAuthContext()
  const handleCompleteTodo = async () => {
    try {    
      const res = await axios.put(`https://todo-list-009u.onrender.com/note/complete/${id}`,{}, {
        headers: {
          Authorization: user.token
        },
      });
      const updatedData = toDos.map((item) =>
        item.id === id ? { ...item, ...res.data } : item
      );
      setToDos(updatedData);
    } catch (error) {
      console.error("failed to update success: ", error);
    }
  };

  return (
    <button
      className="btn btn-success btn-sm mx-3"
      onClick={() => handleCompleteTodo()}
      disabled={disable}
    >
      Complete
    </button>
  );
};

export default CompleteBtn;

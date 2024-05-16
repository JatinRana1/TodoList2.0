import { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../components/Navigation";
import ToDoForm from "../components/ToDoForm";
import CompleteBtn from "../components/CompleteBtn";
import UpdateBtn from "../components/UpdateBtn";
import UpdateForm from "../components/UpdateForm";
import useAuthContext from "../hook/useAuthContext";

export const Homepage = () => {
  const [toDos, setToDos] = useState([]);
  const [updateForm, setUpdateForm] = useState(false);
  const [updateData, setUpdateDate] = useState({});
  const [disable, setDisabled] = useState(false);
  const { user } = useAuthContext();
  const updateFromToggler = (value) => {
    setUpdateForm(value);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const id = user.userID;
      const res = await axios.get(
        `https://todo-list-009u.onrender.com/note/${id}`,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
        setToDos(res.data)
    } catch (error) {
      console.error('Failed to fetch data: ', error)
    }
  };

  const handleDeleteTodo = (id) => {
    axios
      .delete(`https://todo-list-009u.onrender.com/note/${id}`, {
        headers: {
          Authorization: user.token,
        },
      })
      .then(() => {
        setToDos(toDos.filter((todo) => todo.id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="homepage">
      <Navigation />
      {updateForm ? (
        <UpdateForm
          updateForm={updateForm}
          setToDos={setToDos}
          toDos={toDos}
          updateData={updateData}
          updateFromToggler={updateFromToggler}
          setDisabled={setDisabled}
        />
      ) : (
        <ToDoForm setToDos={setToDos} toDos={toDos} />
      )}

      <ul className="list-group mt-4">
        {toDos?.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {todo.completed ? (
              <del>{todo.title}</del>
            ) : (
              <p className="m-0">{todo.title}</p>
            )}
            <div>
              <UpdateBtn
                updateFromToggler={updateFromToggler}
                setUpdateDate={setUpdateDate}
                toDos={toDos}
                id={todo.id}
                disable={disable}
                setDisabled={setDisabled}
              />
              <CompleteBtn
                setToDos={setToDos}
                toDos={toDos}
                id={todo.id}
                disable={disable}
              />
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteTodo(todo.id)}
                disabled={disable}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

import axios from "axios";
import { useFormik } from "formik";
import todoSchema from "../schema/todoSchema";
import useAuthContext from "../hook/useAuthContext";

const ToDoForm = ({ setToDos, toDos }) => {
  const { user } = useAuthContext()
  const handleCreateTodo = async (values) => {
    try {
      const userValues = {...values, userId: user.userID}
      const res = await axios.post("https://todo-list-009u.onrender.com/note/", userValues ,{
        headers: {
          Authorization: user.token
        }
      });
      setToDos([...toDos, res.data]);
      resetForm();
    } catch (error) {
      console.error('Failed to post todo: ',error)
    }
  };

  const initialValues = {
    title: "",
    completed: false,
  };

  const { handleSubmit , errors, values, handleBlur, handleChange, resetForm, touched } =
    useFormik({
      initialValues,
      validationSchema: todoSchema,
      onSubmit: handleCreateTodo,
    });

  return (
    <div className="container">
      <h1 className="mt-4 mb-3">Todo List</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="title"
            placeholder="Enter todo title"
            onChange={handleChange}
            value={values.title}
            onBlur={handleBlur}
          />
          {touched.title && errors.title ? <p className="text-danger mb-0">{errors.title}</p> : null}
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="completed"
            id="completed"
            onChange={handleChange}
            value={values.completed}
            onBlur={handleBlur}
          />
          <label className="form-check-label" htmlFor="completed">
            Completed
          </label>
        </div>
        <button className="btn btn-primary " type="submit">
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default ToDoForm;

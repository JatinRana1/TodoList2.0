import axios from "axios";
import { useFormik } from "formik";
import todoSchema from "../schema/todoSchema";
import useAuthContext from "../hook/useAuthContext";

const UpdateForm = ({ setToDos, toDos, updateData, updateFromToggler, setDisabled}) => {
  const { user } = useAuthContext()
  const handleUpdateTodo = async (values) => {
    try {
      const id = updateData[0].id;
      const res = await axios.put(`https://todo-list-009u.onrender.com/note/${id}`, values, {
        headers: {
          Authorization: user.token
        }
      });
      const updatedData = toDos.map((item) =>
        item.id === id ? { ...item, ...res.data } : item
      );
      setToDos(updatedData);
      resetForm();
      updateFromToggler(false)
      setDisabled(false)
    } catch (error) {
      console.log("Failed to update todo: ", error);
    }
  };
  const initialValues = {
    title: updateData[0].title,
    completed: updateData[0].completed,
  };

  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    touched,
    errors,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: todoSchema,
    onSubmit: handleUpdateTodo,
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
          {touched.title && errors.title ? (
            <p className="text-danger mb-0">{errors.title}</p>
          ) : null}
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="completed"
            id="completedUpdate"
            onChange={handleChange}
            checked={values.completed}
            onBlur={handleBlur}
          />
          <label className="form-check-label" htmlFor="completedUpdate">
            Completed
          </label>
        </div>
        <button className="btn btn-primary" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;

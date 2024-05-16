import { useFormik } from "formik";
import React, { useState } from "react";
import loginValidation from "../schema/logInSchema";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuthContext from "../hook/useAuthContext";

const Login = () => {

  //states
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  //Login api call
  const handleLogin = async () => {
    try {
      const res = await axios.post("https://todolist2-0-qei0.onrender.com//user/login", values);
      localStorage.setItem('user', JSON.stringify(res.data))
      resetForm();
      dispatch({payload: res.data, type: 'LOGIN'})
    } catch (error) {
      if (error.response && error.response.status)
        setError(error.response.data.error);
      console.error("Failed to login up: ", error);
    }
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: loginValidation,
    onSubmit: handleLogin,
  });
  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Login
                    </p>

                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div
                          data-mdb-input-init
                          className="form-outline flex-fill mb-0"
                        >
                          <label className="form-label" htmlFor="email">
                            Your Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="form-control"
                            name="email"
                            value={values.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {touched.email && errors.email ? (
                            <p className="mb-0 text-danger">{errors.email}</p>
                          ) : null}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div
                          data-mdb-input-init
                          className="form-outline flex-fill mb-0"
                        >
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            className="form-control"
                            name="password"
                            value={values.password}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {touched.password && errors.password ? (
                            <p className="mb-0 text-danger">
                              {errors.password}
                            </p>
                          ) : null}
                          {error && <p className="mt-1 text-danger">{error}</p>}
                        </div>
                      </div>
                      <div className="d-flex justify-content-between mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-primary btn-lg"
                        >
                          Login
                        </button>
                        <div>
                            <span className="px-2">Don't have an account?</span>
                            <Link to='/signUp'>Sign Up</Link>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

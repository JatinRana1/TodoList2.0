import { useFormik } from "formik";
import React, { useState } from "react";
import signUpValidation from "../schema/signUpSchema";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [error, setError] = useState(null)
  const navigate = useNavigate()  

  const handleSignUp = async () => {
    try {
      const { repeatPassword, ...formValues } = values;
      const res = await axios.post("https://todolist2-0-qei0.onrender.com//user/signup", formValues);
      if(res.status === 200){
        setError('')
        resetForm();
        navigate('/logIn')
      }
    } catch (error) {

      if(error.response && error.response.status === 400)
      setError(error.response.data.error)

      console.error("Failed to sign up: ", error);
    }
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: ""
  };
  const { values, handleChange, handleBlur, handleSubmit, errors, touched, resetForm} = useFormik({
    initialValues,
    validationSchema: signUpValidation,
    onSubmit: handleSignUp,
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
                      Sign up
                    </p>

                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div
                          data-mdb-input-init
                          className="form-outline flex-fill mb-0"
                        >
                          <label className="form-label" htmlFor="firstName">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            className="form-control"
                            name="firstName"
                            value={values.firstName}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {touched.firstName && errors.firstName ? <p className="mb-0 text-danger">{errors.firstName}</p>: null}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div
                          data-mdb-input-init
                          className="form-outline flex-fill mb-0"
                        >
                          <label className="form-label" htmlFor="lastName">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            className="form-control"
                            name="lastName"
                            value={values.lastName}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {touched.lastName && errors.lastName ? <p className="mb-0 text-danger">{errors.lastName}</p>: null}
                        </div>
                      </div>

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
                          {touched.email && errors.email ? <p className="mb-0 text-danger">{errors.email}</p>: null}
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
                          {touched.password && errors.password ? <p className="mb-0 text-danger">{errors.password}</p>: null}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div
                          data-mdb-input-init
                          className="form-outline flex-fill mb-0"
                        >
                          <label
                            className="form-label"
                            htmlFor="repeatPassword"
                          >
                            Repeat your password
                          </label>
                          <input
                            type="password"
                            id="repeatPassword"
                            className="form-control"
                            name="repeatPassword"
                            value={values.repeatPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.repeatPassword && errors.repeatPassword ? <p className="mb-0 text-danger">{errors.repeatPassword}</p>: null}
                        {error && <p className="mb-0 text-danger">{error}</p>}
                        </div>
                      </div>
                      <div className="d-flex justify-content-between mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-primary btn-lg"
                        >
                          Register
                        </button>
                        <div>
                          <span className="px-2">Already have an account?</span>
                          <Link to='/login'>Login</Link>
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

export default SignUp;

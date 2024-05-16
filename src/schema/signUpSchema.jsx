import * as Yup from "yup";

const signUpValidation = Yup.object({
  firstName: Yup.string()
    .min(2, "First name must contain min 2 letters")
    .max(50, "First name must contain max 50 letters")
    .matches(/^[a-zA-Z]+$/, "First name must contain only letters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "First name must contain min 2 letters")
    .max(50, "First name must contain max 50 letters")
    .matches(/^[a-zA-Z]+$/, "First name must contain only letters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Enter valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one digit")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password")
});

export default signUpValidation;

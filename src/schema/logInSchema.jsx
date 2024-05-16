import * as Yup from 'yup';

const loginValidation = Yup.object({
    email: Yup.string().email('Valid email id required').required('Email address required'),
    password: Yup.string().required('Password required')
})

export default loginValidation;
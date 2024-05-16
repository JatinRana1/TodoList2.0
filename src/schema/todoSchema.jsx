import * as Yup from 'yup'

const todoSchema = Yup.object({
    title: Yup.string().min(2).max(40).required('Field is Required'),
    completed: Yup.boolean()
})

export default todoSchema
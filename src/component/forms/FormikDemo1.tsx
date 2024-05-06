import { Field, Form, Formik, useFormik } from "formik"
import * as yup from 'yup';

const FormikDemo1 = () => {

    const validationSchema = yup.object({
        fullName: yup
            .string()
            .required("Full name is required"),
        email: yup
            .string()
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
        description: yup
            .string()
            .required("Please fill in description")
        // dob: yup.date().required("Please select your date of birth")
    });

    let initialValues = {
        fullName:"",
        email:"",
        password:"",
        description:""
    }

    let onSubmit = (value:any, other:any) =>{
        console.log(value)
    }

  return (
    <>
        <Formik
        initialValues= {initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
            {
                (formik) =>{
                    return (
                        <Form>
                            <Field>
                                {
                                    ({field, meta, form})=>{
                                        return(
                                            <div>

                                            </div>
                                        )
                                    }
                                }
                            </Field>
                        </Form>
                    )
                }
            }
        </Formik>
    </>
  )
}

export default FormikDemo1
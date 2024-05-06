import { TextField } from "@mui/material";
import { Field, useFormik } from "formik"
import * as yup from 'yup';

const Form1 = () => {

    const validationSchema = yup.object({
        fullName: yup
            .string()
            .min(3)
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
    });

    const formik = useFormik({
        initialValues:{
            fullName:"",
            email:"",
            password:"",
            description:""
        },
        validationSchema: validationSchema,

        onSubmit: (values:any) =>{
            alert("Form Submitted!!")
            console.log("Value", values)
        },
        
    });

  return (
    <div>
        <form onSubmit={formik.handleSubmit}>
            <TextField
                id='fullName'
                name='fullName'
                label='fullName'
                variant="outlined"
                // value={formik.values.fullName}
                onChange={(e:any) => {
                    formik.setFieldValue("firstName", e.target.value)
                }}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            />

            <TextField
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    // value={formik.values.password}
                    onChange={formik.handlePassword}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
            />
        </form>
    </div>
  )
}

export default Form1
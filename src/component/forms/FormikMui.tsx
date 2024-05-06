import { Box, Button, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from 'formik';
import * as yup from 'yup';
// import { Padding } from '@mui/icons-material'

const validationSchema = yup.object({
    firstName: yup
    .string(). required("Full name is required"),
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    dob: yup.date().required("Please select your date of birth")
});

const FormikMui = () => {

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            password: "",
            dob: "date"
        },

        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert("Form Submitted!!")
            console.log("Value", values)
        },
    });

    const handlefullName = () => {}
    const handleEmail = () => {}
    const handlePassword = () => {}

    return (
            <form onSubmit={formik.handleSubmit}>
                <TextField
                id='fullName'
                name='fullName'
                label='fullName'
                value={formik.values.fullName}
                onChange={formik.handlefullName}
                />

                <TextField
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleEmail}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                
                <TextField
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handlePassword}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />

                {/* <Box style={{padding:"20px"}}>
                    <Typography variant='h5'> DOB</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Select Date"/>
                    </LocalizationProvider>
                </Box> */}

                <Button color="primary" variant="contained" type="submit">
                    Submit
                </Button>
            </form>
    );
};

export default FormikMui

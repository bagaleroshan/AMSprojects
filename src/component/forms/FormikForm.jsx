import { Form, Formik } from "formik"
import React from 'react'
import * as yup from "yup"
import FormikCheckbox from './FormikCheckbox'
import FormikInput from './FormikInput'
import FormikRadio from "./FormikRadio"
import FormikSelect from './FormikSelect'
import FormikTextarea from './FormikTextarea'

const FormikForm = () => {

    let initialValues = {
        firstName: "",
        lastName: "",
        description: "",
        country: "",
        gender: "male",
        isMarried: false
    }

    let submitValue = (value, other) => {
        console.log("Value", value)
    }

    let validationSchema = yup.object({
        firstName: yup.string().required("First Name is required"),
        lastName: yup.string().required("Last Name is required"),
        description: yup.string().required("Description is required")
    })

    let genders = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Others", value: "others" },
    ]

    let countries = [
        { label: "Select Country", _id: " ", disabled: true },
        { label: "Nepal", _id: "1" },
        { label: "India", _id: "2" },
        { label: "England", _id: "3" },
        { label: "Australia", _id: "4" },
        { label: "USA", _id: "5" },
    ]

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={submitValue}
                validationSchema={validationSchema}>
                {
                    (formik) => {
                        return (<Form>
                            {/* <Field name="firstName">
                                {
                                    ({ field, form, meta }) => {
                                        // console.log("Field: ", field) it is also an object with value, name, onChange and onBlur events= check the console
                                        // console.log("Meta: ", meta) and so does meta
                                        return (
                                            <div>
                                                <label htmlFor='firstName'>First Name</label>
                                                <input {...field} id='firstName' type='text'
                                                    value={meta.value}
                                                    onChange={field.onChange}
                                                // onChange={(e) => {
                                                //     formik.setFieldValue("firstName", e.target.value)
                                                // }}
                                                ></input>
                                                {meta.touched && meta.error ? (<div style={{ color: "red" }}>{meta.error}</div>) : null}
                                            </div>
                                        )
                                    }
                                }
                            </Field> */}

                            {/* <Field name="lastName">
                                {
                                    ({ field, form, meta }) => {
                                        return (
                                            <div>
                                                <label htmlFor='lastName'>Last Name</label>
                                                <input {...field} id='lastName' type='text'
                                                    value={meta.value}
                                                    onChange={field.onChange}
                                                // onChange={(e) => {
                                                //     formik.setFieldValue("lastName", e.target.value)
                                                // }}
                                                ></input>
                                                {meta.touched && meta.error ? <div style={{ color: "red" }}>{meta.error}</div> : null}
                                            </div>
                                        )
                                    }
                                }
                            </Field> */}

                            {/* <Field name="description">
                                {
                                    ({ field, form, meta }) => {
                                        return (
                                            <div>
                                                <label htmlFor='description'>Description</label>
                                                <input {...field} id='description' type='text'
                                                    value={meta.value}
                                                    onChange={field.onChange}
                                                // onChange={(e) => {
                                                //     formik.setFieldValue("description", e.target.value)
                                                // }}
                                                >
                                                </input>
                                                {meta.touched && meta.error ? <div style={{ color: "red" }}>{meta.error}</div> : null}
                                            </div>
                                        )
                                    }
                                }
                            </Field> */}

                            <FormikInput name="firstName" label="First Name" type="text"
                                style={{ color: "red" }}
                                required={true}
                                onChange={e => { formik.setFieldValue("firstName", e.target.value) }}
                            ></FormikInput>

                            <FormikTextarea name="description"
                                label="Description" type="text"
                                style={{ color: "blue" }}
                                required={true}
                                onChange={e => { formik.setFieldValue("description", e.target.value) }}
                            ></FormikTextarea>

                            <FormikSelect name="country"
                                label="Country"
                                required={true}
                                onChange={e => { formik.setFieldValue("country", e.target.value) }}
                                countries={countries}
                            ></FormikSelect>

                            {/* radio */}
                            <FormikRadio
                                name="gender"
                                label="Gender : "
                                style={{ color: "blue" }}
                                required={true}
                                onChange={e => { formik.setFieldValue("gender", e.target.value) }}
                                genders={genders}
                            ></FormikRadio>

                            {/* checkbox */}
                            <FormikCheckbox
                                name="isMarried"
                                label="Is Married"
                                style={{ color: "blue" }}
                                required={true}
                                onChange={e => { formik.setFieldValue("isMarried", e.target.checked) }}
                            ></FormikCheckbox>

                            <button type='submit'>Submit</button>
                        </Form>)
                    }
                }
            </Formik>
        </div >
    )
}

export default FormikForm
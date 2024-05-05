import { Field } from "formik"

const FormTextArea = ({ name, label, type, onChange, required, ...props }) => {
  return (
    <>
    <Field name={name}>
                {
                    ({ field, form, meta }) => {
                        return (
                            <div>
                                <label htmlFor={name}>{label}{required ? <span>*</span> : null}</label>
                                <textarea {...field}
                                    id={name}
                                    type='text'
                                    value={meta.value}
                                    onChange={onChange ? onChange : field.onChange}
                                    {...props}
                                ></textarea>
                                {meta.touched && meta.error ? (<div style={{ color: "red" }}>{meta.error}</div>) : null}
                            </div>
                        )
                    }
                }
            </Field>
    </>
  )
}

export default FormTextArea
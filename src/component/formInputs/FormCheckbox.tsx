import { Field } from "formik"

const FormCheckbox = ({ name, label, onChange, required, ...props }) => {
  return (
    <>
        <Field name={name}>
                {
                    ({ field, form, meta }) => {
                        return (
                            <div>
                                <label htmlFor={name}>
                                    {label}{required ? <span>*</span> : null}
                                </label>
                                <input
                                    {...field}
                                    {...props}
                                    id={name}
                                    type="checkbox"
                                    checked={meta.value}
                                    onChange={onChange ? onChange : field.onChange}
                                >
                                </input>
                                {meta.touched && meta.error ? (<div style={{ color: "red" }}>{meta.error}</div>) : null}
                            </div>
                        )
                    }
                }
            </Field>
    </>
  )
}

export default FormCheckbox
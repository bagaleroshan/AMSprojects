import { Field } from "formik"

const FormRadio = ({ name, label, onChange, required, genders, ...props }) => {
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
                                {
                                    genders.map((item, i) => {
                                        return (
                                            <span key={i}>
                                                <label htmlFor={item.value}>{item.label}</label>
                                                <input
                                                    {...field}
                                                    {...props}
                                                    id={item.value}
                                                    type="radio"
                                                    value={item.value}
                                                    onChange={onChange ? onChange : field.onChange}
                                                    checked={meta.value === item.value}
                                                ></input>
                                            </span>
                                        )
                                    })
                                }
                                {meta.touched && meta.error ? (<div style={{ color: "red" }}>{meta.error}</div>) : null}
                            </div>
                        )
                    }
                }
            </Field>
    </>
  )
}

export default FormRadio
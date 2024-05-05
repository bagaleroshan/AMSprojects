import { Field } from "formik"

const FormSelect = ({ name, label, onChange, countries, required, ...props }) => {
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
                                <select
                                    {...field}
                                    {...props}
                                    id={name}
                                    value={meta.value}
                                    onChange={onChange ? onChange : field.onChange}
                                >
                                    {countries.map((item, i) => {
                                        return (
                                            <option key={i} value={item._id} disabled={item.disabled}>
                                                {item.label}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                        )
                    }
                }
            </Field>
    </>
  )
}

export default FormSelect
import { Field } from "formik"

const FormInput = ({ name, label, type, onChange, required, ...props }) => {
  return (
    <>
    <Field>
        {({field, form, meta}) => {

            return(
                <div>
                    <label htmlFor={name}>{label}{required ? <span>*</span> : null}</label>
                        <input
                            {...field}
                            {...props}
                            id={name}
                            type={type}
                            value={meta.value}
                            onChange={onChange ? onChange : field.onChange}
                        ></input>
                        {meta.touched && meta.error ? (<div style={{ color: "red" }}>{meta.error}</div>) : null}
                </div>
            )

        }    
        }
    </Field>
    </>
  )
}

export default FormInput
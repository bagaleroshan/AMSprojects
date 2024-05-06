import { TextField } from "@mui/material";
import { Field } from "formik";

const DwTextArea = ({ name, label, type, onChange }) => {
  return (
    <div>
      <Field name="description">
        {({ field, form, meta }) => {
          return (
            <div>
              <TextField
                id="description"
                name={name}
                label={label}
                value={meta.value}
                placeholder="Write something here..."
                onChange={onChange ? onChange : field.onChange}
                multiline
                rows={5}
                // rowsMax={10}
                variant="standard"
              />
              {meta.touched && meta.error ? (
                <div style={{ color: "red" }}>{meta.error}</div>
              ) : null}
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default DwTextArea;

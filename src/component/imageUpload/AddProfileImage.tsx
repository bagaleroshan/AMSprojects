import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Field, FieldProps } from "formik";
import { IAddProfileImageProps } from "./IProfileImageInterface";
import { useOnDropFunction } from "./OnDropFunction";

const AddProfileImage: React.FC<IAddProfileImageProps> = ({ name, formik }) => {
  const maxSize = 1024 * 1024 * 2;

  const { getRootProps, getInputProps } = useOnDropFunction({
    maxSize,
    name,
    formik: formik as any,
  });

  const handleRemoveImage = () => {
    formik["values"][name] = null;
  };

  return (
    <div>
      <Field name={name}>
        {({ meta }: FieldProps) => {
          return (
            <div>
              <Box
                {...getRootProps()}
                sx={{
                  border: "2px dashed gray",
                  padding: 2,
                  textAlign: "center",
                  borderRadius: 2,
                  backgroundColor: "lightblue",
                  cursor: "pointer",
                  height: "auto",
                  width: { xs: 400 },
                  "&:hover": { border: "1px solid blue" },
                }}
              >
                <input {...getInputProps()} />
                {formik["values"][name] ? (
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Box
                      component="img"
                      src={formik["values"][name]}
                      alt="Uploaded File"
                      sx={{
                        maxWidth: "93%",
                        maxHeight: "80%",
                        margin: 1,
                      }}
                      onError={() => console.error("Error loading image")}
                    />
                    <IconButton
                      onClick={handleRemoveImage}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        fontSize: "medium",
                        "&:hover": {
                          backgroundColor: "white",
                          color: "black",
                        },
                      }}
                    >
                      <CloseRoundedIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <Typography variant="body1">
                    Drag & drop a file here, or click to select one...
                    (Maxsize:2 MB)
                  </Typography>
                )}
                <Button variant="contained" sx={{ marginTop: 2 }}>
                  Upload Photo
                </Button>
              </Box>
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
export default AddProfileImage;

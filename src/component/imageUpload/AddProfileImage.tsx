import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Button, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { Field, FieldProps } from "formik";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface IAddProfileImageProps {
  name: string;
  formik: {
    values: undefined;
    current: undefined;
    setFieldValue: (args1: string, args2: string) => void;
  };
}
const AddProfileImage: React.FC<IAddProfileImageProps> = ({ name, formik }) => {
  const maxSize = 1024 * 1024 * 2;

  const onDrop = useCallback(
    async <T extends File>(acceptedFiles: T[]) => {
      const formData = new FormData();
      formData.append("file1", acceptedFiles[0]);

      //   const filename = formData.get("file1");
      //   console.log("Form Data", filename.size);

      //   if (filename.size >= maxSize) {
      //     return {
      //       code: "size-too-large",
      //       message: " Image size is larger than 1MB",
      //     };
      //   } else{

      //   }
      try {
        const resultImage = await axios({
          url: "http://localhost:8000/files/single",
          method: "POST",
          data: formData,
        });
        const link = resultImage.data.result;
        const link2 = link.split("files").join("");
        formik.setFieldValue(name, link2);
      } catch (error) {
        console.log(error);
      }
    },
    [formik, name]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxSize: maxSize,
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
                    Drag & drop a file here, or click to select one
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

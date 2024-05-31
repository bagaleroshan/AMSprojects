import axios from "axios";
import { useCallback } from "react";
import { DropzoneOptions, FileRejection, useDropzone } from "react-dropzone";
import { IOnDropProps } from "./IProfileImageInterface";

export function useOnDropFunction({ maxSize, name, formik }: IOnDropProps) {
  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file.size > maxSize) {
          const rejection: FileRejection = {
            file,
            errors: [
              {
                code: "file-too-large",
                message: `File is larger than ${maxSize / (1024 * 1024)} MB`,
              },
            ],
          };
          handleFileRejection(rejection);
        } else {
          //Api hit if accepted
          const formData = new FormData();
          formData.append("file1", file);

          try {
            const resultImage = await axios({
              url: "http://localhost:8000/files/single",
              method: "POST",
              data: formData,
            });
            const link = resultImage.data.result;
            formik.setFieldValue(name, link.split("files").join(""));
          } catch (error) {
            console.log(error);
          }
        }
      }
      if (fileRejections.length > 0) {
        fileRejections.forEach(handleFileRejection);
      }
      // Function to handle file rejections
      function handleFileRejection(rejection: FileRejection): void {
        console.log(`File "${rejection.file.name}" was rejected due to :`);
        rejection.errors.forEach((error) => {
          console.error(`-${error.code}: ${error.message}`);
        });
        displayFileRejectionMessage(rejection);
      }
    },
    [formik, name, maxSize]
  );
  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    maxSize,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
  };

  const dropzoneProps = useDropzone(dropzoneOptions);

  return dropzoneProps;
}
function displayFileRejectionMessage(rejection: FileRejection): void {
  let errorMessage = `File "${rejection.file.name}" was rejected due to the following errors:\n`;
  rejection.errors.forEach((error) => {
    errorMessage += `- ${error.message}\n`;
  });
  alert(errorMessage);
}

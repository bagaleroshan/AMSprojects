import {
  Button,
  ButtonGroup,
  Grid,
  Modal as MuiModal,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { useAddStudentGroupMutation } from "../../services/api/GroupService";
import { useReadStudentsQuery } from "../../services/api/StudentApi";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import MuiLoadingButtonTheme from "../theme/MuiLoadingButtonTheme";
import { ModalContent, customStyles } from "../../muiModals/modalStyles";

interface Query {
  page: number;
  limit: number;
  findQuery: string;
  sort: string[];
}

export const GroupWithStudent = ({ id }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [query, setQuery] = useState<Query>({
    page: 1,
    limit: 10,
    findQuery: "",
    sort: [],
  });

  const { data } = useReadStudentsQuery({
    ...query,
    sort: query.sort.join(","),
  });

  const students = (data?.result?.results || []).map((value) => ({
    value: value.id,
    label: `${value.fullName} (${value.email})`,
  }));

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  const [
    addStudentGroup,
    {
      isSuccess: isSuccessAddStudentGroup,
      isError: isErrorAddStudentGroup,
      error: errorAddingStudent,
      data: dataAddStudentGroup,
      isLoading: isLoadingAddStudentGroup,
    },
  ] = useAddStudentGroupMutation();

  useEffect(() => {
    if (isSuccessAddStudentGroup) {
      toast.success(dataAddStudentGroup.message, {
        autoClose: 3000,
      });
      setSelectedOptions([]);
    }
  }, [isSuccessAddStudentGroup, dataAddStudentGroup]);

  useEffect(() => {
    if (isErrorAddStudentGroup) {
      if (isFetchBaseQueryError(errorAddingStudent)) {
        toast.error(getErrorMessage(errorAddingStudent), { autoClose: 5000 });
      } else if (isSerializedError(errorAddingStudent)) {
        toast.error(errorAddingStudent?.message, { autoClose: 5000 });
      } else {
        toast.error("Unknown Error", { autoClose: 5000 });
      }
    }
  }, [isErrorAddStudentGroup, errorAddingStudent]);

  const handleClick = () => {
    const arrayStudents = selectedOptions.map((val) => val?.value);
    addStudentGroup({ body: arrayStudents, id: id });
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <MuiModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        closeAfterTransition
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ModalContent sx={{ width: 600, height: 300 }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Add Students to Group
          </Typography>
          <Select
            isMulti
            value={selectedOptions}
            onChange={handleChange}
            options={students}
            styles={customStyles}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button onClick={handleClose} fullWidth>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <MuiLoadingButtonTheme
                buttonName="Add Student"
                onClick={handleClick}
                isLoading={isLoadingAddStudentGroup}
              />
            </Grid>
          </Grid>
        </ModalContent>
      </MuiModal>
      <button type="submit" onClick={handleOpen}>
        Add
      </button>
    </div>
  );
};

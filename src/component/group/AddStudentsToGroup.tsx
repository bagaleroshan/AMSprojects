import { Button, Grid, Modal as MuiModal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { ModalContent, customStyles } from "../../muiModals/modalStyles";
import {
  useAddStudentGroupMutation,
  useReadStudentsQuery,
} from "../../services/api/StudentApi";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import { Query } from "../interfaces/TableInterface";
import MuiLoadingButtonTheme from "../theme/MuiLoadingButtonTheme";

export const AddStudentsToGroup = ({ id }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [query, setQuery] = useState<Query>({
    page: 1,
    limit: 10,
    findQuery: "",
    sort: [],
  });

  const { data } = useReadStudentsQuery({
    ...query,
    limit: 0,
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
        <ModalContent
          sx={{
            width: 800,
            minHeight: 600,
            maxHeight: "90%",
            overflowY: "auto",
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Add Students to Group
          </Typography>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Select
                isMulti
                value={selectedOptions}
                onChange={handleChange}
                options={students}
                styles={customStyles}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                onClick={handleClose}
                fullWidth
                type="submit"
                color="error"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  "&:hover": { background: "#FF2E2E" },
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={4}>
              <MuiLoadingButtonTheme
                buttonName="Add Student"
                onClick={handleClick}
                isLoading={isLoadingAddStudentGroup}
              />
            </Grid>
          </Grid>
        </ModalContent>
      </MuiModal>
      <Grid container>
        <Grid item xs={2} sx={{ gridTemplateRows: "repeat(3, 1fr)" }}>
          <MuiLoadingButtonTheme
            buttonName="Add"
            onClick={handleOpen}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </div>
  );
};

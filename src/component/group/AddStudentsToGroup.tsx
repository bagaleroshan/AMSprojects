import { useEffect, useState } from "react";
import Select from "react-select";
import { useReadStudentsQuery } from "../../services/api/StudentApi";
import { useAddStudentGroupMutation } from "../../services/api/GroupService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import MuiLoadingButtonTheme from "../theme/MuiLoadingButtonTheme";

interface Query {
  page: number;
  limit: number;
  findQuery: string;
  sort: string[];
}
const customStyles = {
  control: (provided) => ({
    ...provided,
    margin: "10px 0",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#ccc",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#333",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#666",
    ":hover": {
      backgroundColor: "#aaa",
      color: "white",
    },
  }),
};

export const AddStudentsToGroup = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();
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
  const handleOnClick = () => {
    return setOpen(!open);
  };

  const students = (data?.result?.results || []).map((value) => {
    // console.log(group.teacher?.fullName, "************name**************");

    return {
      value: value.id,
      label: `${value.fullName} (${value.email})`,
    };
  });

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  /* Adding Student to a Group */
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
      // formikRef.current?.resetForm();
      // navigate("/admin/users");
    }
  }, [isSuccessAddStudentGroup, dataAddStudentGroup, navigate]);

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
    const arrayStudents = selectedOptions.map((val) => {
      return val.value;
    });
    // console.log(arrayStudents)
    addStudentGroup({ body: arrayStudents, id: id });
  };

  return (
    <div>
      {open && (
        <>
          <Select
            isMulti
            value={selectedOptions}
            onChange={handleChange}
            options={students}
            styles={customStyles}
          />
          <MuiLoadingButtonTheme
            buttonName="Add Student"
            onClick={handleClick}
            isLoading={isLoadingAddStudentGroup}
          />
        </>
      )}
      <button type="submit" onClick={handleOnClick}>
        Add
      </button>
    </div>
  );
};

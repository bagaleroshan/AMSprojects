import { useEffect } from "react";
import { useReadSubjectsQuery } from "../../services/api/SubjectService";

const ShowAllSubjects = () => {
  // const { isError, isSuccess, isLoading, data, error } = useReadSubjectsQuery();
  // console.log(subjectInfo);
  //   console.log(data);

  const subjects = [];
  const navigate = useNavigate();

  let deleteSubject = async (id) => {
    try {
      await axios({
        url: `http://localhost:8000/products/${id}`,
        method: "delete",
      });

      // getSubjects();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {subjects?.map((item: any, i: any) => {
        return (
          <div>
            {/* name:{item.name}
            <br></br>
            code:{item.code}
            <br></br>
            class:{item.class} */}
            ssss
          </div>
        );
      })}
    </div>
  );
};

export default ShowAllSubjects;

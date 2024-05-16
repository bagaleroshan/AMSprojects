import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useReadSubjectsQuery } from "../../services/api/SubjectService";

const ShowAllSubjects = () => {
  // const { isError, isSuccess, isLoading, data, error } = useReadSubjectsQuery();
  console.log(subjectInfo);
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
    <>
      <div>
        <h3>Here are all the lists of subjects</h3>
        {subjects.map((item, i) => {
          return (
            <div key={i}>
              <p>
                {i + 1} {item.subjectName}
              </p>

              <p>{item.subjectCode}</p>

              <button
                onClick={() => {
                  navigate(`/products/${item._id}`);
                }}
              >
                View Details
              </button>

              <button
                onClick={() => {
                  navigate(`/products/update/${item._id}`);
                }}
              >
                Update Product
              </button>

              <button
                onClick={() => {
                  deleteSubject(item._id);
                }}
              >
                Delete this Product
              </button>

              <hr></hr>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShowAllSubjects;

import { useReadGroupQuery } from "../../../../services/api/GroupService";

const SubjectName = () => {
  const query = {
    page: 0,
    limit: 0,
    findQuery: "",
    sort: "",
  };

  const {
    isError: isErrorViewAll,
    data: dataViewAll,
    error: errorViewAll,
    isLoading: isLoadingViewAll,
  } = useReadGroupQuery(query);

  const resultsArray = dataViewAll?.result?.results || [];

  if (isLoadingViewAll) {
    return <div>Loading...</div>;
  }

  if (isErrorViewAll) {
    return <div>Error: {errorViewAll.message}</div>;
  }

  return (
    <div>
      {resultsArray.length === 0 && <p>No groups found.</p>}
      {resultsArray.map((group, index) => (
        <div key={index}>
          <h3>{group.subject.subjectName}</h3>
        </div>
      ))}
    </div>
  );
};

export default SubjectName;

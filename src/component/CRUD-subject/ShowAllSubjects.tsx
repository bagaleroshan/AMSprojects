// import { useEffect } from "react";
// import { useReadSubjectsQuery } from "../../services/api/SubjectService";

// const ShowAllSubjects = () => {
//   const {
//     isError: isErrorReadSubjects,
//     isSuccess: isSuccessReadSubjects,
//     isLoading: isLoadingReadSubjects,
//     data: dataReadSubjects,
//     error: errorReadSubjects,
//   } = useReadSubjectsQuery();
//   useEffect(() => {
    
//     if (isErrorReadSubjects) {
//       console.log("****", errorReadSubjects?.error);
//     }
//   }, [isErrorReadSubjects, errorReadSubjects?.error]);
//   console.log(dataReadSubjects, "***********111");
//   const subjects = dataReadSubjects;
//   return (
//     <div>
//       {subjects?.map((item: any, i: any) => {
//         return (
//           <div>
//             {/* name:{item.name}
//             <br></br>
//             code:{item.code}
//             <br></br>
//             class:{item.class} */}
//             ssss
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ShowAllSubjects;

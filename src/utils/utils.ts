import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IErrorResponse } from "../component/subject/subjectInterface";


export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error !== null && 'status' in error && 'data' in error; 
}
  
  export function isSerializedError(error: unknown): error is SerializedError {
    return typeof error === 'object' && error !== null && 'message' in error;
  }

  export function getErrorMessage(error: FetchBaseQueryError | SerializedError): string {
    if (isFetchBaseQueryError(error)){
      const data = error.data as IErrorResponse
      return data?.message || "An unknown error has occurred !"
    } else if (isSerializedError(error)){
      return error?.message || "An unknown error has occurred !"
    } else{
      return "An unknown error has occurred !"
    }
  }
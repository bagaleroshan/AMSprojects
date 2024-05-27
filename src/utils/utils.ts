import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IErrorResponse } from "./utilsInterface";
// import { IErrorResponse } from "./utilsInterface";


export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error !== null && 'status' in error && 'data' in error; 
}
  
  export function isSerializedError(error: unknown): error is SerializedError {
    return typeof error === 'object' && error !== null && 'message' in error;
  }

  export function getErrorMessage(error: FetchBaseQueryError | SerializedError): object | number | string  {
    if (isFetchBaseQueryError(error)){
      console.log("Fetch base data", error)
      return  error?.data.message || "An unknown fetch based query error has occurred !"
    } else if (isSerializedError(error)){
      return error?.message || "An unknown serialized error has occurred !"
    } else{
      return "An unknown error has occurred !"
    }
  }
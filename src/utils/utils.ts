import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface ErrorData {
  message?: string;
}

interface CustomFetchBaseQueryError{
  status: number;
  data: ErrorData | null;
}

export function isFetchBaseQueryError(error: unknown): error is CustomFetchBaseQueryError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      'data' in error &&
      error.data !== null &&
      typeof error.data === "object" &&
      'message' in error.data
    );
}
  
  export function isSerializedError(error: unknown): error is SerializedError {
    return (
      typeof error === 'object' &&
    error !== null &&
    'message' in error
    )
  }

  export function getErrorMessage(error: FetchBaseQueryError | SerializedError):  number | string  {
    if (isFetchBaseQueryError(error)){
      return  error.data?.message || error.status.toString() || "An unknown fetch based query error has occurred !"
    } else if (isSerializedError(error)){
      return error?.message || "An unknown serialized error has occurred !"
    } else{
      return "An unknown error has occurred !"
    }
  }
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface IErrorResponse extends FetchBaseQueryError {
  data: {
    message: string;
  };
  status: string;
}

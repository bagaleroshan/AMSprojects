import { styled } from "@mui/material";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { format, isValid } from "date-fns";

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

  /* ******************Functions************************ */

 export function changeFirstName(fullName: string) {
    if (!fullName) return "";
    const names = fullName.split(" ");
    if (names.length >= 1) {
      for (let a = 0; a < names.length; a++) {
        names[a] =
          names[a].charAt(0).toUpperCase() + names[a].slice(1).toLowerCase();
      }
    }
    return names.join(" ");
  }
  

  /* ***********Format Time*************************** */

 export const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    if (!isValid(date)) {
      return "Invalid time";
    }
    return format(date, "hh:mm a");
  };


  // Function to strip HTML tags
export const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

export const stripHtmlTagsCSV = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.innerHTML
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<li>/gi, '\n• ')
    .replace(/<\/li>/gi, '')
    .replace(/<[^>]+>/g, ''); // Remove remaining HTML tags
};


/* Theme */

export const Div = styled('div')(({ theme }) => ({
  ...theme.typography.h6,
  // backgroundColor: 'theme.palette.background.paper',
  backgroundColor: 'transparent',
  padding: theme.spacing(1),
  textAlign: 'end',
}));

/* *********Format Time at Excel Column**************** */
export const formatTimeRange = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `${formattedHours}:${minutes} ${period}`;
  };

  return `${formatTime(start)} - ${formatTime(end)}`;
};



/* ************************* To Locale Time************************** */
export function formatTimeRangeToLocale(startTime, endTime) {
  const options = { hour: "numeric", minute: "numeric", hour12: true };

  const start = new Date(startTime);
  const end = new Date(endTime);

  const startTimeFormatted = start.toLocaleString("en-US", options);
  const endTimeFormatted = end.toLocaleString("en-US", options);

  return `${startTimeFormatted} - ${endTimeFormatted}`;
}

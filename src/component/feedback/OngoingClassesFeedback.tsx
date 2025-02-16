import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RequestFeedback from "../../feedback/RequestFeedback";
import { useReadActiveGroupQuery } from "../../services/api/GroupService";
import {
  changeFirstName,
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../../utils/utils";
import { Group } from "../interfaces/FeedbackInterface";

const OngoingClassesFeedback = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const navigate = useNavigate();
  const {
    isError: isErrorReadActiveGroups,
    data: dataReadActiveGroups,
    isLoading: isLoadingReadActiveGroups,
    error: errorReadActiveGroups,
  } = useReadActiveGroupQuery({
    activeQuery: "true",
    findQuery: debouncedQuery,
  });
  // console.log(dataReadActiveGroups);

  const resultsArray = dataReadActiveGroups?.result?.results || [];

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (isErrorReadActiveGroups) {
      if (isFetchBaseQueryError(errorReadActiveGroups)) {
        toast.error(getErrorMessage(errorReadActiveGroups));
      } else if (isSerializedError(errorReadActiveGroups)) {
        toast.error(errorReadActiveGroups?.message);
      } else {
        toast.error("Unknown Error");
      }
    }
  }, [isErrorReadActiveGroups, errorReadActiveGroups]);

  if (isLoadingReadActiveGroups) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={2}>
      {/* <input
        name="searchBar"
        placeholder="Search"
        style={{ width: "250px", height: "30px", margin: "10px 20px" }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      /> */}

      <Grid item xs={12} display="flex" justifyContent="flex-end">
        <TextField
          size="small"
          variant="outlined"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ backgroundColor: "#FFFFFF" }}
        />
      </Grid>
      {resultsArray.length === 0 ? (
        <Grid item xs={12}>
          <Paper
            elevation={1}
            sx={{
              height: "10vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "box-shadow 0.3s",
              "&:hover": {
                cursor: "pointer",
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <Typography color="primary" sx={{ color: "black" }}>
              No classes found.
            </Typography>
          </Paper>
        </Grid>
      ) : (
        resultsArray.map((group: Group, index: number) => (
          <Grid
            item
            xs={12}
            key={index}
            onClick={() => navigate(`/admin/feedback/${group.id}`)}
          >
            <Paper
              elevation={3}
              sx={{
                p: 2,
                transition: "box-shadow 0.2s ease-in-out",
                "&:hover": {
                  cursor: "pointer",
                  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
                  transform: "scale(1.01)",
                },
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid
                  item
                  xs={2}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <LocalLibraryOutlinedIcon color="primary" fontSize="large" />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {group.groupName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Teacher: {changeFirstName(group?.teacher?.fullName)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Subject Name: {group.subject.subjectName}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {group.hasRequestedFeedback ? (
                    <Button
                      onClick={() => navigate(`/admin/feedback/${group.id}`)}
                      color="primary"
                      variant="contained"
                    >
                      View Feedbacks
                    </Button>
                  ) : (
                    <RequestFeedback groupId={group.id} />
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default OngoingClassesFeedback;

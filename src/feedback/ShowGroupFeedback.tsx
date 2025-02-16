import { AccountCircle } from "@mui/icons-material";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import DOMPurify from "dompurify";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FeedbackExportExcel from "../component/ExportCSV/FeedbackExportCSV";
import {
  exportFeedbackColumn,
  Feedback,
} from "../component/interfaces/FeedbackInterface";
import { useReadFeedbackByGroupIdQuery } from "../services/api/FeedbackApi";
import {
  changeFirstName,
  formatTimeRange,
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from "../utils/utils";

const ShowGroupFeedback = () => {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {
    isError: isErrorReadFeedbackById,
    error: errorReadFeedbackById,
    data: dataReadFeedbackById,
    isLoading: isLoadingReadFeedbackById,
  } = useReadFeedbackByGroupIdQuery(id);

  const feedbacks = dataReadFeedbackById?.result?.results || [];
  // console.log(feedbacks);

  // Update the data to include studentName and studentEmail
  const feedbacksWithTime = feedbacks.map((feedback) => ({
    ...feedback,
    // studentName: feedback.student.fullName,
    // phoneNumber: feedback.student.phoneNumber,
    time: formatTimeRange(feedback.group.startTime, feedback.group.endTime),
  }));

  // Extract group name from the first feedback item
  const groupName = feedbacks.length > 0 ? feedbacks[0]?.group?.groupName : "";

  const filteredFeedbacks: Feedback[] = feedbacks.filter((feedback: Feedback) =>
    feedback.student?.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (isErrorReadFeedbackById) {
      if (isFetchBaseQueryError(errorReadFeedbackById)) {
        toast.error(getErrorMessage(errorReadFeedbackById));
      } else if (isSerializedError(errorReadFeedbackById)) {
        toast.error(errorReadFeedbackById?.message);
      } else {
        toast.error("Unknown Error");
      }
    }
  }, [isErrorReadFeedbackById, errorReadFeedbackById]);

  return (
    <>
      {groupName && (
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          {groupName}
        </Typography>
      )}
      <Box height={50} />
      {feedbacks.length > 0 && (
        <Box mb={3}>
          <Grid container>
            {/* <Grid item xs={2.3}>
              <TextField
                label="Search by Student Name"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Grid> */}
            <Grid item xs={2.5}>
              <TextField
                size="small"
                variant="outlined"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
            <Grid item>
              <FeedbackExportExcel
                data={feedbacksWithTime}
                columns={exportFeedbackColumn}
                fileName="Group Feedback"
              />
            </Grid>
          </Grid>
        </Box>
      )}
      <Grid container spacing={2}>
        {isLoadingReadFeedbackById ? (
          <Grid item xs={12}>
            <Box
              mt={15}
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                color="textSecondary"
                sx={{ fontStyle: "italic" }}
              >
                Feedbacks are loading...
              </Typography>
            </Box>
          </Grid>
        ) : filteredFeedbacks.length > 0 ? (
          filteredFeedbacks.map((value, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  margin: 1,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "box-shadow 0.3s",
                  "&:hover": {
                    cursor: "pointer",
                    boxShadow: 4,
                    borderColor: (theme) => theme.palette.primary.main,
                    // borderWidth: 2,
                    borderStyle: "ridge",
                  },
                }}
              >
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {changeFirstName(value?.student?.fullName)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Phone No.: {value.student.phoneNumber}
                  </Typography>
                  <Divider
                    sx={{ my: 2, borderColor: "black", borderWidth: 2 }}
                  />
                  <Typography variant="body1" gutterBottom>
                    Feedbacks:
                  </Typography>
                  {[
                    { label: "On Time", value: value.onTime },
                    { label: "Delivery Power", value: value.hasDeliveryPower },
                    { label: "Has Skills", value: value.hasSkills },
                    { label: "Interactive Class", value: value.hasInteraction },
                    { label: "Class Fruitful", value: value.isClassFruitful },
                    {
                      label: "Classroom Comfort",
                      value: value.isClassRoomComfortable,
                    },
                    {
                      label: "Internet Working",
                      value: value.doesInternetWork,
                    },
                    {
                      label: "Self Improvement",
                      value: value.feelChangeOnYourself,
                    },
                    {
                      label: "Clear Communication",
                      value: value.hasClearConversation,
                    },
                  ].map((item, index) => (
                    <Box
                      key={index}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      mb={1}
                    >
                      <Typography>{item.label}:</Typography>
                      <Rating value={item.value} readOnly precision={1} />
                    </Box>
                  ))}
                  <Typography
                    sx={{
                      wordBreak: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    Thoughts:{" "}
                    <Box
                      // component="pre"
                      component="div"
                      sx={{
                        wordWrap: "break-word",
                        whiteSpace: "pre-wrap",
                        overflowWrap: "break-word",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(value.description),
                      }}
                    />
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <IconButton>
                    <AccountCircle color="primary" />
                  </IconButton>
                  <Typography variant="body2" color="textSecondary">
                    Submitted by {changeFirstName(value?.student?.fullName)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box
              mt={15}
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                color="textSecondary"
                sx={{ fontStyle: "italic" }}
              >
                No Feedbacks For This Group Yet...
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default ShowGroupFeedback;

import { AccountCircle } from "@mui/icons-material";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Feedback } from "../component/interfaces/FeedbackInterface";
import { useReadFeedbackByGroupIdQuery } from "../services/api/FeedbackApi";
import {
  changeFirstName,
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
  stripHtmlTags,
} from "../utils/utils";
import DOMPurify from "dompurify";

const ShowGroupFeedback = () => {
  const { id } = useParams();
  /* State for search query */
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    isError: isErrorReadFeedbackById,
    error: errorReadFeedbackById,
    data: dataReadFeedbackById,
  } = useReadFeedbackByGroupIdQuery(id);

  const feedbacks = dataReadFeedbackById?.result?.results || [];
  // console.log("feedbacks", feedbacks);

  // Filter feedbacks based on search query
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
      <Box height={50} />
      {feedbacks.length > 0 && (
        <Box mb={3}>
          <TextField
            label="Search by Student Name"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
      )}
      <Grid container spacing={2}>
        {filteredFeedbacks.length > 0 ? (
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
                    borderWidth: 2,
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
                  <Typography>On Time: {value.onTime}</Typography>
                  <Typography gutterBottom>
                    Delivery Power: {value.hasDeliveryPower}
                  </Typography>
                  <Typography gutterBottom>
                    Has Skills: {value.hasSkills}
                  </Typography>
                  <Typography gutterBottom>
                    Interactive Class: {value.hasInteraction}
                  </Typography>
                  <Typography gutterBottom>
                    Class Fruitful: {value.isClassFruitful}
                  </Typography>
                  <Typography gutterBottom>
                    Classroom Comfort: {value.isClassRoomComfortable}
                  </Typography>
                  <Typography gutterBottom>
                    Internet Working: {value.doesInternetWork}
                  </Typography>
                  <Typography gutterBottom>
                    Self Improvement: {value.feelChangeOnYourself}
                  </Typography>
                  <Typography gutterBottom>
                    Clear Communication: {value.hasClearConversation}
                  </Typography>
                  <Typography
                    sx={{
                      wordBreak: "break-word",
                    }}
                  >
                    Thoughts:{" "}
                    <Box
                      component="span"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          stripHtmlTags(value.description)
                        ),
                      }}
                    />
                  </Typography>
                </Box>
                <Box mt={1} display="flex" alignItems="center">
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
                No Feedbacks Yet...
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default ShowGroupFeedback;

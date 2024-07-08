import {
  Box,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { AccountCircle } from "@mui/icons-material";

const RoughRough = () => {
  const feedfeed = [
    {
      student: { fullName: "Sagun Doe", phoneNumber: "123-456-7890" },
      onTime: "Yes",
      hasDeliveryPower: "Yes",
      hasSkills: "Yes",
      hasInteraction: "Yes",
      isClassFruitful: "Yes",
      isClassRoomComfortable: "Yes",
      doesInternetWork: "Yes",
      feelChangeOnYourself: "Yes",
      hasClearConversation: "Yes",
      description: "Great class!",
    },
    {
      student: { fullName: "POtato Doe", phoneNumber: "123-456-7890" },
      onTime: "Yes",
      hasDeliveryPower: "Yes",
      hasSkills: "Yes",
      hasInteraction: "Yes",
      isClassFruitful: "Yes",
      isClassRoomComfortable: "Yes",
      doesInternetWork: "Yes",
      feelChangeOnYourself: "Yes",
      hasClearConversation: "Yes",
      description:
        "Great class!s,andjsadsandsjandjsadsddddddddddddddnjsandjnxmzmsndsmandjsjadd,sam,dsmamds,amd,sam,dddddddddddddddddddddddddddddddddddddddddddddddddddddn",
    },
    {
      student: { fullName: "Dikshya Doe", phoneNumber: "123-456-7890" },
      onTime: "Yes",
      hasDeliveryPower: "Yes",
      hasSkills: "Yes",
      hasInteraction: "Yes",
      isClassFruitful: "Yes",
      isClassRoomComfortable: "Yes",
      doesInternetWork: "Yes",
      feelChangeOnYourself: "Yes",
      hasClearConversation: "Yes",
      description: "Great class!",
    },
    {
      student: { fullName: "Fufu Doe", phoneNumber: "123-456-7890" },
      onTime: "Yes",
      hasDeliveryPower: "Yes",
      hasSkills: "Yes",
      hasInteraction: "Yes",
      isClassFruitful: "Yes",
      isClassRoomComfortable: "Yes",
      doesInternetWork: "Yes",
      feelChangeOnYourself: "Yes",
      hasClearConversation: "Yes",
      description: "Great class!",
    },
    {
      student: { fullName: "John Doe", phoneNumber: "123-456-7890" },
      onTime: "Yes",
      hasDeliveryPower: "Yes",
      hasSkills: "Yes",
      hasInteraction: "Yes",
      isClassFruitful: "Yes",
      isClassRoomComfortable: "Yes",
      doesInternetWork: "Yes",
      feelChangeOnYourself: "Yes",
      hasClearConversation: "Yes",
      description:
        "Great class! jasduasndajsdasdsmfsjfbfusajwfjwbjfjwbfjwfjwbffffffffbwajwbjabsjabjsbaj",
    },
    // {
    //   student: { fullName: "John Doe", phoneNumber: "123-456-7890" },
    //   onTime: "Yes",
    //   hasDeliveryPower: "Yes",
    //   hasSkills: "Yes",
    //   hasInteraction: "Yes",
    //   isClassFruitful: "Yes",
    //   isClassRoomComfortable: "Yes",
    //   doesInternetWork: "Yes",
    //   feelChangeOnYourself: "Yes",
    //   hasClearConversation: "Yes",
    //   description: "Great class!",
    // },
    // {
    //   student: { fullName: "John Doe", phoneNumber: "123-456-7890" },
    //   onTime: "Yes",
    //   hasDeliveryPower: "Yes",
    //   hasSkills: "Yes",
    //   hasInteraction: "Yes",
    //   isClassFruitful: "Yes",
    //   isClassRoomComfortable: "Yes",
    //   doesInternetWork: "Yes",
    //   feelChangeOnYourself: "Yes",
    //   hasClearConversation: "Yes",
    //   description: "Great class!",
    // },
    // {
    //   student: { fullName: "John Doe", phoneNumber: "123-456-7890" },
    //   onTime: "Yes",
    //   hasDeliveryPower: "Yes",
    //   hasSkills: "Yes",
    //   hasInteraction: "Yes",
    //   isClassFruitful: "Yes",
    //   isClassRoomComfortable: "Yes",
    //   doesInternetWork: "Yes",
    //   feelChangeOnYourself: "Yes",
    //   hasClearConversation: "Yes",
    //   description:
    //     "Great class! COuld be betterksnadskassandsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    // },
    // {
    //   student: { fullName: "John Doe", phoneNumber: "123-456-7890" },
    //   onTime: "Yes",
    //   hasDeliveryPower: "Yes",
    //   hasSkills: "Yes",
    //   hasInteraction: "Yes",
    //   isClassFruitful: "Yes",
    //   isClassRoomComfortable: "Yes",
    //   doesInternetWork: "Yes",
    //   feelChangeOnYourself: "Yes",
    //   hasClearConversation: "Yes",
    //   description: "Great class!",
    // },
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const feedbacks = feedfeed.filter((feedback) =>
    feedback.student.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <Box height={50} />
      <Box mb={3}>
        <TextField
          label="Search by Student Name"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>
      <Grid container spacing={2}>
        {feedbacks.length > 0 ? (
          feedbacks.map((value, i) => (
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
                    {value.student.fullName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Phone No.: {value.student.phoneNumber}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Feedbacks:
                  </Typography>
                  <Typography gutterBottom>On Time: {value.onTime}</Typography>
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
                    Thoughts: {value.description}
                  </Typography>
                </Box>
                <Box mt={2} display="flex" alignItems="center">
                  <IconButton>
                    <AccountCircle color="primary" />
                  </IconButton>
                  <Typography variant="body2" color="textSecondary">
                    Submitted by {value.student.fullName}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box
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

export default RoughRough;

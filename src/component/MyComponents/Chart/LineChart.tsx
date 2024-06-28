import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

import "./lineChart.css";

Chart.register(...registerables);

const LineChart = ({ data }) => {
  return (
    <>
      <div className="container">
        <Line
          data={{
            labels: data.result.map((value) => value.day),

            datasets: [
              {
                label: "presentees",
                data: data.result.map((data) => data.presentees),
                backgroundColor: "#5B8B7",
                borderColor: "#5DB8B7",
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            elements: {
              line: {
                tension: 0.5,
                borderWidth: 5,
              },
              point: {
                pointStyle: "circle",
                radius: 4,
              },
            },
            plugins: {
              title: {
                display: true,
                text: "Monthly Presentees",
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Days",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "No of presentees",
                },
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default LineChart;

// import { useState } from "react";
// import { Line } from "react-chartjs-2";
// import { Chart, registerables } from "chart.js";
// import {
//   Box,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   SelectChangeEvent,
//   Stack,
// } from "@mui/material";
// import Data from "../../../Data/realData.json";
// import "./lineChart.css";

// Chart.register(...registerables);

// const LineChart = () => {
//   const [month, setMonth] = useState("3");

//   const handleChange = (event: SelectChangeEvent) => {
//     setMonth(event.target.value);
//   };

//   const filteredData = Data.filter(
//     (data) => new Date(data.date).getMonth() + 1 === parseInt(month)
//   );

//   return (
//     <>
//       <Stack display="flex" direction="row" spacing={25} marginBottom={4}>
//         <Box sx={{ minWidth: 120 }} component="div">
//           <FormControl fullWidth color="primary">
//             <InputLabel id="month-select-label">Month</InputLabel>
//             <Select
//               labelId="month-select-label"
//               id="month-select"
//               value={month}
//               label="Month"
//               onChange={handleChange}
//             >
//               <MenuItem value={1}>Jan</MenuItem>
//               <MenuItem value={2}>Feb</MenuItem>
//               <MenuItem value={3}>Mar</MenuItem>
//               <MenuItem value={4}>Apr</MenuItem>
//               <MenuItem value={5}>May</MenuItem>
//               <MenuItem value={6}>Jun</MenuItem>
//               <MenuItem value={7}>Jul</MenuItem>
//               <MenuItem value={8}>Aug</MenuItem>
//               <MenuItem value={9}>Sep</MenuItem>
//               <MenuItem value={10}>Oct</MenuItem>
//               <MenuItem value={11}>Nov</MenuItem>
//               <MenuItem value={12}>Dec</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//       </Stack>

//       <div className="container">
//         <Line
//           data={{
//             labels: filteredData.map((value) => value.label),
//             datasets: [
//               {
//                 label: "Presentees",
//                 data: filteredData.map((data) => data.Presentees),
//                 backgroundColor: "#5B8B7",
//                 borderColor: "#5DB8B7",
//               },
//             ],
//           }}
//           options={{
//             responsive: true,
//             maintainAspectRatio: false,
//             elements: {
//               line: {
//                 tension: 0.5,
//                 borderWidth: 5,
//               },
//               point: {
//                 pointStyle: "circle",
//                 radius: 4,
//               },
//             },
//             plugins: {
//               title: {
//                 display: true,
//                 text: "Monthly Presentees",
//               },
//             },
//             scales: {
//               x: {
//                 title: {
//                   display: true,
//                   text: "Days",
//                 },
//               },
//               y: {
//                 title: {
//                   display: true,
//                   text: "No of Presentees",
//                 },
//               },
//             },
//           }}
//         />
//       </div>
//     </>
//   );
// };

// export default LineChart;

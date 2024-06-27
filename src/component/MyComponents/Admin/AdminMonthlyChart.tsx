import React, { useState } from "react";
import LineChart from "../chart/LineChart";
import RoughMuiSelect from "../muiComponent/RoughMuiSelect";
import { Box } from "@mui/material";
import { useReadMonthlyAttendanceReportQuery } from "../../../services/api/AttendanceService";

const AdminMonthlyChart = () => {
    const [groupId,setGroupId]=useState("")
    const [date,setDate]=useState("")
const {data}= useReadMonthlyAttendanceReportQuery({id:groupId,month:date})
console.log(data)
//Process data

  return (
    <div>
      <LineChart   />
      <Box height={5}/>
      <RoughMuiSelect setGroupId={setGroupId} setDate={setDate} groupId={groupId} />
    </div>
  );
};

export default AdminMonthlyChart;

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useReadMonthlyAttendanceReportQuery } from "../../../services/api/AttendanceService";
import LineChart from "../Chart/LineChart";
import RoughMuiSelect from "../muiComponent/RoughMuiSelect";

const AdminMonthlyChart = () => {
  const [groupId, setGroupId] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const { data } = useReadMonthlyAttendanceReportQuery({
    id: groupId,
    month: date,
  });

  useEffect(() => {
    if (data) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [data]);

  const handleInitialGroupId = (id: string) => {
    setGroupId(id);
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : data ? (
        <>
          <LineChart data={data} />
          <Box height={5} />
        </>
      ) : (
        <div>No data available for the selected period.</div>
      )}
      <RoughMuiSelect
        setGroupId={setGroupId}
        setDate={setDate}
        groupId={groupId}
        setInitialGroupId={handleInitialGroupId}
      />
    </div>
  );
};

export default AdminMonthlyChart;

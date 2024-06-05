import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

import Data from "../../../Data/realData.json";
import "./lineChart.css";

Chart.register(...registerables);

const LineChart = () => {
  return (
    <>
      <div className="container">
        <Line
          data={{
            labels: Data.map((value) => value.label),
            datasets: [
              {
                label: "presentees",
                data: Data.map((data) => data.Presentees),
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

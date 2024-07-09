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


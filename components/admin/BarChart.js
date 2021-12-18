import React from "react";
import { Bar } from "react-chartjs-2";
import faker from "faker";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const BarChart = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Sales:",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "Dataset 1",
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //     },
  //     {
  //       label: "Dataset 2",
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: "rgba(53, 162, 235, 0.5)",
  //     },
  //   ],
  // };

  const data = {
    labels,
    datasets: [
      {
        label: "Users",
        data: [200, 400, 600, 800, 1000],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Posts",
        data: [200, 400, 600, 800, 1000],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
     
    ],
  };

  return (
    <div className="col">
      <div className="bg-white p-3 border rounded position-relative" style={{maxHeight: "350px"}}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;

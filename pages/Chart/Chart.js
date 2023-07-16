import React from "react";
import {
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ({ yes, no, id }) {
  // let sum = yes[0] + no[0];
  // let yesCount = (yes[0] / sum) * 100;
  // let noCount = (no / sum ) * 100
  console.log(yes)
  const data_2 = [
    {
      Id: 1,
      "Đồng ý": 10,
      "Không đồng ý": 10,
    },
  ];
  return (
    <div className="p-1 flex flex-col justify-center items-center">
      <Typography className="p-2 text-center" color="white" variant="h5">
        Thống kê kết quả bỏ phiếu của đề xuất mới nhất
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart width="100%" height="100%" data={data_2}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Đồng ý" fill="#4890F8" />
          <Bar dataKey="Không đồng ý" fill="#A663EA" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

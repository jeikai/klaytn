import React from "react";
import { Typography } from "@material-tailwind/react";
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

export default function ({ yes, no, id, count }) {
  const data = [];
  for (let i = 0; i < count; i++) {
    let sum = yes[i] + no[i];
    const object = {
      name: id[i] + 1,
      "Đồng ý": (yes[i] / sum) * 100,
      "Không đồng ý": (no[i] / sum) * 100,
    };
    data.push(object);
  }
  return (
    <div className="p-1 flex flex-col justify-center items-center">
      <Typography className="p-2 text-center" color="white" variant="h5">
        Thống kê kết quả bỏ phiếu của tất cả đề xuất
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart width="100%" height="100%" data={data}>
          <CartesianGrid stroke="#FFFFFF" strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: "#FFFFFF" }} />
          <YAxis tick={{ fill: "#FFFFFF" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Đồng ý" fill="#4890F8" />
          <Bar dataKey="Không đồng ý" fill="#A663EA" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

import React from 'react';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Carousel,
  Typography,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import {
    PieChart,
    Pie,
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';

  export default function ({yes, no}) { 
    let sum = yes + no;
    let yesCount = (yes / sum ) * 100
    let noCount = (no / sum ) * 100
    console.log(sum)
    const data_2 = [
        {
            "Đồng ý": yesCount,
            "Không đồng ý": noCount,
        }
    ]
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
    )
  }
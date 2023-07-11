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

  export default function () { 
    const data = [
        {
            "Đồng ý": 10,
            "Không đồng ý": 10,
            "Chưa bỏ phiếu": 10,
        }
    ]
    return (
        <div className="p-1 flex flex-col justify-center items-center">
        <Typography className="p-2 text-center" color="white" variant="h5">
          Thống kê xe sắp hết hạn và dự báo lượng xe đăng kiểm theo tháng năm{' '}
          {new Date().getFullYear()}
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart width="100%" height="100%" data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Đồng ý" fill="#4890F8" />
            <Bar dataKey="Không đồng ý" fill="#A663EA" />
            <Bar dataKey="Chưa bỏ phiếu" fill="#0313af" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
import React, {useState, useEffect} from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Carousel,
  Typography,
} from "@material-tailwind/react";
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
} from "recharts";
function Chart({ address }) {
  const [time, setTime] = useState('')

  function formatTime(val) {
    if ( val < 10) {
      return '0'
    } else {
      return ''
    }
  }
  useEffect( () => {
    const timerID = setInterval(
      () => tick(), 1000
    )
    return function cleanup() {
      clearInterval(timerID)
    }
  })

  function tick() {
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    const s = d.getSeconds();
    setTime(formatTime(h) + h + ':' + formatTime(m) + m + ':' + formatTime(s) + s)

  }
  const data = [
    {
      "Đồng ý": 100,
      "Không đồng ý": 200,
    },
  ];
  return (
    <div className="col-span-3">
      <div className="p-1 flex flex-col justify-center items-center">
        <Typography className="p-2 text-center" color="white" variant="h5">
          Thống kê kết quả bỏ phiếu vào lúc
          {" " + time}
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart width="100%" height="100%" data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Đồng ý" fill="#73c991" />
            <Bar dataKey="Không đồng ý" fill="#dd4c35" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Chart;

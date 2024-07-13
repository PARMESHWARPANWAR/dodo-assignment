import React from 'react';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';

interface DataPoint {
  name: string;
  value: number;
  fill: string;
}

const data: DataPoint[] = [
  { name: 'United States', value: 38.6, fill: "#006d77" },
  { name: 'Canada', value: 22.5, fill: "#83d483" },
  { name: 'Europe', value: 30.8, fill: "#ffa62b" },
  { name: 'Other', value: 8.1, fill: "#4a4e69" },
];

interface TransactionVolumePieChartProps {
  title: string;
}

const TransactionVolumePieChart: React.FC<TransactionVolumePieChartProps> = ({ title }) => {
  return (
    <div className="relative min-h-[328px] py-6 px-6 rounded-2xl bg-[#f8f9fb] dark:bg-slate-800">
      <h3 className="absolute top-6 left-6 text-foreground font-medium dark:text-foreground-dark">
        {title}
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart
          width={200}
          height={200}
          margin={{
            top: 20,
            right: 150,
          }}
        >
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute right-6 top-[50%]  translate-y-[-50%]  ">
        <ul className="flex flex-col space-y-2">
          {data.map((item) => (
            <li className="flex gap-8 items-center text-sm text-foreground dark:text-slate-300">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.fill }}
                ></span>
                <span>{item.name}</span>
              </div>
              <span>{item.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionVolumePieChart;


import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface DataPoint {
    name: string;
    value: number;
    fill: string;
}

const data: DataPoint[] = [
    { name: 'YouTube', value: 180000, fill: "#e65353", },
    { name: 'Twitter', value: 230000, fill: "#8884d8", },
    { name: 'Reddit', value: 195000, fill: "#FF8b60" },
    { name: 'Indiehacker', value: 80000, fill: "#e57a53" },
];

interface TransactionsBarChartProps {
    title: string;
}

const TransactionsBarChart: React.FC<TransactionsBarChartProps> = ({ title }) => {
    return (
        <div className="relative min-h-[328px] py-6 px-6 rounded-2xl bg-[#f8f9fb] dark:bg-slate-800">
            <h3 className="absolute top-6 left-6 text-foreground font-medium dark:text-foreground-dark">
                {title}
            </h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    className="w-full h-full"
                    data={data}
                    margin={{
                        top: 50,
                        right: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        tickFormatter={(value: number) => `${value / 1000}K`}
                        domain={[0, 300000]}
                        ticks={[0, 100000, 200000, 300000]}
                    />
                    <Bar dataKey="value" fill={(data) => data.fill} barSize={25} radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TransactionsBarChart;
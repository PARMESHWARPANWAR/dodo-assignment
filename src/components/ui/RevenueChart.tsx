import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface DataPoint {
    month: string;
    revenue: number;
}

const data: DataPoint[] = [
    { month: 'Jan', revenue: 10000000 },
    { month: 'Feb', revenue: 15000000 },
    { month: 'Mar', revenue: 18000000 },
    { month: 'Apr', revenue: 16500000 },
    { month: 'May', revenue: 17000000 },
    { month: 'Jun', revenue: 19000000 },
    { month: 'Jul', revenue: 23548570 },
];

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ value: number }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {

    if (active && payload && payload.length) {
        const formattedValue = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(payload[0].value);

        return (
            <div className="bg-[#474748] text-white text-sm px-2 py-1 rounded-lg">
                <p className="label">{formattedValue}</p>
            </div>
        );
    }
    return null;
};

interface RevenueChartProps {
    title: string;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ title }) => {
    return (
        <div className="relative min-h-[328px] py-6 px-6 rounded-2xl bg-[#f8f9fb] dark:bg-slate-800">
            <h3 className="absolute top-6 left-6 text-foreground font-medium dark:text-foreground-dark">
                {title}
            </h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    className="w-full h-full"
                    data={data}
                    margin={{
                        top: 50,
                        right: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid vertical={false} stroke="#cccdce97" />
                    <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        padding={{ left: 30 }}
                        className="text-sm font-medium"
                    />
                    <YAxis
                        tickFormatter={(value: number) => `$${value / 1000000}M`}
                        domain={[0, 30000000]}
                        ticks={[0, 10000000, 20000000, 30000000]}
                        axisLine={false}
                        tickLine={false}
                        dx={-10}
                        className="text-sm font-medium"
                    />
                    <Tooltip
                        cursor={{ strokeDasharray: 10 }}
                        content={<CustomTooltip />}
                    />
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#526062"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 5 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueChart;
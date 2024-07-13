import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface DataPoint {
    month: string;
    transactions: number;
}

const data: DataPoint[] = [
    { month: 'Jan', transactions: 3200 },
    { month: 'Feb', transactions: 4800 },
    { month: 'Mar', transactions: 7500 },
    { month: 'Apr', transactions: 6900 },
    { month: 'May', transactions: 8200 },
    { month: 'Jun', transactions: 11000 },
    { month: 'Jul', transactions: 14500 },
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

interface TransactionsChartProps {
    title: string;
}

const TransactionsChart: React.FC<TransactionsChartProps> = ({ title }) => {
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
                        tickFormatter={(value: number) => `${value / 1000}k`}
                        domain={[0, 15000]}
                        ticks={[0, 5000, 10000, 15000]}
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
                        dataKey="transactions"
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

export default TransactionsChart;

type DataItem = {
    label: string;
    amount: string;
    sublabel: string;
    growth: "positive" | "negative";
};

export type DataSet = DataItem[];

export const Today: DataSet = [
    {
        label: "Revenue",
        amount: "14K",
        sublabel: "-0.03%",
        growth: "negative"
    },
    {
        label: "Transaction",
        amount: "14K",
        sublabel: "-0.03%",
        growth: "negative",
    },
    {
        label: "Avg Transaction",
        amount: "$2K",
        sublabel: "+15.03%",
        growth: "positive",
    },
    {
        label: "Refunds",
        amount: "1K",
        sublabel: "+6.08%",
        growth: "positive",
    }
];

export const Week: DataSet = [
    {
        label: "Revenue",
        amount: "98K",
        sublabel: "+2.5%",
        growth: "positive"
    },
    {
        label: "Transaction",
        amount: "102K",
        sublabel: "+1.8%",
        growth: "positive",
    },
    {
        label: "Avg Transaction",
        amount: "$1.9K",
        sublabel: "-0.5%",
        growth: "negative",
    },
    {
        label: "Refunds",
        amount: "7K",
        sublabel: "-3.2%",
        growth: "positive",
    }
];

export const Month: DataSet = [
    {
        label: "Revenue",
        amount: "420K",
        sublabel: "+5.7%",
        growth: "positive"
    },
    {
        label: "Transaction",
        amount: "450K",
        sublabel: "+4.2%",
        growth: "positive",
    },
    {
        label: "Avg Transaction",
        amount: "$2.1K",
        sublabel: "+1.4%",
        growth: "positive",
    },
    {
        label: "Refunds",
        amount: "30K",
        sublabel: "-1.8%",
        growth: "positive",
    }
];

export const Year: DataSet = [
    {
        label: "Revenue",
        amount: "5.2M",
        sublabel: "+12.3%",
        growth: "positive"
    },
    {
        label: "Transaction",
        amount: "5.5M",
        sublabel: "+10.8%",
        growth: "positive",
    },
    {
        label: "Avg Transaction",
        amount: "$2.3K",
        sublabel: "+3.5%",
        growth: "positive",
    },
    {
        label: "Refunds",
        amount: "380K",
        sublabel: "-5.2%",
        growth: "positive",
    }
];


export interface RecentTransactionType {
    userName: string;
    region: string;
    status: string;
    amount: number;
    time: string;
}

export function fetchTransactionData(count: number): RecentTransactionType[] {
    const regions = ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania'];
    const statuses = ['Completed', 'Pending', 'Failed', 'Processing'];
    const firstNames = ['John', 'Jane', 'Mike', 'Emily', 'David', 'Sarah', 'Alex', 'Olivia'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];

    const transactions: RecentTransactionType[] = [];

    for (let i = 0; i < count; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const userName = `${firstName} ${lastName}`;

        const amount = parseFloat((Math.random() * 10000 + 10).toFixed(2));
        const date = new Date(Date.now() - Math.floor(Math.random() * 4*12*30 * 24 * 60 * 60 * 1000)); // Random date within last 4 years

        transactions.push({
            userName: userName,
            region: regions[Math.floor(Math.random() * regions.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            amount: amount,
            time: date.toISOString(),
        });
    }

    return transactions;
}


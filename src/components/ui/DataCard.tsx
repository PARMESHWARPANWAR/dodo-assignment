import { DecreaseIcon, IncreaseIcon } from "@/assets/icons/GrowthIcon";
import { cx } from "../../lib/utils";

function DataCard({
    className,
    label,
    amount,
    sublabel,
    growth,
}: {
    className?: string;
    label: string;
    amount?: string;
    sublabel?: string;
    growth: "positive" | "negative";
}) {
    return (
        <div
            className={cx(
                "px-5 py-6 rounded-2xl min-w-40",
                className
            )}
        >
            <h4 className="text-sm font-semibold">{label}</h4>
            <div className="mt-4 flex justify-between  items-center gap-6">
                <span className="text-3xl font-semibold">{amount}</span>
                <div className="flex gap-2 text-xs font-light">
                    <span>{sublabel}</span>
                    <span>
                        {growth === "positive" ? <IncreaseIcon /> : <DecreaseIcon />}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default DataCard;
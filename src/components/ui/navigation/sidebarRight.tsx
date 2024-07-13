'use client'
import { BugIcon, RadioIcon, User2Icon, X } from "lucide-react";

type RightSideBarProps = {
    notificationOpen: boolean;
    setNotificationOpen: (value: boolean) => void;
};
export function RightSideBar({
    notificationOpen,
    setNotificationOpen,
}: RightSideBarProps) {
    return (
        <>
            <aside className="w-72 hidden lg:flex border-l dark:bg-background-dark border-border dark:border-slate-800 overflow-y-auto">
                <RightSidebarView />
            </aside>
            {notificationOpen && (
                <div className="lg:hidden fixed h-full w-screen bg-black/80 z-40 inset-0 overflow-hidden transition-all">
                    <div className="h-full w-72 shadow-sm bg-[#f9fef0] dark:bg-[#004d40] overflow-y-auto float-right">
                        <RightSidebarView />
                        <button
                            onClick={() => setNotificationOpen(false)}
                            className="absolute top-[20px] right-[300px] rounded-full bg-background p-1 z-50 shadow-lg"
                        >
                            <X className="text-white" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

const NOTIFICATION_DATA = [
    {
        text: "You have an issue no",
        icon: BugIcon,
        datetime: "Just Now",
    },
    {
        text: "New team member got added",
        icon: User2Icon,
        datetime: "15 min ago",
    },
    {
        text: "John just subscribed ",
        icon: RadioIcon,
        datetime: "Today, 11:00 AM",
    },
];
const ACTIVITY_DATA = [
    {
        text: "Tax Report Changed",
        datetime: "Just Now",
    },
    {
        text: "Discount Details updated",
        datetime: "Yesertday, 5:00 PM",
    },
    {
        text: "Refuns cleared",
        datetime: "Feb 2, 2024",
    },
];
function RightSidebarView() {
    return (
        <div className="w-full h-full px-4 py-4">
            <div>
                <h3 className="text-sm font-semibold">Notifications</h3>
                <ul className="mt-4 space-y-4">
                    {NOTIFICATION_DATA.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <span className="p-1 bg-blue-100 rounded-lg">
                                <item.icon className="w-4 h-4 text-black/60" />
                            </span>
                            <div className="text-xs">
                                <p className="">{item.text}</p>
                                <span className="text-gray-400">{item.datetime}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-6">
                <h3 className="text-sm font-semibold">Activity</h3>
                <ul className="mt-4">
                    {ACTIVITY_DATA.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <div className="flex flex-col items-center gap-2">
                                <span className="inline-block p-1 bg-yellow-100 rounded-lg">
                                    <User2Icon className="w-4 h-4  text-black/60" />
                                </span>
                                {i < ACTIVITY_DATA.length - 1 && (
                                    <span className="block mb-2 w-[1.5px] h-5 rounded-lg bg-gray-300"></span>
                                )}
                            </div>
                            <div className="text-xs">
                                <p className="">{item.text}</p>
                                <span className="text-gray-400">{item.datetime}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

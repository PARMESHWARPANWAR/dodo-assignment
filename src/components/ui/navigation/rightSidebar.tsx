'use client'
import React from 'react';
import { cx } from '@/lib/utils';
import { Bug, Radio, Sparkles, UserRoundPlus, X } from 'lucide-react';

enum NotificationType {
    BUG = 'bug',
    FEATURE = 'feature',
    NEW_JOIN = 'new_join',
    BROADCAST = 'broadcast',
}

interface Activity {
    title: string;
    time: string;
    img: string;
}

type Notification = {
    title: string;
    time: string;
    type: NotificationType;
};

type ActivityProps = {
    activity: Activity;
};
type RightSideBarProps = {
    notificationOpen: boolean;
    setNotificationOpen: (value: boolean) => void;
};
type NotificationProps = {
    notification: Notification;
    index: number;
};

const CurrentActivities: Activity[] = [
    {
        title: 'Discount details updated',
        time: 'Just Now',
        img: '/3D05.png',
    },
    {
        title: 'Aman added a new product',
        time: '5 minutes ago',
        img: '/3D08.png',
    },
    {
        title: 'Refunds cleared',
        time: '12 hours ago',
        img: '/Female05.png',
    },
    {
        title: 'Tax report download complete',
        time: 'Today, 11:59 AM',
        img: '/Male11.png',
    },
    {
        title: 'Product details updated',
        time: 'Today, 11:59 AM',
        img: '/Male07.png',
    },
] as const;

export const CurrentNotifications = [
    {
        title: 'You have an issue that needs to be fixed.',
        time: 'Just Now',
        type: NotificationType.BUG,
    },
    {
        title: 'New team member joined',
        time: '5 minutes ago',
        type: NotificationType.NEW_JOIN,
    },
    {
        title: 'New product feature available',
        time: '12 hours ago',
        type: NotificationType.FEATURE,
    },
    {
        title: 'Andi Lane subscribed to you',
        time: 'Today, 11:59 AM',
        type: NotificationType.BROADCAST,
    },
] satisfies Notification[];

const Notification = ({ notification, index }: NotificationProps) => {
    const { title, time, type } = notification;

    const Icon = {
        [NotificationType.BUG]: Bug,
        [NotificationType.FEATURE]: Sparkles,
        [NotificationType.NEW_JOIN]: UserRoundPlus,
        [NotificationType.BROADCAST]: Radio,
    }[type];

    return (
        <div className="flex gap-4">
            <span
                className={cx('p-2 bg-[#E3F5FF] rounded-lg', {
                    'bg-[#E5ECF6]': index % 2 === 0,
                })}
            >
                <Icon size={24} strokeWidth={1} />
            </span>
            <div className="flex flex-col">
                <span title={title} className="text-sm line-clamp-1">
                    {title}
                </span>
                <span className="text-sm text-black/40">{time}</span>
            </div>
        </div>
    );
};


const ActivityItem: React.FC<ActivityProps> = React.memo(({ activity }) => {
    const { title, time, img } = activity;

    return (
        <>

            <div className="flex gap-4">
                <img className="w-10 rounded-full aspect-square" src={img} alt="avatar" />
                <div className="flex flex-col">
                    <span title={title} className="text-sm line-clamp-1">
                        {title}
                    </span>
                    <span className="text-sm text-black/40">{time}</span>
                </div>
            </div>  </>
    );
});

const RightSidebarView: React.FC = () => {
    return (
        <>
            <div className="w-full h-full px-4 py-4">
                <div className="flex flex-col gap-4">
                    <h1 className="text-sm font-semibold">Notifications</h1>
                    <div className="flex flex-col gap-4">
                        {CurrentNotifications.map((notification, index) => (
                            <Notification key={index} index={index} notification={notification} />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-sm font-semibold">Activities</h1>
                    <div className="flex flex-col gap-4">
                        {CurrentActivities.map((activity, index) => (
                            <ActivityItem key={index} activity={activity} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}


export function RightSideBar({
    notificationOpen,
    setNotificationOpen,
}: RightSideBarProps) {
    return (
        <>
            <aside className="w-80 hidden lg:flex border-l dark:bg-background-dark border-border dark:border-slate-800 overflow-y-auto">
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

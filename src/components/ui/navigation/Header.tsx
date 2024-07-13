'use client'
import { SidebarClose, SidebarOpen } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import { BellIcon } from "../../../assets/icons/BellIcon";
import { ClockIcon } from "../../../assets/icons/ClockIcon";
import { RocketIcon } from "../../../assets/icons/RocketIcon";
import { StartIcon } from "../../../assets/icons/StarIcon";
import { SunIcon } from "../../../assets/icons/SunIcon";
import MobileSidebar from "./MobileSidebar";
import { SearchBar } from "./SearchBar";
type HeaderProps = {
    notificationOpen: boolean;
    toggleNotificationSection: () => void;
};

export function Header({
    notificationOpen,
    toggleNotificationSection,
}: HeaderProps) {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme()
    const [pageName, setPageName] = useState('overview');
    const toggleDarkMode = () => {
        if (theme == 'dark') setTheme('light');
        else {
            setTheme('dark')
        }
    }

    useEffect(() => {
        const pagePath = pathname.split('/').filter(Boolean);
        setPageName(pagePath.length > 0 ? pagePath.join(' / ') : 'Home');
    }, [pathname]);

    return (
        <header className="border-b border-border dark:border-slate-800 py-3 px-2 grid grid-cols-[1fr_auto] gap-2 items-center  bg-background dark:bg-background-dark z-[100]">
            <div className="flex flex-col md:flex-row md:items-center">
                <div className="p-1 block md:hidden">
                    <MobileSidebar />
                </div>

                <div className="hidden text-xs font-normal md:flex items-center gap-3">
                    <RocketIcon />
                    <StartIcon />
                    <span className="inline text-gray-400">Pages</span>
                    <span className="inline capitalize"> {pageName} </span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <SearchBar />
                <button className="p-1" onClick={toggleDarkMode}>
                    <SunIcon />
                </button>
                <button className="p-1">
                    <ClockIcon />
                </button>
                <button className="p-1">
                    <BellIcon />
                </button>
                <button className="p-1" onClick={toggleNotificationSection}>
                    {notificationOpen ? (
                        <SidebarClose className="w-5 h-5 " />
                    ) : (
                        <SidebarOpen className="w-5 h-5" />
                    )}
                </button>
            </div>
        </header>
    );
}

'use client'
import { cx } from "@/lib/utils";
import { ChevronDown, ChevronRight, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

interface SidebarSectionProps {
    className?: string;
    name: string;
    children: ReactNode;
}

function SidebarSection({ className, name, children }: SidebarSectionProps) {
    return (
        <div className={className}>
            <h4 className="text-gray-400 text-sm">{name}</h4>
            <ul className="mt-2 flex flex-col space-y-0.5 select-none nav__list">
                {children}
            </ul>
        </div>
    );
}

interface SidebarNavItemProps {
    children?: ReactNode;
    icon?: ReactNode;
    label: string;
    to?: string;
    expand?: boolean;
    url?: string;
}

function SidebarNavItem({
    children,
    icon,
    label,
    to,
    url,
}: SidebarNavItemProps) {
    const pathname = usePathname();
    const isParentPath =
        children &&
        React.Children.toArray(children).some((child) => {
            if (React.isValidElement(child) && 'href' in child.props) {
                return pathname?.startsWith(child.props.href as string);
            }
            return false;
        });
    const [isOpen, setIsOpen] = useState(isParentPath);

    useEffect(() => {
        if (isParentPath) {
            setIsOpen(true);
        }
    }, [pathname, isParentPath]);

    const isActive = pathname === to;

    if (children) {
        return (
            <li className="relative cursor-pointer">
                <div
                    className="px-4 py-1  flex items-center gap-2 rounded-lg hover:bg-[#ebecec] dark:hover:bg-[#1e293b]"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <ChevronDown className="text-gray-400 w-4 h-4" />
                    ) : (
                        <ChevronRight className="text-gray-400 w-4 h-4" />
                    )}

                    {icon}
                    <span className="text-sm font-medium opacity-80 group-hover:opacity-100 transition-all">
                        {label}
                    </span>
                </div>
                {isOpen && (
                    <ul className="mt-1 flex flex-col space-y-0.5">{children}</ul>
                )}
            </li>
        );
    }
    if (url) {
        return (
            <li>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1 flex items-center gap-2 rounded-lg hover:bg-[#ebecec] dark:hover:bg-[#1e293b]"
                >
                    <LinkIcon className="text-gray-400 w-3 h-3" />
                    {icon}
                    <span className="text-sm font-medium opacity-80 group-hover:opacity-100 transition-all">
                        {label}
                    </span>
                </a>
            </li>
        );
    }
    return (
        <li>
            {to ? (
                <Link href={to} className={cx("block relative")}>
                    <div
                        className={`
    absolute left-0 inset-y-0 my-auto h-[20px] rounded-2xl bg-black dark:bg-blue-500 w-1 transition-all
    ${isActive ? 'visible' : 'invisible'}
     `}
                    ></div>
                    <div
                        className={`
                        px-4 py-1 flex items-center gap-2 rounded-lg hover:bg-[#ebecec] dark:hover:bg-[#1e293b]
                        ${isActive ? 'bg-[#ebecec] dark:bg-[#1e293b]' : ''}
                      `}
                    >
                        {icon}
                        <span className="text-sm font-medium opacity-80 group-hover:opacity-100 transition-all">
                            {label}
                        </span>
                    </div>
                </Link>
            ) : (
                <div className={cx("block relative")}>
                    <div className="px-4 py-1 pl-11 flex items-center gap-2 rounded-lg hover:bg-[#ebecec] dark:hover:bg-[#1e293b]">
                        {icon}
                        <span className="text-sm font-medium opacity-80 group-hover:opacity-100 transition-all">
                            {label}
                        </span>
                    </div>
                </div>
            )}
        </li>
    );
}

interface SidebarSubItemProps {
    label: string;
    to: string;
}

function SidebarSubItem({ label, to }: SidebarSubItemProps) {
    const pathname = usePathname();
    const isActive = pathname === to;
    return (
        <li>
            <Link href={to} className={cx("block relative")}>
                <div
                    className={`
    absolute left-0 inset-y-0 my-auto h-[20px] rounded-2xl bg-black dark:bg-blue-500 w-1 transition-all
    ${isActive ? 'visible' : 'invisible'}
     `}
                ></div>
                <div
                    className={`
                        px-4 py-1 flex items-center gap-2 rounded-lg hover:bg-[#ebecec] dark:hover:bg-[#1e293b]
                        ${isActive ? 'bg-[#ebecec] dark:bg-[#1e293b]' : ''}
                      `}
                >
                    <span className="ml-14 text-sm font-medium opacity-80 group-hover:opacity-100 transition-all">
                        {label}
                    </span>
                </div>
            </Link>
        </li>
    );
}

SidebarSection.Item = SidebarNavItem;
SidebarSection.SubItem = SidebarSubItem;
export default SidebarSection;
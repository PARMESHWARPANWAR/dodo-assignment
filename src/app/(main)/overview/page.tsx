"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/Dropdown"
import DataCard from '@/components/ui/DataCard'
import RevenueChart from '@/components/ui/RevenueChart'
import TransactionsBarChart from '@/components/ui/TransactionsBarChart'
import TransactionsChart from '@/components/ui/TransactionsChart'
import TransactionVolumePieChart from '@/components/ui/TransactionVolumePieChart'
import { RiArrowDownSLine } from "@remixicon/react"
import { useState } from 'react'
export type PeriodValue = "previous-period" | "last-year" | "no-comparison"
export type KpiEntry = {
  title: string
  percentage: number
  current: number
  allowed: number
  unit?: string
}
export type KpiEntryExtended = Omit<
  KpiEntry,
  "current" | "allowed" | "unit"
> & {
  value: string
  color: string
}

export default function Overview() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Today');

  const options = ['Today', 'Month', 'Year'];
  return (
    <>
      <section>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger
            className="flex scroll-mt-10 w-32 px-4 text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50 mb-4 focus:outline-none"
          >
            {selectedValue}
            <RiArrowDownSLine
              className={`ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="focus:outline-none"
          >
            {options.map((option) => (
              <DropdownMenuItem className="focus:outline-none"
                key={option}
                onSelect={() => {
                  setSelectedValue(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-4 gap-6 text-foreground">
          <DataCard
            className="bg-[#f9fef0] dark:bg-[#004d40] dark:text-gray-200"
            label="Revenue"
            amount="$24M"
            sublabel="11.01%"
            growth="positive"
          />
          <DataCard
            className="bg-[#DBE6f2] dark:bg-[#1E3A5F] dark:text-gray-200"
            label="Transaction"
            amount="14K"
            sublabel="-0.03%"
            growth="negative"
          />
          <DataCard
            className="bg-[#f9fef0] dark:bg-[#004d40] dark:text-gray-200"
            label="Avg Transaction"
            amount="$2K"
            sublabel="+15.03%"
            growth="positive"
          />
          <DataCard
            className="bg-[#DBE6f2] dark:bg-[#1E3A5F] dark:text-gray-200"
            label="Refunds"
            amount="1K"
            sublabel="+6.08%"
            growth="positive"
          />
        </div>

        <div className="mt-6 w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart title={'Revenue'} />
          <TransactionsChart title={"Number of Transactions"} />
          <TransactionsBarChart title="Transaction value by Referrer (in $)" />
          <TransactionVolumePieChart title="% Transaction value by Location" />
        </div>
      </section>
    </>
  )
}

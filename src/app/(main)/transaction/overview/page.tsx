'use client'
import React, { useEffect, useState } from 'react';
import { RiSearchLine, RiArrowDownSLine, RiArrowUpSLine, RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  ColumnDef,
  SortingState,
  FilterFn,
  Header,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow
} from '@tremor/react';

import dayjs from 'dayjs';

import { fetchTransactionData, RecentTransactionType } from '@/data/overview'

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

type WorkspaceColumnMeta = {
  align?: 'text-left' | 'text-center' | 'text-right';
};


type WorkspaceColumnDef = ColumnDef<RecentTransactionType, unknown> & {
  meta?: WorkspaceColumnMeta;
};
interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'middle';
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled = false, children, position = 'middle' }) => {
  return (
    <button
      type="button"
      className={
        `${position === 'left' ? 'rounded-l-tremor-small ' : " "} ${position === 'right' ? ' -ml-px rounded-r-tremor-small ' : " "} group p-2 text-tremor-default ring-1 ring-inset ring-tremor-ring hover:bg-tremor-background-muted disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent dark:ring-dark-tremor-ring hover:dark:bg-dark-tremor-background disabled:hover:dark:bg-transparent`
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

type Status = 'Completed' | 'Pending' | 'Failed' | 'Processing' | string;

interface StatusBadgeProps {
  status: Status;
}

const getStatusStyles = (status: Status): string => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'Failed':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'Processing':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyles(status)}`}>
      {status}
    </span>
  );
};

const workspacesColumns: WorkspaceColumnDef[] = [
  {
    header: 'User',
    accessorKey: 'userName',
    enableSorting: true,
    meta: {
      align: 'text-center',
    },
  },
  {
    header: 'Region',
    accessorKey: 'region',
    enableSorting: true,
    meta: {
      align: 'text-center',
    },
  },
  {
    header: 'Status',
    accessorKey: 'status',
    enableSorting: false,
    meta: {
      align: 'text-center',
    },
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    header: 'Amount',
    accessorKey: 'amount',
    enableSorting: true,
    meta: {
      align: 'text-center',
    },
  },
  {
    header: 'Time',
    accessorKey: 'time',
    enableSorting: false,
    meta: {
      align: 'text-center',
    },
    cell: ({ row }) => {
      const time = dayjs(row.original.time);
      return (
        <div className="flex flex-col items-center">
          <span className="font-sm">{time.format('MMM D, YYYY')}</span>
          <span className="text-xs text-gray-500">{time.format('h:mm A')}</span>
        </div>
      );
    },
  }
];

function getAriaSortAttribute(header: Header<RecentTransactionType, unknown>): "none" | "ascending" | "descending" | undefined {
  if (!header.column.getCanSort()) {
    return undefined;
  }
  const sortDirection = header.column.getIsSorted();
  if (sortDirection === false) {
    return "none";
  }
  return sortDirection === "asc" ? "ascending" : "descending";
}

const fuzzyFilter: FilterFn<RecentTransactionType> = (row, columnId, value) => {
  const itemValue = row.getValue(columnId);
  
  if (typeof itemValue === 'number') {
    return itemValue.toString().toLowerCase().includes(value.toLowerCase());
  }
  
  if (typeof itemValue === 'string') {
    return itemValue.toLowerCase().includes(value.toLowerCase());
  }
  
  return false;
};

const SearchBar: React.FC<{ value: string; onChange: (value: string) => void }> = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-md mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search transactions..."
        className="w-full pl-10 pr-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-blue-600"
      />
      <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
    </div>
  );
};

export default function RecentTransaction() {
  const pageSize = 8;
  const [data, setData] = useState<RecentTransactionType[]>([]);
  const [globalFilter, setGlobalFilter] = useState<string>('');

  const [sorting, setSorting] = useState<SortingState>([
    { id: 'userName', desc: false },
  ]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSize,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchTransactionData(200);
        setData(result);
      } catch (err) {
        console.log('Error:', err)
      }
    };

    fetchData();
  }, []);

  const table = useReactTable({
    data: data,
    columns: workspacesColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      pagination,
      globalFilter,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong mb-2 sm:mb-0">
          Recent Transactions
        </h3>
        <SearchBar value={globalFilter ?? ''} onChange={setGlobalFilter} />
      </div>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-b border-tremor-border dark:border-dark-tremor-border"
            >
              {headerGroup.headers.map((header) => {
                const toggleSortingHandler = header.column.getToggleSortingHandler();
                return (
                  <TableHeaderCell
                    key={header.id}
                    onClick={toggleSortingHandler}
                    onKeyDown={(event: React.KeyboardEvent) => {
                      if (event.key === 'Enter' && toggleSortingHandler) {
                        toggleSortingHandler(event);
                      }
                    }}
                    className={classNames(
                      header.column.getCanSort()
                        ? 'cursor-pointer select-none'
                        : '',
                      'px-0.5 py-1.5'
                    )}
                    tabIndex={header.column.getCanSort() ? 0 : -1}
                    aria-sort={getAriaSortAttribute(header)}
                  >
                    <div
                      className={classNames(
                        header.column.columnDef.enableSorting === true
                          ? 'flex items-center justify-evenly'
                          : (header.column.columnDef as WorkspaceColumnDef).meta?.align || '',
                        'rounded-tremor-default px-3 py-1.5'
                      )}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() ? (
                        <div className="-space-y-2">
                          <RiArrowUpSLine
                            className={classNames(
                              'size-4 text-tremor-content-strong dark:text-dark-tremor-content-strong',
                              header.column.getIsSorted() === 'desc'
                                ? 'opacity-30'
                                : ''
                            )}
                            aria-hidden={true}
                          />
                          <RiArrowDownSLine
                            className={classNames(
                              'size-4 text-tremor-content-strong dark:text-dark-tremor-content-strong',
                              header.column.getIsSorted() === 'asc'
                                ? 'opacity-30'
                                : ''
                            )}
                            aria-hidden={true}
                          />
                        </div>
                      ) : null}
                    </div>
                  </TableHeaderCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={(cell.column.columnDef as WorkspaceColumnDef).meta?.align}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-10 flex items-center justify-between">
        <p className="text-tremor-default tabular-nums text-tremor-content dark:text-dark-tremor-content">
          Page{' '}
          <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {`${pagination.pageIndex + 1}`}
          </span>{' '}
          /
          <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {' '}
            {`${table.getPageCount()}`}
          </span>
        </p>
        <div className="inline-flex items-center rounded-tremor-small shadow-tremor-input dark:shadow-dark-tremor-input">
          <Button
            position="left"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Previous</span>
            <RiArrowLeftSLine
              className="size-5 text-tremor-content-emphasis group-hover:text-tremor-content-strong dark:text-dark-tremor-content-emphasis group-hover:dark:text-dark-tremor-content-strong"
              aria-hidden={true}
            />
          </Button>
          <Button
            position="right"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Next</span>
            <RiArrowRightSLine
              className="size-5 text-tremor-content-emphasis group-hover:text-tremor-content-strong dark:text-dark-tremor-content-emphasis group-hover:dark:text-dark-tremor-content-strong"
              aria-hidden={true}
            />
          </Button>
        </div>
      </div>
    </div>

  );
}
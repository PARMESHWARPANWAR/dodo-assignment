'use client'
import React from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from '@remixicon/react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
  SortingState,
  Header,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

// Define a custom type for the column meta data
type WorkspaceColumnMeta = {
  align?: 'text-left' | 'text-center' | 'text-right';
};

// Use the custom meta type in the ColumnDef
type WorkspaceColumnDef = ColumnDef<Workspace, unknown> & {
  meta?: WorkspaceColumnMeta;
};

interface Workspace {
  userName: string;
  region: string;
  transactionStatus: string;
  transactionAmount: string | number;
  transactionTime: string;
}

const workspaces: Workspace[] = [
  {
    userName: "Emma Johnson",
    region: "North America",
    transactionStatus: "Completed",
    transactionAmount: 250.75,
    transactionTime: "2024-07-14 09:30:15"
  },
  {
    userName: "Liam Chen",
    region: "Asia",
    transactionStatus: "Pending",
    transactionAmount: 1000.00,
    transactionTime: "2024-07-14 10:45:30"
  },
  {
    userName: "Sophia Rodriguez",
    region: "South America",
    transactionStatus: "Failed",
    transactionAmount: 75.50,
    transactionTime: "2024-07-14 11:15:45"
  },
  {
    userName: "Oliver Schmidt",
    region: "Europe",
    transactionStatus: "Completed",
    transactionAmount: 500.25,
    transactionTime: "2024-07-14 12:20:00"
  },
  {
    userName: "Ava Patel",
    region: "Asia",
    transactionStatus: "Completed",
    transactionAmount: 150.00,
    transactionTime: "2024-07-14 13:35:20"
  },
  {
    userName: "Noah Kim",
    region: "Asia",
    transactionStatus: "Pending",
    transactionAmount: 300.75,
    transactionTime: "2024-07-14 14:50:10"
  },
  {
    userName: "Isabella Müller",
    region: "Europe",
    transactionStatus: "Completed",
    transactionAmount: 450.50,
    transactionTime: "2024-07-14 15:05:40"
  },
  {
    userName: "Ethan Brown",
    region: "North America",
    transactionStatus: "Failed",
    transactionAmount: 50.25,
    transactionTime: "2024-07-14 16:25:55"
  },
  {
    userName: "Mia Tanaka",
    region: "Asia",
    transactionStatus: "Completed",
    transactionAmount: 700.00,
    transactionTime: "2024-07-14 17:40:30"
  },
  {
    userName: "Lucas Garcia",
    region: "Europe",
    transactionStatus: "Pending",
    transactionAmount: 225.75,
    transactionTime: "2024-07-14 18:55:15"
  }
];

const workspacesColumns: WorkspaceColumnDef[] = [
  {
    header: 'User',
    accessorKey: 'userName',
    enableSorting: true,
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Region',
    accessorKey: 'region',
    enableSorting: true,
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Status',
    accessorKey: 'transactionStatus',
    enableSorting: false,
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Amount',
    accessorKey: 'transactionAmount',
    enableSorting: true,
    meta: {
      align: 'text-right',
    },
  },
  {
    header: 'Time',
    accessorKey: 'transactionTime',
    enableSorting: false,
    meta: {
      align: 'text-right',
    },
  }
];

function getAriaSortAttribute(header: Header<Workspace, unknown>): "none" | "ascending" | "descending" | undefined {
  if (!header.column.getCanSort()) {
    return undefined;
  }
  const sortDirection = header.column.getIsSorted();
  if (sortDirection === false) {
    return "none";
  }
  return sortDirection === "asc" ? "ascending" : "descending";
}

export default function Example() {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'workspace', desc: false },
  ]);

  const table = useReactTable({
    data: workspaces,
    columns: workspacesColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
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
                        ? 'flex items-center justify-between gap-2 hover:bg-tremor-background-muted hover:dark:bg-dark-tremor-background-muted'
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
  );
}
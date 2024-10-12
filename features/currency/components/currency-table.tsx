"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCurrenciesQuery } from "../api/currency-api";
import { ErrorComponent } from "@/components/error";
import { mapCurrencyToTableValues } from "../convert-base-currency";
import { getCookies } from "@/lib/cookies";

export const columns: ColumnDef<{
  currency: string;
  value: number;
  date: string;
}>[] = [
  {
    accessorKey: "currency",
    header: ({ column }) => {
      return (
        <Button
          data-testid="sort-currency-button"
          variant="ghost"
          onClick={() => {
            column.toggleSorting(
              column.getIsSorted() === "asc" || !column.getIsSorted()
            );
          }}
        >
          Moeda
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("currency")}</div>;
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return (
        <Button
          data-testid="sort-rate-button"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor (em BRL)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-left">
        {Intl.NumberFormat("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(row.getValue("value"))}
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Horário
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {new Date(row.getValue("date")).toDateString()}
        </div>
      );
    },
  },
];

export function CurrencyTable() {
  const { data, isError, isSuccess, refetch, isFetching } =
    useGetCurrenciesQuery();

  console.log(getCookies(document.cookie));

  const memoizedData = React.useMemo(() => {
    return mapCurrencyToTableValues(data!);
  }, [data]);

  const table = useReactTable({
    data: memoizedData || [],
    columns,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table className="h-16">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} id={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.getValue("currency")}
                  id={row.getValue("currency")}
                  data-testid={row.getValue("currency")}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      data-testid={`${row.getValue(
                        "currency"
                      )}-${cell.getValue()}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <>
                {isSuccess && (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Sem Resultados
                    </TableCell>
                  </TableRow>
                )}
                {isFetching && (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                      data-testid="loading-table"
                    >
                      Carregando
                    </TableCell>
                  </TableRow>
                )}
                {isError && (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      <ErrorComponent
                        dataTestid="load-table-error"
                        description="Ocorreu um erro ao carregar as informações, por favor tente novamente"
                        title="Falha ao carregar as informações"
                        onRetry={() => {
                          refetch();
                        }}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            data-testid="previous-button"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            data-testid="next-button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

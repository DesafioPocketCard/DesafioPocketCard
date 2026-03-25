"use client";

import React from "react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CircleQuestionMark, ChevronLeft, ChevronRight, Loader2, Search } from "lucide-react";
import { ITableProps } from "./types";
import { 
  Table as TableUi, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import accessObjectByString from "@/utils/accessObjectByString";

export default function Table<T>({
  title,
  data,
  columns,
  actions,
  hideActions,
  hidePagination = false,
  loading,
  pagination,
  emptyMessage,
  onChangePage,
  handleRowStatus = () => undefined,
}: ITableProps<T>) {
  
  const renderCellContent = (row: T, column: any) => {
    const value = accessObjectByString(row as Record<string, any>, column.field);
    
    if (column.format) {
      return column.format(value, row);
    }

    switch (column.type) {
      case "date": {
        if (!value) return "Não informado";
        const date = typeof value === "string" ? parseISO(value) : value;
        return format(date, "dd/MM/yyyy", { locale: ptBR });
      }
      
      case "date-hour": {
        if (!value) return "Não informado";
        const dateTime = typeof value === "string" ? parseISO(value) : value;
        return format(dateTime, "dd/MM/yyyy HH:mm", { locale: ptBR });
      }
      
      case "boolean":
        return value ? "Sim" : "Não";
      
      case "number":
      case "string":
      case "select":
      default:
        return value?.toString() || "";
    }
  };

  return (
    <Card className="flex flex-col w-full overflow-hidden border-border/50 bg-white shadow-xl animate-in">
      <div className="p-6 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40">
        {title && (
          <h2 className="text-xl font-black text-gray-900 tracking-tight lowercase first-letter:uppercase">
            {title}
          </h2>
        )}
        {loading && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/10">
            <Loader2 className="animate-spin size-3" />
            Sincronizando
          </div>
        )}
      </div>

      <div className="relative overflow-x-auto custom-scrollbar">
        <TableUi>
          <TableHeader>
            <TableRow className="hover:bg-transparent bg-gray-50/50">
              {columns.map((column) => (
                <TableHead 
                  key={column.field} 
                  className={cn("whitespace-nowrap font-black text-[10px] tracking-widest uppercase py-4" )}
                  style={{ textAlign: column.alignHead as any || "left" }}
                >
                  {column.label}
                </TableHead>
              ))}
              {!hideActions && !!actions?.length && (
                <TableHead className="text-center font-black text-[10px] tracking-widest uppercase">Ações</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && !data?.length ? (
              <TableRow>
                <TableCell colSpan={columns.length + (hideActions ? 0 : 1)} className="h-64 text-center">
                  <div className="flex flex-col items-center gap-4 animate-pulse">
                     <div className="relative">
                        <RefreshCw className="animate-spin text-primary-200" size={48} strokeWidth={1} />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="size-4 bg-primary rounded-full" />
                        </div>
                     </div>
                     <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Alinhando dados…</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : !data?.length ? (
              <TableRow>
                <TableCell colSpan={columns.length + (hideActions ? 0 : 1)} className="h-48 text-center">
                   <div className="flex flex-col items-center gap-3 opacity-30">
                      <Search size={40} />
                      <p className="text-sm font-bold uppercase tracking-widest">{emptyMessage || "Vazio"}</p>
                   </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow 
                  key={`row-${rowIndex}`} 
                  className={cn(
                    "group transition-all duration-300",
                    handleRowStatus(row)
                  )}
                >
                  {columns.map((column) => (
                    <TableCell 
                      key={column.field}
                      style={{ textAlign: column.alignRow as any || "left" }}
                      className="text-[13px] font-bold text-gray-700 py-4"
                    >
                      {renderCellContent(row, column)}
                    </TableCell>
                  ))}
                  {!hideActions && (
                    <TableCell className="text-center py-2 px-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        {actions?.map((action, idx) => (
                          <Button 
                            key={`action-${idx}`}
                            variant="ghost" 
                            size="icon" 
                            disabled={action.disabled?.(row, rowIndex)}
                            onClick={() => action.onClick(row, rowIndex)}
                            className="size-9 rounded-xl hover:bg-primary-50 hover:text-primary transition-all active:scale-90"
                            title={action.label}
                          >
                            {action.icon ? (
                              <span className="size-4 shrink-0">{action.icon as any}</span>
                            ) : (
                              <CircleQuestionMark className="size-4" />
                            )}
                          </Button>
                        ))}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </TableUi>
      </div>

      {!hidePagination && pagination && onChangePage && (
        <div className="p-4 sm:p-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/30">
          <div className="flex items-center gap-2 sm:gap-4 order-2 sm:order-1">
             <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
               Página {pagination.currentPage} de {Math.ceil((pagination.totalItems || 0) / (pagination.limit || 1))}
             </p>
          </div>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <Button
              variant="outline"
              size="icon"
              disabled={pagination.currentPage === 1 || loading}
              onClick={() => onChangePage({ ...pagination, currentPage: pagination.currentPage! - 1 })}
              className="rounded-xl size-10"
            >
              <ChevronLeft size={18} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={pagination.currentPage === Math.ceil((pagination.totalItems || 0) / (pagination.limit || 1)) || loading}
              onClick={() => onChangePage({ ...pagination, currentPage: pagination.currentPage! + 1 })}
              className="rounded-xl size-10"
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

const RefreshCw = ({ className, size, strokeWidth }: { className?: string; size?: number; strokeWidth?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth || 2} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);

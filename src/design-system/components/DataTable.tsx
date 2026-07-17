import React from 'react';
import { Card } from '../components/Card';

interface Column {
  key: string;
  header: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
}

export const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
  return (
    <Card variant="outline" className="overflow-hidden p-0 border-border-light">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-secondary uppercase bg-surface-hover border-b border-border-light">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={`px-4 py-3 font-semibold ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : ''}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-border-light hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className={`px-4 py-3 text-primary ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : ''}`}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <div className="p-4 text-center text-muted">No data available</div>
        )}
      </div>
    </Card>
  );
};

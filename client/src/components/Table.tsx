import React from "react";

const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string }[];
  renderRow: (items: any) => React.ReactNode;
  data: any[];
}) => {
  // Limit the number of rows to 7
  const limitedData = data.slice(0, 7);

  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left text-xs font-semibold text-gray-500">
          {columns.map((column) => (
            <th key={column.accessor}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{limitedData.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;

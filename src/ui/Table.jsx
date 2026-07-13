import PropTypes from "prop-types";

const Table = ({
  columns = [],
  data = [],
  emptyMessage = "No records found",
  className = "",
  footer,
}) => {
  return (
    <div className={`overflow-x-auto rounded-xl border border-border shadow-sm ${className}`}
    >
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-surface">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className={`px-4 py-3 text-sm font-semibold text-text-primary ${
                  column.align || "text-left"
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-border bg-white">
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={row.id || index} className="hover:bg-surface/50">
                {columns.map((column) => (
                  <td
                    key={column.accessor}
                    className={`px-4 py-3 text-sm text-text-secondary ${
                      column.align || "text-left"
                    }`}
                  >
                    {column.render
                      ? column.render(row)
                      : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-6 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>

        {footer && data.length > 0 && (
          <tfoot className="border-t border-border bg-surface">
            <tr>{footer}</tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  emptyMessage: PropTypes.string,
  className: PropTypes.string,
  footer: PropTypes.node,
};

export default Table;
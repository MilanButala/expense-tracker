import React, { useState } from 'react'
import Button from '../../ui/Button'
import Table from '../../ui/Table'
import { formatCurrency } from '../../utils/helper'
import FilterBar from './FilterBar'
import { useExpenses } from '../../context/ExpenseContext'
import Modal from '../../ui/Modal'
import CreateExpenses from './CreateExpenses'

const ViewExpenses = () => {
  const { expenses, categories, removeExpense } = useExpenses();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    search: "",
    category: "",
    from: "",
    to: "",
  });

  const filteredExpenses = expenses.filter((expense) => {
    // console.log("filtering expense:", expense.note, "date:", expense.date, "activeFilters:", activeFilters);

    // 1. Filter by Search Query (matching note)
    if (activeFilters.search) {
      const term = activeFilters.search.toLowerCase();
      const noteMatch = expense.note?.toLowerCase().includes(term);
      if (!noteMatch) return false;
    }

    // 2. Filter by Category
    if (activeFilters.category) {
      if (expense.category?.toLowerCase() !== activeFilters.category.toLowerCase()) {
        return false;
      }
    }

    // 3. Filter by Date range From and To
    const itemDate = expense.date || expense.expenseDate;
    if (itemDate) {
      const dateStr = itemDate.substring(0, 10);
      if (activeFilters.from && dateStr < activeFilters.from) {
        return false;
      }
      if (activeFilters.to && dateStr > activeFilters.to) {
        return false;
      }
    }

    return true;
  });

  const columns = [
    {
      header: "Date",
      accessor: "date",
      align: "text-left",
    },
    {
      header: "Category",
      accessor: "category",
      align: "text-left",
      render: (row) => {
        //console.log(row.category.toLowerCase());
        const category = categories.find(
          (item) => item.slug.toLowerCase() === row.category.toLowerCase()
        );

        return (
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{
                backgroundColor: category?.swatch || "#ccc",
              }}
            />
            <span>{category?.label || row.category}</span>
          </div>
        );
      },
    },
    {
      header: "Note",
      accessor: "note",
      align: "text-left",
    },
    {
      header: "Amount",
      accessor: "amount",
      align: "text-center",
      render: (row) => formatCurrency(row.amount),
    },
    {
      header: "Actions",
      accessor: "actions",
      align: "text-right",
      render: (row) => (
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="accent" onClick={() => {
            setSelectedExpense(row);
            setIsOpen(true);
          }}>
            Edit
          </Button>
          <Button size="sm" variant="danger" onClick={() => removeExpense(row.id)}>
            Delete
          </Button>
        </div>
      ),
    }
  ];

  return (
    <>
      <FilterBar onFilterChange={setActiveFilters} />
      <Table className="mt-10" columns={columns} data={filteredExpenses} footer={
        <>
          <td
            colSpan={3}
            className="px-4 py-3 font-semibold"
          >
            {filteredExpenses.length} entries shown
          </td>

          <td className="px-4 py-3 text-center font-bold">
            {formatCurrency(filteredExpenses.reduce((accum, currant) => accum + currant.amount, 0))}
          </td>

          <td></td>
        </>
      } />
      <Modal
        isOpen={isOpen}
        title="Edit Expense"
        onClose={() => setIsOpen(false)}
      >
        <CreateExpenses
          expense={selectedExpense}
          onClose={() => setIsOpen(false)}
        />
      </Modal>
    </>
  )
}

export default ViewExpenses

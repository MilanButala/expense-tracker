import React, { useState } from 'react'
import Card from '../../ui/Card'
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
  // console.log(expenses);
  // console.log(categories);

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
          <Button size="sm" variant="outline" onClick={() => {
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
      <FilterBar />
      <Table className="mt-10" columns={columns} data={expenses} footer={
        <>
          <td
            colSpan={3}
            className="px-4 py-3 font-semibold"
          >
            {expenses.length} entries shown
          </td>

          <td className="px-4 py-3 text-center font-bold">
            {formatCurrency(expenses.reduce((accum, currant) => accum + currant.amount, 0))}
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

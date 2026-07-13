import React from 'react'
import Card from '../../ui/Card'
import Button from '../../ui/Button'
import Table from '../../ui/Table'
import { formatCurrency } from '../../utils/helper'
import FilterBar from './FilterBar'

const viewExpenses = () => {

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
      // render: (row) => {
      //   const category = categories?.find(
      //     (item) => item.id === row.category
      //   );

      //   return (
      //     <div className="flex items-center gap-2">
      //       <span
      //         className="h-3 w-3 rounded-full"
      //         style={{ backgroundColor: category?.swatch }}
      //       />
      //       <span>{category?.label}</span>
      //     </div>
      //   );
      // }
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
          <Button size="sm" variant="outline">
            Edit
          </Button>
          <Button size="sm" variant="danger">
            Delete
          </Button>
        </div>
      ),
    }
  ];

  const expenses = [
    {
      id: 1,
      date: "11 Jul 2026",
      category: "Travel",
      note: "Uber Ride",
      amount: 450,
      createdAt: "2026-07-10T08:39:53.832Z"
    },
    {
      id: 2,
      date: "10 Jul 2026",
      category: "Food",
      note: "Dinner",
      amount: 850,
      createdAt: "2026-07-10T08:39:53.832Z"
    },
    {
      id: 3,
      date: "09 Jul 2026",
      category: "Shopping",
      note: "T-Shirt",
      amount: 1299,
      createdAt: "2026-07-10T08:39:53.832Z"
    },
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
    </>
  )
}

export default viewExpenses

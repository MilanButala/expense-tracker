import React from 'react'
import PageTitle from '../ui/PageTitle'
import ViewExpenses from '../features/expenses/ViewExpenses'

const Expenses = () => {
  return (
    <>
      <PageTitle
        title="Expenses"
        subTitle="Every entry, in order. Filter, edit, or strike a line."
      />
      <div className="bg-lightgray dark:bg-gray-400 p-6 rounded-2xl">
        <ViewExpenses />
      </div>
    </>
  )
}

export default Expenses

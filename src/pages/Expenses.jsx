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
      <ViewExpenses />
    </>
  )
}

export default Expenses

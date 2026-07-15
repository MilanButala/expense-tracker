import React from 'react'
import PageTitle from '../ui/PageTitle'
import CreateExpenses from '../features/expenses/CreateExpenses'
import Card from '../ui/Card'

const AddExpenses = () => {
  return (
    <>
      <PageTitle
        title="Add an expense"
        subTitle="Log it while it's fresh. It lands at the top of the ledger."
      />
      <div className="bg-lightgray dark:bg-gray-400 p-6 rounded-2xl">
        <Card>
          <CreateExpenses />
        </Card>
      </div>
    </>
  )
}

export default AddExpenses

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
      <Card>
        <CreateExpenses />
      </Card>
    </>
  )
}

export default AddExpenses

import React, { useState } from 'react'
import PageTitle from '../ui/PageTitle'
import CardSmall from '../ui/CardSmall'
import Card from '../ui/Card'
import { formatCurrency } from '../utils/helper'
import ExpenseBreakdown from '../ui/ExpenseBreakdown'
import BudgetProgress from '../features/budget/BudgetProgress'

const Dashboard = () => {
  const [budget, setBudget] = useState(1500);

  const breakdown = [
    {
      id: "travel",
      label: "Travel",
      swatch: "#2F7A6B",
      amount: 466,
    },
    {
      id: "rent",
      label: "Rent",
      swatch: "#5B4636",
      amount: 344,
    },
    {
      id: "shopping",
      label: "Shopping",
      swatch: "#C9A227",
      amount: 344,
    },
  ];
  return (
    <>
      <PageTitle
        title="Dashboard"
        subTitle="Where your money has been going."
      />

      <div className="flex gap-6 flex-col">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="md:w-1/3">
            <CardSmall title="Total logged" className="h-full">
              <p className="text-2xl font-bold text-accent">{formatCurrency(464)}</p>
            </CardSmall>
          </div>
          <div className="md:w-1/3">
            <CardSmall title="This month" className="h-full">
              <p className="text-2xl font-bold text-accent">{formatCurrency(464)}</p>
            </CardSmall>
          </div>
          <div className="md:w-1/3" >
            <CardSmall title="Top category this month" className="h-full">
              <div className="flex items-center gap-3">
                <span className="h-4 w-4 rounded-full" style={{ backgroundColor: 'rgb(47, 122, 107)' }}></span>
                <div>
                  <h4 className="font-medium text-text-primary">Travel</h4>
                </div>
              </div>

            </CardSmall>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          <div className="md:w-1/2">
            <Card title="Spend by category" className="h-full">
              <ExpenseBreakdown data={breakdown} />
            </Card>
          </div>
          <div className="md:w-1/2">
            <Card title="Monthly budget" className="h-full">
              <BudgetProgress
                budget={budget}
                spent={breakdown.reduce((sum, item) => sum + item.amount, 0)}
                onSave={setBudget}
              />
            </Card>
          </div>
        </div>
      </div>

    </>
  )
}

export default Dashboard

import React, { useState, useMemo } from 'react'
import PageTitle from '../ui/PageTitle'
import CardSmall from '../ui/CardSmall'
import Card from '../ui/Card'
import { formatCurrency, isSameMonth } from '../utils/helper'
import ExpenseBreakdown from '../ui/ExpenseBreakdown'
import BudgetProgress from '../features/budget/BudgetProgress'
import { useExpenses } from '../context/ExpenseContext'

const Dashboard = () => {
  const [budget, setBudget] = useState(1500);
  const { expenses, categories } = useExpenses();

  const totalSpend = useMemo(() => {
    return expenses.reduce((acc, current) => acc + current.amount, 0);
  }, [expenses]);

  const monthSpend = useMemo(
    () =>
      expenses
        .filter((e) => isSameMonth(e.date))
        .reduce((sum, e) => sum + (Number(e.amount) || 0), 0),
    [expenses]
  );

  const categoryTotals = useMemo(() => {
    const totals = {};
    for (const e of expenses) {
      totals[e.category] = (totals[e.category] || 0) + (Number(e.amount) || 0);
    }
    return totals;
  }, [expenses]);

  // console.log('categoryTotals',categoryTotals);

  const topCategory = useMemo(() => {
    const entries = Object.entries(categoryTotals);
    if (entries.length === 0) return null;
    return entries.reduce((best, cur) => (cur[1] > best[1] ? cur : best))[0];
  }, [categoryTotals]);

  //console.log('topCategory', topCategory);

  const topCategoryData = useMemo(() => {
    if (!topCategory) return null;

    return categories.find(
      (item) => item.slug === topCategory
    );
  }, [topCategory, categories]);

  //console.log(topCategoryData)

  const categoryBreakdown = useMemo(() => categories.map((category) => ({
    ...category,
    amount: categoryTotals[category.slug] || 0,
  }))
    .filter((category) => category.amount > 0)
    .sort((a, b) => b.amount - a.amount), [categoryTotals, categories]);
  //console.log(categoryBreakdown)
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
              <p className="text-2xl font-bold text-accent">{formatCurrency(totalSpend)}</p>
            </CardSmall>
          </div>
          <div className="md:w-1/3">
            <CardSmall title="This month" className="h-full">
              <p className="text-2xl font-bold text-accent">{formatCurrency(monthSpend)}</p>
            </CardSmall>
          </div>
          <div className="md:w-1/3" >
            <CardSmall title="Top category this month" className="h-full">
              {topCategoryData && (
                <div className="flex items-center gap-3">
                  <span className="h-4 w-4 rounded-full" style={{ backgroundColor: topCategoryData?.swatch }}></span>
                  <div>
                    <h4 className="font-medium text-text-primary">{topCategoryData?.label}</h4>
                  </div>
                </div>
              )}
            </CardSmall>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          <div className="md:w-1/2">
            <Card title="Spend by category" className="h-full">
              <ExpenseBreakdown data={categoryBreakdown} />
            </Card>
          </div>
          <div className="md:w-1/2">
            <Card title="Monthly budget" className="h-full">
              <BudgetProgress
                budget={budget}
                spent={categoryBreakdown.reduce((sum, item) => sum + item.amount, 0)}
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

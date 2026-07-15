import React from 'react'
import PageTitle from '../ui/PageTitle'
import CreateCategory from '../features/categories/CreateCategory'
import ActiveTags from '../features/categories/ActiveTags'

const Categories = () => {
  return (
    <>
      <PageTitle
        title="Categories"
        subTitle="Manage expense tags and personalize colors."
      />
      <div className="bg-lightgray dark:bg-gray-400 p-6 rounded-2xl">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="lg:w-1/2">
            <CreateCategory />
          </div>
          <div className="lg:w-1/2">
            <ActiveTags />
          </div>
        </div>
      </div>
    </>
  )
}

export default Categories

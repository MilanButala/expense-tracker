import React from 'react'
import Button from '../ui/Button'
import PageTitle from '../ui/PageTitle'
import BrandLogo from '../ui/BrandLogo'

const PageNotFound = () => {
  return (
    <div className="text-center">
      <div className="mb-4">
        <PageTitle
          title="404, Oops!"
          titleSize='text-6xl'
        />
        <BrandLogo width="212px" className="inline-block" />
      </div>
      <div className="my-10">
        <Button to="/" size="lg">Back To Home</Button>
      </div>
    </div>
  )
}

export default PageNotFound

import Card from '../../ui/Card'
import InputField from '../../ui/InputField'
import SelectBox from '../../ui/SelectBox'
import DatePicker from '../../ui/DatePicker'
import Button from '../../ui/Button'

const FilterBar = () => {
  return (
    <Card>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
        <InputField
          id="filter-search"
          label="Search notes"
          placeholder="e.g. groceries"
        />

        <SelectBox
          id="filter-category"
          label="Category"
        />

        <DatePicker
          id="filter-from"
          label="From"
        />

        <DatePicker
          id="filter-to"
          label="To"
        />

        <div className="self-end">
          <Button
            variant="danger"
            className="w-full"
            type="button"
          >
            Clear filters
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default FilterBar

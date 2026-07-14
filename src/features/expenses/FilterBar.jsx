import Card from '../../ui/Card'
import InputField from '../../ui/InputField'
import SelectBox from '../../ui/SelectBox'
import DatePicker from '../../ui/DatePicker'
import Button from '../../ui/Button'
import { useExpenses } from "../../context/ExpenseContext";
import { useState, useEffect } from 'react'
import useDebounce from "../../hooks/useDebounce";

const FilterBar = ({ onFilterChange }) => {
  const { categories } = useExpenses();

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    from: "",
    to: "",
  });



  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const debouncedSearch = useDebounce(filters.search, 500);
  const handleReset = () => {
    setFilters({
      search: "",
      category: "",
      from: "",
      to: "",
    })
  }

  useEffect(() => {
    const filterData = {
      ...filters,
      search: debouncedSearch,
    };

    onFilterChange?.(filterData);
  }, [debouncedSearch, filters.category, filters.from, filters.to, onFilterChange]);

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <Card>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
        <InputField
          id="search"
          name="search"
          label="Search notes"
          placeholder="e.g. groceries"
          value={filters.search}
          onChange={handleChange}
        />

        <SelectBox
          id="category"
          name="category"
          label="Category"
          options={categories.map((item) => ({
            value: item.slug,
            label: item.label,
          }))}
          value={filters.category}
          onChange={handleChange}
        />

        <DatePicker
          id="from"
          name="from"
          label="From"
          value={filters.from}
          max={filters.to}
          onChange={handleChange}
        />

        <DatePicker
          id="to"
          name="to"
          label="To"
          value={filters.to}
          min={filters.from}
          onChange={handleChange}
        />

        <div className="self-end">
          <Button
            variant="danger"
            className="w-full"
            type="button"
            onClick={handleReset}
            disabled={!hasActiveFilters}
          >
            Clear filters
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default FilterBar

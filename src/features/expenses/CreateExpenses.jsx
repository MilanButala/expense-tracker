import Button from '../../ui/Button'
import InputField from '../../ui/InputField'
import SelectBox from '../../ui/SelectBox'
import DatePicker from '../../ui/DatePicker'
import { useForm } from 'react-hook-form'
import { useExpenses } from '../../context/ExpenseContext'

const CreateExpenses = () => {
  const { categories } = useExpenses();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      expenseDate: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = (data) => {
    console.log('Create category:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className="flex gap-6 flex-col">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="md:w-1/3">
            <InputField
              id="amount"
              label="Amount"
              type="number"
              min={1}
              max={100000}
              step={1}
              placeholder="0.00"
              register={register}
              validation={{
                required: "Amount is required",
                min: {
                  value: 1,
                  message: "Minimum amount is ₹1",
                },
                max: {
                  value: 100000,
                  message: "Maximum amount is ₹100000",
                },
              }}
              error={errors.amount}
              required
            />
          </div>
          <div className="md:w-1/3">
            <SelectBox
              id="category"
              label="Category"
              register={register}
              options={categories.map((c) => ({ value: c.id, label: c.label }))}
              validation={{
                required: "Please select a category",
              }}
              error={errors.category}
              required
            />
          </div>
          <div className="md:w-1/3">
            <DatePicker
              id="expenseDate"
              label="Expense Date"
              register={register}
              validation={{
                required: "Please select a date",
              }}
              error={errors.expenseDate}
              required
            />
          </div>
        </div>
        <div>
          <InputField
            id="note"
            label="Note (optional)"
            register={register}
            placeholder="What was this for?"
            maxLength="120"
            validation={{
              required: 'Please enter a Note.',
              minLength: {
                value: 3,
                message: "Minimum 3 characters",
              },
              maxLength: {
                value: 20,
                message: "Maximum 120 characters",
              },
            }}
            error={errors.note}
            required
          />
        </div>
        <div className="flex gap-5 justify-end">
          <Button type="submit">
            Add expense
          </Button>
          <Button variant='danger' type="reset">
            Reset
          </Button>
        </div>
      </div>
    </form>
  )
}

export default CreateExpenses

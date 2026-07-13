import Button from '../../ui/Button'
import InputField from '../../ui/InputField'
import SelectBox from '../../ui/SelectBox'
import DatePicker from '../../ui/DatePicker'
import { useForm } from 'react-hook-form'
import { useExpenses } from '../../context/ExpenseContext'

const CreateExpenses = () => {
  const { categories, addExpenses } = useExpenses();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting  },
  } = useForm({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
    },

  });

  const onSubmit = async (data) => {
    try {
      await addExpenses(data);

      reset({
        amount: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
        note: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

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
                valueAsNumber: true,
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
              options={categories.map((categoryItem) => ({ value: categoryItem.id, label: categoryItem.label }))}
              validation={{
                required: "Please select a category",
              }}
              error={errors.category}
              required
            />
          </div>
          <div className="md:w-1/3">
            <DatePicker
              id="date"
              label="Expense Date"
              register={register}
              validation={{
                required: "Please select a date",
              }}
              error={errors.date}
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
        <div className="flex justify-end gap-5">
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Add Expense"}
          </Button>

          <Button
            type="button"
            variant="danger"
            disabled={isSubmitting}
            onClick={() =>
              reset({
                amount: "",
                category: "",
                date: new Date().toISOString().split("T")[0],
                note: "",
              })
            }
          >
            Reset
          </Button>
        </div>
      </div>
    </form>
  )
}

export default CreateExpenses

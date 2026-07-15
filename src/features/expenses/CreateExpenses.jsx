import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import InputField from "../../ui/InputField";
import SelectBox from "../../ui/SelectBox";
import DatePicker from "../../ui/DatePicker";
import { useExpenses } from "../../context/ExpenseContext";

const CreateExpenses = ({ expense = null, onClose }) => {
  const { categories, addExpenses, updateExpenses } = useExpenses();

  const isEdit = !!expense;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      note: "",
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (expense) {
      reset({
        amount: expense.amount,
        category: expense.category,
        date: expense.date || expense.expenseDate,
        note: expense.note,
      });
    } else {
      reset({
        amount: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
        note: "",
      });
    }
  }, [expense, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateExpenses(expense.id, data);
      } else {
        await addExpenses(data);
      }

      reset({
        amount: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
        note: "",
      });

      onClose?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="md:w-1/3">
            <InputField
              id="amount"
              label="Amount"
              type="number"
              placeholder="0.00"
              min={1}
              max={100000}
              step={1}
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
              options={categories.map((item) => ({
                value: item.slug,
                label: item.label,
              }))}
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

        <InputField
          id="note"
          label="Note"
          placeholder="What was this for?"
          register={register}
          maxLength={120}
          validation={{
            required: "Please enter a note.",
            minLength: {
              value: 3,
              message: "Minimum 3 characters",
            },
            maxLength: {
              value: 120,
              message: "Maximum 120 characters",
            },
          }}
          error={errors.note}
          required
        />

        <div className="flex justify-end gap-5 border-t border-border pt-6">
          <Button variant='accent' type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isEdit ? "Update Expense" : "Add Expense"}
          </Button>

          <Button
            type="button"
            variant="danger"
            disabled={isSubmitting}
            onClick={() => {
              if (onClose) {
                onClose();
              } else {
                reset({
                  amount: "",
                  category: "",
                  date: new Date().toISOString().split("T")[0],
                  note: "",
                });
              }
            }}
          >
            {onClose ? "Cancel" : "Reset"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateExpenses;
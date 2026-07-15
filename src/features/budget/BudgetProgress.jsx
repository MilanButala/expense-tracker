import { useState } from "react";
import Button from "../../ui/Button";
import InputField from "../../ui/InputField";
import { formatCurrency } from "../../utils/helper";
import { useForm } from 'react-hook-form'

const BudgetProgress = ({
  budget,
  spent,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [amount, setAmount] = useState(budget ?? 0);

  const percentage = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;

  const status = percentage >= 100 ? "Over Budget" : percentage >= 80 ? "Warning" : "On track";

  const progressColor = percentage >= 100 ? "bg-danger" : percentage >= 80 ? "bg-warning" : "bg-success";

  const handleEdit = () => {
    setAmount(budget ?? 0);
    setIsEditing(true);
  };

  // const handleSave = () => {
  //   onSave?.(Number(amount));
  //   setIsEditing(false);
  // };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: budget ?? 0,
    }
  });

  const onSubmit = (data) => {
    onSave?.(Number(data.amount));
    setIsEditing(false);
  }


  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <InputField
                id="amount"
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

            <Button variant="accent" type="submit">
              SAVE
            </Button>
          </div>
        </form>
      ) : (
        <>
          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            
            <div
              className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-sm mt-4">
            <span className="font-semibold text-success">
              {status}
            </span>
          </div>
          <div className="mt-4">
            <span className="text-base font-semibold text-secondary">
              {formatCurrency(spent)} of{" "}
              {formatCurrency(budget)} ({percentage.toFixed(0)}%)
            </span>
            </div>
          <div className="mt-6 flex justify-end border-t border-border pt-6">
            <Button
              size="sm"
              variant="accent"
              onClick={handleEdit}        >
              EDIT
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default BudgetProgress;
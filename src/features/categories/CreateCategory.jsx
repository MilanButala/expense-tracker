import React from 'react'
import { useForm } from 'react-hook-form'
import Card from '../../ui/Card'
import InputField from '../../ui/InputField'
import Button from '../../ui/Button'
import ThemeColor from '../../ui/ThemeColor'
import { useExpenses } from '../../context/ExpenseContext'

const CreateCategory = () => {
  const { categories, addCategory } = useExpenses();

  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      categoryName: "",
      color: "#A63D2F",
    },
  });

  const onSubmit = async (data) => {
    clearErrors("categoryName");

    const trimmedLabel = data.categoryName.trim();

    const generatedId = trimmedLabel
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");

    if (!generatedId) {
      setError("categoryName", {
        type: "manual",
        message: "Category name must contain valid letters or numbers.",
      });
      return;
    }

    // Example duplicate check
    const isDuplicate = categories.some(
      (category) => category.id === generatedId
    );

    if (isDuplicate) {
      setError("categoryName", {
        type: "manual",
        message: "A category with a similar name already exists.",
      });
      return;
    }

    // Save to API
    const result = await addCategory(trimmedLabel, data.color);

    if (!result) {
      setError("categoryName", {
        type: "manual",
        message: "Failed to create category.",
      });
      return;
    }

    reset({
      categoryName: "",
      color: "#A63D2F",
    });
  };

  return (
    <Card title="Create new category" className="h-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputField
          id="categoryName"
          label="Category Name"
          register={register}
          placeholder="e.g. Subscriptions"
          validation={{
            required: "Please enter a category name.",
            minLength: {
              value: 3,
              message: "Minimum 3 characters",
            },
            maxLength: {
              value: 20,
              message: "Maximum 20 characters",
            },
          }}
          error={errors.categoryName}
          required
        />
        <ThemeColor
          label="Category Color"
          name="color"
          control={control}
          rules={{
            required: "Please select a color",
          }}
          error={errors.color}
        />
        <Button type="submit">
          Add Category
        </Button>
      </form>
    </Card>
  )
}

export default CreateCategory

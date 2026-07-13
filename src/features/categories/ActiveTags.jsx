import Card from "../../ui/Card";
import Button from "../../ui/Button";
import { useExpenses } from "../../context/ExpenseContext";


const ActiveTags = () => {
  const { categories, expenses, removeCategory } = useExpenses();
  console.log(expenses);
  return (
    <Card title="Active Tags" className="h-full">
      <div className="space-y-3">
        {categories.map((category) => {
          const count = expenses.filter(
            (exp) => exp.category?.toLowerCase() === category.slug.toLowerCase()
          ).length;

          return (
            <div key={category.id} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div className="flex items-center gap-3">
                <span
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: category.swatch }}
                />
                <div>
                  <h4 className="font-medium text-text-primary">
                    {category.label}{" "}
                    <span className="text-sm text-text-secondary">
                      ({count} Expense{count !== 1 ? "s" : ""})
                    </span>
                  </h4>
                </div>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeCategory(category.id)}
              >
                Delete
              </Button>
            </div>
          )
        }
        )}

      </div>
    </Card>
  );
};

export default ActiveTags;
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Delete, Edit } from "lucide-react";
import { Button } from "../ui/button";

export default function CustomerCard({
  data,
  onEdit,
  onDelete,
  className,
  ...props
}) {
  return (
    <Card className={cn(className)} {...props}>
      <CardContent className="pt-3 flex gap-3">
        <p>{`${data.name} ${data.surname}`}</p>
        <Button size="sm" onClick={onEdit}>
          <Edit size={18} />
        </Button>
        <Button size="sm" onClick={onDelete} variant="destructive">
          <Delete />
        </Button>
      </CardContent>
    </Card>
  );
}

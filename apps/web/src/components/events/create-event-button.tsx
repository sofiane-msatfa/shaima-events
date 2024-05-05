import { useBoolean } from "@/hooks/use-boolean";
import { CreateEventDialog } from "./create-event-dialog";
import { Button, type ButtonProps } from "@mui/material";

interface CreateEventButtonProps extends Omit<ButtonProps, "onClick"> {
  label: string;
}

export function CreateEventButton({ label, ...props }: CreateEventButtonProps) {
  const dialog = useBoolean();

  return (
    <>
      <Button variant="outlined" color="success" onClick={dialog.onTrue} {...props}>
        {label}
      </Button>

      <CreateEventDialog open={dialog.value} onClose={dialog.onFalse} />
    </>
  );
}

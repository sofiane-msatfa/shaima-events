import { useBoolean } from "@/hooks/use-boolean";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  eventCreateRequestSchema,
  type EventCreateRequest,
} from "@common/dto/event-create-request";
import { FormInput } from "../form/form-input";
import { FormProvider } from "../form/form-provider";
import { FormSelect } from "../form/form-select";
import { EventCategory } from "@common/enum/event-category";

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddEventModal() {
  const dialog = useBoolean();

  const methods = useForm<EventCreateRequest>({
    resolver: zodResolver(eventCreateRequestSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.info("DATA", data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div>
      <Button variant="outlined" color="success" onClick={dialog.onTrue}>
        Ajouter
      </Button>

      <Dialog open={dialog.value} onClose={dialog.onFalse}>
        <DialogTitle>Nouvel événement</DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 3 }}>
            Veuillez remplir le formulaire ci-dessous pour ajouter un nouvel événement.
          </Typography>

          <FormProvider methods={methods} onSubmit={onSubmit}>
            <Stack direction="column" spacing={2.5}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <FormInput name="name" label="Nom de l'événement" size="small" />
                <FormSelect
                  name="category"
                  label="Catégorie"
                  size="small"
                  sx={{
                    "& .MuiSelect-select": {
                      height: "1.4375em",
                    },
                  }}
                >
                  {Object.values(EventCategory).map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </FormSelect>
              </Stack>
            </Stack>
          </FormProvider>

          {/* <TextField
            autoFocus
            fullWidth
            type="email"
            margin="dense"
            variant="outlined"
            label="Email Address"
          /> */}
        </DialogContent>

        <DialogActions>
          <Button onClick={dialog.onFalse} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button onClick={dialog.onFalse} variant="contained">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useDevice } from "@/hooks/use-device";
import {
  type EventCreateRequest,
  eventCreateRequestSchema,
} from "@common/dto/event-create-request";
import { EventCategory } from "@common/enum/event-category";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventForm } from "./event-form";
import { FormProvider } from "../form/form-provider";
import { usePostEvent } from "@/api/events";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { buildEventFormValues } from "@/utils/event-form";

interface CreateEventFormProps {
  open: boolean;
  onClose: VoidFunction;
}

export function CreateEventForm({ open, onClose }: CreateEventFormProps) {
  const queryClient = useQueryClient();
  const mutation = usePostEvent(queryClient);
  const { isMobile } = useDevice();

  const methods = useForm<EventCreateRequest>({
    resolver: zodResolver(eventCreateRequestSchema),
  });

  const {
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods;

  const handleCloseDialog = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      handleCloseDialog();
    }
  }, [isSubmitSuccessful, handleCloseDialog]);

  const isConcertSelected = watch("category") === EventCategory.Concert;

  const onSubmit = handleSubmit(async (data: EventCreateRequest) => {
    const createRequest = buildEventFormValues(data);
    mutation.mutate(createRequest);
  });

  return (
    <Dialog open={open} onClose={onClose} fullScreen={isMobile}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Nouvel événement</DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 3 }}>
            Veuillez remplir le formulaire ci-dessous pour ajouter un nouvel événement.
          </Typography>

          <EventForm isConcertSelected={isConcertSelected} />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Annuler
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Créer
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

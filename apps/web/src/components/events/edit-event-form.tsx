import {
  eventUpdateRequestSchema,
  type EventUpdateRequest,
} from "@common/dto/event-update-request";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Event } from "@common/dto/event";
import { EventCategory } from "@common/enum/event-category";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useDevice } from "@/hooks/use-device";
import { FormProvider } from "../form/form-provider";
import { EventForm } from "./event-form";
import { usePatchEvent } from "@/api/events";
import { useQueryClient } from "@tanstack/react-query";
import { buildEventFormValues } from "@/utils/event-form";
import { toast } from "sonner";

interface EditEventFormProps {
  event: Event;
  open: boolean;
  onClose: VoidFunction;
}

export function EditEventForm({ event, open, onClose }: EditEventFormProps) {
  const { isMobile } = useDevice();
  const queryClient = useQueryClient();
  const mutation = usePatchEvent(queryClient);

  const methods = useForm<EventUpdateRequest>({
    resolver: zodResolver(eventUpdateRequestSchema),
    defaultValues: buildEventFormValues(event),
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const isConcertSelected = watch("category") === EventCategory.Concert;

  const onSubmit = handleSubmit(async (data: EventUpdateRequest) => {
    mutation.mutate({ id: event.id, ...data });
    toast.success("Event mis à jour avec succès");
    onClose();
  });

  return (
    <Dialog open={open} onClose={onClose} fullScreen={isMobile}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Modifier l'évènement {event.name}</DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 3 }}>
            Modifiez les informations de l'évènement ci-dessous.
          </Typography>

          <EventForm isConcertSelected={isConcertSelected} />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Annuler
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Modifier
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

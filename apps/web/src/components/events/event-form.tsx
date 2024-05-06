import { MenuItem, Grid } from "@mui/material";
import { FormInput } from "../form/form-input";
import { EventCategory } from "@common/enum/event-category";
import { FormSelect } from "../form/form-select";
import { FormDatePicker } from "../form/form-datepicker";
import { FormAddress } from "../form/form-address";

interface EventFormProps {
  isConcertSelected: boolean;
}

export function EventForm({ isConcertSelected }: EventFormProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8}>
        <FormInput name="name" label="Nom de l'événement" size="small" />
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormSelect
          name="category"
          label="Catégorie"
          size="small"
          SelectProps={{ sx: { height: 47 } }}
        >
          {Object.values(EventCategory).map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </FormSelect>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormDatePicker name="startTime" label="Date de début" size="small" />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormDatePicker name="endTime" label="Date de fin" size="small" />
      </Grid>
      <Grid item xs={4}>
        <FormInput name="capacity" type="number" label="Capacité" size="small" />
      </Grid>
      <Grid item xs={8}>
        <FormAddress name="adresseGouv" label="Adresse" size="small" />
      </Grid>

      {isConcertSelected && (
        <Grid item xs={12}>
          <FormInput name="artists" label="Artistes" size="small" />
        </Grid>
      )}

      <Grid item xs={12}>
        <FormInput name="illustration" label="Illustration" size="small" />
      </Grid>

      <Grid item xs={12}>
        <FormInput name="description" label="Description" size="small" multiline rows={3} />
      </Grid>
    </Grid>
  );
}

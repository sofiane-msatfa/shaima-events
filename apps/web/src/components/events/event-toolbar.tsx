import type { PartialEventFilters } from "@/api/events";
import { Button, Divider, InputAdornment, MenuItem, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import SearchIcon from "@mui/icons-material/Search";
import { useCallback } from "react";
import { EventCategory } from "@common/enum/event-category";
import { SearchInput } from "../search-input";
import { useBoolean } from "@/hooks/use-boolean";
import { CreateEventForm } from "./create-event-form";

interface EventToolbarProps {
  filters: PartialEventFilters;
  onFiltersChange: (filters: PartialEventFilters) => void;
}

const UNFILTER_CATEGORY = {
  label: "Tout voir",
  value: "ALL",
};

export function EventToolbar({ filters, onFiltersChange }: EventToolbarProps) {
  const dialog = useBoolean();

  const handleChangeFilter = useCallback(
    (filterName: keyof PartialEventFilters) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      onFiltersChange({ ...filters, [filterName]: value });
    },
    [onFiltersChange, filters],
  );

  const handleChangeCategory = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value as EventCategory;

      if (value === UNFILTER_CATEGORY.value) {
        return onFiltersChange({ ...filters, category: undefined });
      }

      onFiltersChange({ ...filters, category: value });
    },
    [onFiltersChange, filters],
  );

  const handleFilterDate = useCallback(
    (filterName: keyof PartialEventFilters) => (value: Date | null) => {
      onFiltersChange({ ...filters, [filterName]: value });
    },
    [onFiltersChange, filters],
  );

  return (
    <>
      <Stack gap={2} direction="column" sx={{ py: 2.5, px: { xs: 2.5, md: 0 } }}>
        <Stack direction="row" justifyContent="space-between">
          <SearchInput
            value={filters.name}
            onChange={handleChangeFilter("name")}
            placeholder="Trouver un événement"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.disabled", width: 20 }} />
                </InputAdornment>
              ),
            }}
          />

          <Button variant="outlined" color="success" onClick={dialog.onTrue}>
            Créer un événement
          </Button>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="flex-end"
          justifyContent="flex-start"
          spacing={2}
          width={{ sm: 1 }}
        >
          <TextField
            select
            fullWidth
            size="small"
            variant="outlined"
            label="Catégorie"
            value={filters.category}
            defaultValue={UNFILTER_CATEGORY.value}
            onChange={handleChangeCategory}
            sx={{ maxWidth: { md: 200 } }}
            InputProps={{ sx: { height: 38 } }}
          >
            <MenuItem value={UNFILTER_CATEGORY.value}>{UNFILTER_CATEGORY.label}</MenuItem>
            <Divider sx={{ borderStyle: "dashed" }} />
            {Object.values(EventCategory).map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>

          <DatePicker
            label="Début"
            value={filters.startTime}
            onChange={handleFilterDate("startTime")}
            sx={{ width: { md: 200 } }}
            slotProps={{
              textField: { fullWidth: true, size: "small", variant: "outlined" },
              field: { clearable: true },
              openPickerButton: { size: "small" },
              openPickerIcon: { fontSize: "small" },
            }}
          />

          <DatePicker
            label="Fin"
            value={filters.endTime}
            onChange={handleFilterDate("endTime")}
            sx={{ width: { md: 200 } }}
            slotProps={{
              textField: { fullWidth: true, size: "small", variant: "outlined" },
              field: { clearable: true },
              openPickerButton: { size: "small" },
              openPickerIcon: { fontSize: "small" },
            }}
          />
        </Stack>
      </Stack>

      <CreateEventForm open={dialog.value} onClose={dialog.onFalse} />
    </>
  );
}

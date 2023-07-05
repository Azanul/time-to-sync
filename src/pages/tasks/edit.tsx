import { Edit } from "@refinedev/mui";
import dayjs from 'dayjs';
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


export const TaskEdit: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {
    saveButtonProps,
    refineCore: { queryResult },
    register,
    control,
    formState: { errors },
    setValue
  } = useForm();

  const taskData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("id", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.id}
          helperText={(errors as any)?.id?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label={translate("task.fields.id")}
          name="id"
          disabled
        />
        <TextField
          {...register("title", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.title}
          helperText={(errors as any)?.title?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={translate("task.fields.title")}
          name="title"
        />
        <TextField
          {...register("body", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.body}
          helperText={(errors as any)?.body?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={translate("task.fields.body")}
          name="body"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={dayjs(taskData?.due_date)}
            label={translate("task.fields.due_date")}
            onChange={(newValue) => setValue("due_date", newValue)}
          />
        </LocalizationProvider>
        <TextField
          {...register("reach", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.reach}
          helperText={(errors as any)?.reach?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label={translate("task.fields.reach")}
          name="reach"
        />
        <TextField
          {...register("impact", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.impact}
          helperText={(errors as any)?.impact?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label={translate("task.fields.impact")}
          name="impact"
        />
        <TextField
          {...register("confidence", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.confidence}
          helperText={(errors as any)?.confidence?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label={translate("task.fields.confidence")}
          name="confidence"
        />
        <TextField
          {...register("effort", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.effort}
          helperText={(errors as any)?.effort?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label={translate("task.fields.effort")}
          name="effort"
        />
        <TextField
          {...register("rice", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.rice}
          helperText={(errors as any)?.rice?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label={translate("task.fields.rice")}
          name="rice"
        />
      </Box>
    </Edit>
  );
};

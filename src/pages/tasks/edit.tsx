import { Edit } from "@refinedev/mui";
import dayjs from 'dayjs';
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useTranslate, useSubscription, useUpdate, useGetIdentity } from "@refinedev/core";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export const TaskEdit: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {
    saveButtonProps,
    refineCore: { queryResult },
    register,
    formState: { errors },
    setValue,
    handleSubmit
  } = useForm({ mode: "onChange" });

  const { data: identity } = useGetIdentity<{
    id: number;
    fullName: string;
  }>();

  const { mutate } = useUpdate();
  const noInvalidateOnChange = handleSubmit((data: any, e: any) => {
    const key = e.target.name;
    data[key] = ["reach", "impact", "confidence", "effort"].includes(key) ? +e.target.value : e.target.value;
    data.rice = data.reach * data.impact * data.confidence / data.effort;
    data.last_edited_by = identity?.id;
    mutate({
      resource: "task",
      values: data,
      id: data.id,
      invalidates: []
    })
  })

  const taskData = queryResult?.data?.data;

  useSubscription({
    channel: "task",
    enabled: true,
    types: ["updated"],
    onLiveEvent: (event) => {
      const payload = event?.payload;
      console.log(event)
      if (payload && payload.last_edited_by != identity?.id) {
        setValue("id", payload.id);
        setValue("title", payload.title);
        setValue("body", payload.body);
        setValue("due_date", payload.due_date);
        setValue("reach", payload.reach);
        setValue("impact", payload.impact);
        setValue("confidence", payload.confidence);
        setValue("effort", payload.effort);
        setValue("rice", payload.rice);
      }
    },
  });

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
          onChange={noInvalidateOnChange}
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
          onChange={noInvalidateOnChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={dayjs(taskData?.due_date)}
            label={translate("task.fields.due_date")}
            onChange={(newValue) => setValue("due_date", newValue)}
            onClose={noInvalidateOnChange}
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
          onChange={noInvalidateOnChange}
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
          onChange={noInvalidateOnChange}
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
          onChange={noInvalidateOnChange}
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
          onChange={noInvalidateOnChange}
        />
        <TextField
          {...register("rice", {
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
          disabled
        />
      </Box>
    </Edit>
  );
};

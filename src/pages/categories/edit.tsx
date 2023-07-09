import { Edit } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { HexColorPicker } from "react-colorful";


export const CategoryEdit: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {
    saveButtonProps,
    refineCore: { queryResult },
    register,
    formState: { errors },
    watch,
    setValue
  } = useForm();

  const categoriesData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("name", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.name}
          helperText={(errors as any)?.name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={translate("categories.fields.name")}
          name="name"
        />
        <TextField
          {...register("color", {
            required: "This field is required",
            maxLength: 7,
            minLength: 7
          })}
          error={!!(errors as any)?.color}
          helperText={(errors as any)?.color?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={translate("categories.fields.color")}
          name="color"
        />
        <HexColorPicker
          color={watch("color")}
          onChange={(val: any) => {
            setValue("color", val);
          }}
        />
      </Box>
    </Edit>
  );
};

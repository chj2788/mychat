import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import React, { useCallback, useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";

const EditableInput = ({
  initialValue,
  onSave,
  label = null,
  placeholder = "Write your value",
  emptyMsg = "Input is empty",
}) => {
  const [input, setInput] = useState(initialValue);
  const [isEditable, setIsEditable] = useState(false);
  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onEditClick = useCallback(() => {
    setIsEditable((p) => !p);
    setInput(initialValue);
  }, [initialValue]);

  const onSaveClick = async () => {
    const trimmed = input.trim();

    if (trimmed === "") {
      alert(emptyMsg);
    }

    if (trimmed !== initialValue) {
      await onSave(trimmed);
    }

    setIsEditable(false);
  };

  return (
    <div>
      <FormControl variant="outlined">
        <InputLabel>{label}</InputLabel>
        <OutlinedInput
          placeholder={placeholder}
          value={input}
          onChange={onInputChange}
          disabled={!isEditable}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={onEditClick}>
                {isEditable ? <CloseIcon /> : <EditIcon />}
              </IconButton>
              {isEditable && (
                <IconButton onClick={onSaveClick}>
                  <CheckIcon />
                </IconButton>
              )}
            </InputAdornment>
          }
          labelWidth={80}
        />
      </FormControl>
    </div>
  );
};

export default EditableInput;

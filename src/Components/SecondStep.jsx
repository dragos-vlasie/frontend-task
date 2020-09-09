import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";

const isEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
const ageList = (start, end) => {
  let arr = [];
  for (let index = start; index <= end; index++) {
    arr.push(index);
  }
  return arr;
};

// Destructure props
const SecondStep = ({
  handleNext,
  handleBack,
  formTitle,
  handleChange,
  values: { age = 0, email },
  filedError,
  isError,
}) => {
  // Check if all values are not empty
  const isEmpty = age > 0 && email.length > 0 && isEmail.test(email);
  return (
    <>
      <Typography variant="h4" align="center" style={{ marginTop: 80 }}>
        {formTitle}
      </Typography>
      <Grid style={{ justifyContent: "center" }} container spacing={4} noValidate>
        <Grid item xs={8} sm={5}>
          <FormControl fullWidth required margin="normal">
            <InputLabel htmlFor="age">Age</InputLabel>
            <Select style={{ minWidth: "40px" }} value={age} onChange={handleChange("age")}>
              {ageList(18, 60).map((age) => (
                <MenuItem key={age} value={age}>
                  {age}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={5}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            placeholder="Your email address"
            type="email"
            defaultValue={email}
            onChange={handleChange("email")}
            margin="normal"
            error={filedError.email !== ""}
            helperText={filedError.email !== "" ? `${filedError.email}` : ""}
            required
          />
        </Grid>
      </Grid>
      <div style={{ display: "flex", marginTop: 50, justifyContent: "space-around" }}>
        <Button
          variant="contained"
          color="default"
          onClick={handleBack}
          style={{ marginRight: 20, backgroundColor: "white", color: "#fd9e01", borderRadius: "25px" }}
        >
          Previous
        </Button>
        <Button
          style={{ backgroundColor: "#fd9e01", color: "white", borderRadius: "25px" }}
          variant="contained"
          disabled={!isEmpty || isError}
          color="primary"
          onClick={handleNext}
        >
          Continue
        </Button>
      </div>
    </>
  );
};

export default SecondStep;

import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

const isEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
const ageList = (start, end) => {
  let arr = [];
  for (let index = start; index <= end; index++) {
    arr.push(index);
  }
  return arr;
};

// Destructure props
const SecondStep = ({ handleNext, handleBack, handleChange, values: { age = 0, email }, filedError, isError }) => {
  // Check if all values are not empty
  const isEmpty = age > 0 && email.length > 0 && isEmail.test(email);
  console.log("SecondStep -> isEmpty", isEmpty);
  return (
    <Fragment>
      <Grid container spacing={4} noValidate>
        <Grid item xs={8} sm={8}>
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
      <div style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}>
        <Button variant="contained" color="default" onClick={handleBack} style={{ marginRight: 20 }}>
          Previous
        </Button>
        <Button variant="contained" disabled={!isEmpty || isError} color="primary" onClick={handleNext}>
          Continue
        </Button>
      </div>
    </Fragment>
  );
};

export default SecondStep;

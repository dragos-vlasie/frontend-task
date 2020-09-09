import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

// Destructure
const RepeatedStep = ({
  handleNext,
  handleChange,
  handleBack,
  values: { firstName, lastName },
  filedError,
  isError,
  formTitle,
}) => {
  // Check if all values are not empty
  const isEmpty = firstName.length > 0 && lastName.length > 0;

  return (
    <>
      <Typography variant="h4" align="center">
        {formTitle}
      </Typography>
      <Grid container spacing={2} noValidate>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            placeholder="Your first name"
            defaultValue={firstName}
            onChange={handleChange("firstName")}
            margin="normal"
            error={filedError.firstName !== ""}
            helperText={filedError.firstName !== "" ? `${filedError.firstName}` : ""}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            placeholder="Your last name"
            defaultValue={lastName}
            onChange={handleChange("lastName")}
            margin="normal"
            error={filedError.lastName !== ""}
            helperText={filedError.lastName !== "" ? `${filedError.lastName}` : ""}
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

export default RepeatedStep;

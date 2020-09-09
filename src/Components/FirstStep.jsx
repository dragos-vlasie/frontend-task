import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import ReactInputMask from "react-input-mask";

// Destructure props
const FirstStep = ({ handleNext, handleChange, values: { phone, country }, filedError, isError }) => {
  // Check if all values are not empty
  const isEmpty = country.length > 0 && phone.length > 0;

  return (
    <Fragment>
      <Grid style={{ justifyContent: "center" }} container spacing={4} noValidate>
        <Grid item xs={8} sm={8}>
          <FormControl fullWidth required margin="normal">
            <InputLabel htmlFor="country">Country</InputLabel>
            <Select value={country} onChange={handleChange("country")}>
              <MenuItem value={"Romania"}>Romania</MenuItem>
              <MenuItem value={"India"}>India</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={8}>
          <ReactInputMask
            mask="9-9999-9999"
            // value={}
            maskChar="-"
            label="Number"
            name="phone"
            placeholder="i.e: 0-0000-0000"
            defaultValue={phone}
            margin="normal"
            onChange={handleChange("phone")}
          >
            {() => (
              <TextField
                error={filedError.phone !== ""}
                fullWidth
                helperText={filedError.phone !== "" ? `${filedError.phone}` : ""}
              />
            )}
          </ReactInputMask>
        </Grid>
      </Grid>
      <div style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}>
        <Button variant="contained" disabled={!isEmpty || isError} color="primary" onClick={handleNext}>
          Continue
        </Button>
      </div>
    </Fragment>
  );
};

export default FirstStep;

import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { TextField, Typography } from "@material-ui/core";
import ReactInputMask from "react-input-mask";

// Destructure props
const FirstStep = ({ handleNext, formTitle, handleChange, values: { phone, country }, filedError, isError }) => {
  // Check if all values are not empty
  const isEmpty = country.length > 0 && phone.length > 0;

  return (
    <>
      <Typography variant="h4" align="center">
        {formTitle}
      </Typography>
      <Grid style={{ justifyContent: "center" }} container spacing={4} noValidate>
        <Grid item xs={8} sm={7}>
          <FormControl fullWidth required margin="normal">
            <InputLabel htmlFor="country">Country</InputLabel>
            <Select value={country} onChange={handleChange("country")}>
              <MenuItem value={"Romania"}>Romania</MenuItem>
              <MenuItem value={"India"}>India</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={7}>
          <ReactInputMask
            mask="9-9999-9999"
            // value={}
            maskChar="-"
            placeholder="i.e: 0-0000-0000"
            defaultValue={phone}
            margin="normal"
            onChange={handleChange("phone")}
          >
            {() => (
              <TextField
                label="Number"
                name="phone"
                error={filedError.phone !== ""}
                fullWidth
                helperText={filedError.phone !== "" ? `${filedError.phone}` : ""}
              />
            )}
          </ReactInputMask>
        </Grid>
      </Grid>
      <div style={{ display: "flex", marginTop: 50, justifyContent: "space-around" }}>
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

export default FirstStep;

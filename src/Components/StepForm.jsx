import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import RepeatedStep from "./RepeatedStep";
import Confirm from "./Confirm";
import submited from "./../submited.png";
import { Grid } from "@material-ui/core";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    left: "-50%",
    right: "50%",
  },
  active: {
    visibility: "initial",
    "& $line": {
      background: "#4fb1a3",
    },
  },
  completed: {
    visibility: "initial",
    "& $line": {
      background: "#4fb1a3",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    visibility: "hidden",
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 25,
    height: 25,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    width: 28,
    height: 28,
    visibility: "inherit",
    background: "#4fb1a3",
    border: "2px solid white",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    visibility: "inherit",
    background: "#4fb1a3",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 6,
    8: 7,
    9: 8,
    10: 9,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
    backgroundColor: "#fd9e01",
    color: "white",
    borderRadius: "25px",
  },
  instructions: {
    textAlign: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  // don't display the first step
  // the first step is used to set up the line till the next step
  iconWrapper: {
    "&:first-child": {
      visibility: "hidden",
    },
  },
  label: {
    visibility: "hidden",
  },
  active: {
    visibility: "initial",
  },
  completed: {
    visibility: "initial",
  },
}));

function getSteps() {
  return ["", "Form", "Form1", "Form2", "Form3", "Form4", "Form5", "Form6", "Form7"];
}

const emailRegex = RegExp(/^[^@]+@[^@]+\.[^@]+$/);
const phoneRegex = RegExp(/^\d{9}$/);

export default function StepForm() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(1);
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    ageValue: "",
    phone: "",
  });

  // Copy fields as they all have the same name
  const [filedError, setFieldError] = useState({
    ...fields,
  });

  const [isError, setIsError] = useState(false);

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(1);
  };

  // Handle fields change
  const handleChange = (input) => ({ target: { value } }) => {
    // Set values to the fields
    setFields({
      ...fields,
      [input]: value,
    });

    // Handle errors
    const formErrors = { ...filedError };
    const lengthValidate = value.length > 0 && value.length < 3;

    switch (input) {
      case "firstName":
        formErrors.firstName = lengthValidate ? "Minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName = lengthValidate ? "Minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value) ? "" : "Invalid email address";
        break;
      case "phone":
        formErrors.phone = phoneRegex.test(parseInt(value.split("-").join("")))
          ? ""
          : "Please enter a valid phone number. i.e: x-xxxx-xxxxx";
        break;
      default:
        break;
      // set error hook
    }
    Object.values(formErrors).forEach((error) => (error.length > 0 ? setIsError(true) : setIsError(false)));
    // set errors hook
    setFieldError({
      ...formErrors,
    });
  };

  const handleSteps = (step, steps) => {
    switch (step) {
      case 1:
        return (
          <FirstStep
            formTitle={steps[step]}
            handleNext={handleNext}
            handleChange={handleChange}
            values={fields}
            isError={isError}
            filedError={filedError}
          />
        );
      case 2:
        return (
          <SecondStep
            formTitle={steps[step]}
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={fields}
            isError={isError}
            filedError={filedError}
          />
        );
      case 3:
        return (
          <RepeatedStep
            formTitle={steps[step]}
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={fields}
            isError={isError}
            filedError={filedError}
          />
        );
      case 4:
        return (
          <RepeatedStep
            formTitle={steps[step]}
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={fields}
            isError={isError}
            filedError={filedError}
          />
        );
      case 5:
        return (
          <RepeatedStep
            formTitle={steps[step]}
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={fields}
            isError={isError}
            filedError={filedError}
          />
        );
      case 6:
        return (
          <RepeatedStep
            formTitle={steps[step]}
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={fields}
            isError={isError}
            filedError={filedError}
          />
        );
      case 7:
        return (
          <Confirm
            formTitle={steps[step]}
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={fields}
            isError={isError}
            filedError={filedError}
          />
        );
      default:
        break;
    }
  };

  return (
    <>
      {activeStep === steps.length - 1 ? (
        <>
          <Grid style={{ justifyContent: "center" }} container spacing={2} noValidate>
            <Grid item xs={12} sm={6}>
              <img style={{ width: "100%" }} src={submited} alt="submited" />
            </Grid>
          </Grid>
          <div style={{ display: "flex", marginTop: 50, justifyContent: "space-around" }}>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        </>
      ) : (
        <div className={classes.root}>
          <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
            {steps.map((label, index) => (
              <Step className={classes.iconWrapper} key={index}>
                <StepLabel
                  classes={{
                    root: classes.root, // class name, e.g. `root-x`
                    active: classes.active,
                    label: classes.label,
                    completed: classes.completed,
                  }}
                  StepIconComponent={ColorlibStepIcon}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          {handleSteps(activeStep, steps)}
        </div>
      )}
    </>
  );
}

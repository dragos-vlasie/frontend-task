import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
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
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    visibility: "inherit",
    background: "#4fb1a3",
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
  label1: {},
}));

function getSteps() {
  return ["", "Title", "Title1", "Title2", "Title3", "Title4", "Title5", "Title6", "Title7"];
}

function getStepContent(step, steps) {
  // starts with one as step start at 1
  switch (step) {
    case 1:
      return steps[step];
    case 2:
      return steps[step];
    case 3:
      return steps[step];
    case 4:
      return steps[step];
    case 5:
      return steps[step];
    case 6:
      return steps[step];
    case 7:
      return steps[step];
    case 9:
      return steps[step];
    case 8:
      return steps[step];
    default:
      return "Unknown step";
  }
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

  const handleSteps = (step) => {
    step = 2;
    switch (step) {
      case 1:
        return (
          <FirstStep
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
      {activeStep === steps.length ? (
        <div>
          <Typography className={classes.instructions}>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </div>
      ) : (
        <div className={classes.root}>
          <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
            {steps.map((label, index) => (
              <Step className={classes.iconWrapper} key={index}>
                <StepLabel className={classes.label1} StepIconComponent={ColorlibStepIcon}></StepLabel>
              </Step>
            ))}
          </Stepper>
          {handleSteps(activeStep)}
          <div>
            <div>
              <Typography variant="h4" className={classes.instructions}>
                {getStepContent(activeStep, steps)}
              </Typography>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

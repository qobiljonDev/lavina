import classNames from "classnames";
import { FormikProps, FormikValues } from "formik";
import { get } from "lodash";

import "./input.scss";

interface IInput {
  label?: string;
  type: string;
  className?: string;
  placeholder?: string;
  onChange?: Function;
  form: FormikProps<FormikValues>;
  field: any;
  disabled: boolean;
  props: any;
  inputClassName: string;
}
const Input = ({
  label,
  type = "text",
  className = "",
  placeholder = "",
  onChange,
  inputClassName,
  disabled,
  field,
  form,
  ...props
}: IInput) => {
  const { errors = {}, touched = {} } = form;
  const errorMessage: any = get(errors, field?.name);
  const touchedMessage = get(touched, field?.name);

  const customInputClassName = classNames("custom-input", inputClassName);

  const classes = classNames(
    "input-wrapper",
    touchedMessage && errorMessage ? "error-wrapper" : "",
    className
  );

  return (
    <div className={classes}>
      {label && <p className="label">{label}</p>}
      <input
        type={type}
        autoComplete="off"
        className={customInputClassName}
        disabled={disabled}
        {...{ placeholder }}
        {...field}
        {...props}
      />
      {touchedMessage && errorMessage ? <span>{errorMessage}</span> : ""}
    </div>
  );
};

export default Input;

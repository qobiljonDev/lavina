import { Formik, Form, Field } from "formik";
import { get } from "lodash";
import * as yup from "yup";
import { toast } from "react-toastify";

import { Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Icons } from "components";
import { useAppDispatch } from "store/hooks";
import { Api } from "services";

import { LoginFailure, LoginSuccess } from "store/action/auth";
import LoginImage from "./icon/loginImage.svg";
import Input from "components/FIelds/Input";

import { IUser } from "type";

import "./style.scss";

const initialValues: IUser = {
  name: "",
  email: "",
  key: "",
  secret: "",
};

const Schema = yup.object().shape({
  name: yup.string().required("To'ldirish majburiy"),
  email: yup
    .string()
    .email("Email to'g'ri kiriting")
    .required("To'ldirish majburiy"),
  key: yup.string().required("To'ldirish majburiy"),
  secret: yup.string().required("To'ldirish majburiy"),
});

const SingIn = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: IUser, action: any) => {
    try {
      const { data } = await Api({
        url: "signup",
        method: "post",
        data: values,
      });
      const user: any = get(data, "data", {});
      window.localStorage.setItem("user", JSON.stringify(user));

      action(false);
      dispatch(LoginSuccess(user));
      toast.success("Success");
    } catch (error) {
      action(false);
      dispatch(LoginFailure());
      toast.error(get(error, "response.data.message"));
    }
  };

  return (
    <div className="login-page">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="form-container">
            <div className="logo">
              <svg
                width="56"
                height="49"
                viewBox="0 0 56 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="Logo_logo-img__wZiZW"
              >
                <g clipPath="url(#clip0_1_2)">
                  <path
                    d="M28.3984 43.8374L38.9314 25.7172C40.0765 23.7472 42.9218 23.7472 44.0668 25.7172L54.5998 43.8374C55.7507 45.8174 54.3223 48.3 52.0321 48.3H30.9661C28.6759 48.3 27.2475 45.8174 28.3984 43.8374Z"
                    fill="#195ED9"
                  ></path>
                  <path
                    d="M0.559819 43.7955L24.8449 1.49421C25.9887 -0.498143 28.8626 -0.498849 30.0074 1.49294L37.1917 13.9928C37.7209 14.9136 37.7195 16.0465 37.188 16.966L19.9595 46.7675C19.4275 47.6877 18.4453 48.2544 17.3824 48.2544H3.14141C0.853121 48.2544 -0.579482 45.7801 0.559819 43.7955Z"
                    fill="#195ED9"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_1_2">
                    <rect width="56" height="49" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="form">
              <h2 className="title mb-20">Boshqaruv paneli</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={Schema}
                onSubmit={(values, actions) => {
                  handleSubmit(values, actions.setSubmitting);
                }}
              >
                {({ isSubmitting }) => {
                  return (
                    <Form>
                      <Field name="name" component={Input} placeholder="name" />
                      <Field
                        name="email"
                        component={Input}
                        placeholder="Email"
                      />

                      <Field name="key" component={Input} placeholder="key" />
                      <Field
                        name="secret"
                        type="password"
                        component={Input}
                        placeholder="secret"
                      />

                      <LoadingButton
                        loading={isSubmitting}
                        color="secondary"
                        variant="contained"
                        type="submit"
                      >
                        Kirish
                      </LoadingButton>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </Grid>
        <Grid item xs={6} className="loginPageRight">
          <img draggable={false} src={LoginImage} alt="Login page image" />
        </Grid>
      </Grid>
    </div>
  );
};

export default SingIn;

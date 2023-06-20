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
              <Icons.Logo />
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

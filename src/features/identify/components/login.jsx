import logo from "@assets/images/logo.svg";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Link,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
  useRouteError,
  useSubmit,
} from "react-router-dom";
import { httpService } from "@core/https-service";
import { useEffect } from "react";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = useSubmit();
  const onSumbitForm = (data) => {
    submitForm(data, { method: "post" });
  };
  //for btn status
  const navigation = useNavigation();
  const isSubmetting = navigation.state !== "idle";

  //redirect to page
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  });

  //for error hanlder
  const isError = useRouteError();

  const isSuccessOperation = useActionData();
  //multi language
  const { t } = useTranslation();
  return (
    <>
      <div className="text-center mt-4">
        <img src={logo} alt="logo" style={{ height: "100px" }} />
        <h1 className="h2">{t("register.registerName")}</h1>
        <p className="lead">{t("register.registerTitle")}</p>
        <p className="lead">
          {t("register.registerLogIn")}
          <Link to="/register" className="me-2">
            {t("register.registerBtn")}
          </Link>
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSumbitForm)}>
              <div className="mb-3">
                <label htmlFor="form-label">
                  {t("register.registerMobile")}
                </label>
                <input
                  type="tel"
                  className={`form-control form-control-lg mt-2 ${
                    errors && "is-invalid"
                  }`}
                  {...register("mobile", {
                    required: t("login.loginMobileError1"),
                    minLength: 11,
                    maxLength: 11,
                  })}
                />

                {errors.mobile && errors.mobile.type === "required" && (
                  <p className="text-danger small fw-bold mt-2">
                    {errors.mobile?.message}
                  </p>
                )}

                {errors.mobile &&
                  (errors.mobile.type === "minLength" ||
                    errors.mobile.type === "maxLength") && (
                    <p className="text-danger small fw-bold mt-2">
                      {t("login.loginMobileError2")}
                    </p>
                  )}
              </div>
              {/*  */}
              <div className="mb-3">
                <lable className="fomr-label">
                  {t("register.registerPassword")}
                </lable>
                <input
                  type="password"
                  className={`form-control form-control-lg mt-2 ${
                    errors && "is-invalid"
                  }`}
                  {...register("password", {
                    required: t("login.loginPasswordError1"),
                    minLength: 5,
                  })}
                />

                {errors.password && errors.password.type === "required" && (
                  <p className="text-danger small fw-bold mt-2">
                    {errors.password?.message}
                  </p>
                )}

                {errors.password && errors.password.type === "minLength" && (
                  <p className="text-danger small fw-bold mt-2">
                    {" "}
                    {t("login.loginPasswordError2")}
                  </p>
                )}
              </div>

              <div className="text-center mt-3">
                <button
                  disabled={isSubmetting}
                  className="btn btn-lg btn-primary"
                  type="sumbit"
                >
                  {isSubmetting
                    ? t("login.loginBtnProgress")
                    : t("login.loginBtn")}
                </button>

                {isSuccessOperation && (
                  <div className="alert alert-success text-success py-2 px-4 mt-3">
                    {t("register.registerSuccess")}
                  </div>
                )}

                {isError && (
                  <div className="alert alert-danger text-danger py-2 px-4 mt-3">
                    {isError.response?.data.map((error) => {
                      return <p>{error.description}</p>;
                    })}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await httpService.post("/Users/login", data);
  if (response.status === 200) {
    localStorage.setItem("token", response?.data.token);
    return redirect("/");
  }
};

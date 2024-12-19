import logo from "@assets/images/logo.svg";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSumbitForm = (data) => {
    console.log(data);
  };

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
                    minLength: 11,
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
                <button className="btn btn-lg btn-primary" type="sumbit">
                  {t("login.loginBtn")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

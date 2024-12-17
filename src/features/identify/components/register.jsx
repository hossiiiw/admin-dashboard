import logo from "@assets/images/logo.svg";
import { useForm } from "react-hook-form";
import {
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useRouteError,
  useSubmit,
} from "react-router-dom";
import { httpService } from "../../../core/https-service";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
export const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const sumbitForm = useSubmit();
  const onSubmitForm = (data) => {
    const { confirmPassword, ...userData } = data;
    sumbitForm(userData, { method: "post" });
  };

  // for spinner
  const navigation = useNavigation();
  const isSubmetting = navigation.state !== "idle";
  // for show alert
  const isSuccessOperation = useActionData();

  //for redirect manually
  const navigate = useNavigate();

  //for handle error
  const isError = useRouteError();

  //multi language
  const { t } = useTranslation();
  useEffect(() => {
    if (isSuccessOperation) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [isSuccessOperation]);
  return (
    <>
      <div className="text-center mt-4">
        <img src={logo} alt="logo" style={{ height: "100px" }} />
        <h1 className="h2">{t("register.registerName")}</h1>
        <p className="lead">{t("register.registerTitle")}</p>
        <p className="lead">
          {t("register.registerLogIn")}
          <Link to="/login" className="me-2">
            {t("register.registerLog")}
          </Link>
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSubmitForm)}>
              {/*  */}
              <div className="mb-3">
                <label htmlFor="form-label">
                  {t("register.registerMobile")}
                </label>
                <input
                  type="tel"
                  className={`form-control form-control-lg mt-2 ${
                    errors.mobile && "is-invalid"
                  }`}
                  {...register("mobile", {
                    required: `${t("register.registerMobileError1")}`,
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
                      {t("register.registerMobileError2")}
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
                  className="form-control form-control-lg mt-2"
                  {...register("password", {
                    required: `${t("register.registerPasswordError1")}`,
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
                    {t("register.registerPasswordError2")}
                  </p>
                )}
              </div>
              {/*  */}
              <div className="mb-3">
                <lable htmlFor="form-label">
                  {t("register.registerConfirm")}
                </lable>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  {...register("confirm", {
                    required: `${t("register.registerConfirmError1")}`,
                    validate: (value) => {
                      if (watch("password") !== value) {
                        return t("register.registerConfirmError2");
                      }
                    },
                  })}
                />

                {errors.confirm && errors.confirm.type === "required" && (
                  <p className="text-danger small fw-bold mt-2">
                    {errors.confirm?.message}
                  </p>
                )}

                {errors.confirm && errors.confirm.type === "validate" && (
                  <p className="text-danger small fw-bold">
                    {errors.confirm?.message}
                  </p>
                )}
              </div>

              <div className="text-center mt-3">
                <button
                  disabled={isSubmetting}
                  className="btn btn-lg btn-primary"
                  type="sumbit"
                >
                  {t("register.registerBtn")}
                  {/* {isSubmetting ? "درحال انجام عملیات" : "وارد شوید"} */}
                </button>

                {isSuccessOperation && (
                  <div className="alert alert-success text-success p-2 mt-3">
                    عملیات با موفقیت انحام شد به صفحه ورود منتقل می شوید
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

export const registerAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData); // swap key/value to object
  const response = await httpService.post("/Users", data);
  return response.status === 200;
};

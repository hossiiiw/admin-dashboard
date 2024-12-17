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
        <h1 className="h2">پلتفرم آموزش آنلاین</h1>
        <p className="lead">
          جهت ورود لازم است از طریق موبایل و رمز عبور خود اقدام کنید
        </p>
        <p className="lead">
          قبلا ثبت نام ن کرده اید؟
          <Link to="/login" className="me-2">
            وارد شوید
          </Link>
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSubmitForm)}>
              {/*  */}
              <div className="mb-3">
                <label htmlFor="form-label">موبایل</label>
                <input
                  type="tel"
                  className={`form-control form-control-lg mt-2 ${
                    errors.mobile && "is-invalid"
                  }`}
                  {...register("mobile", {
                    required: "شماره موبایل صحیح نمی باشد",
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
                      شماره موبایل باید 11 رقمی باشد
                    </p>
                  )}
              </div>
              {/*  */}
              <div className="mb-3">
                <lable className="fomr-label">رمز عبور</lable>

                <input
                  type="password"
                  className="form-control form-control-lg mt-2"
                  {...register("password", {
                    required: "پسورد صحیح نمی باشد",
                    minLength: 12,
                  })}
                />

                {errors.password && errors.password.type === "required" && (
                  <p className="text-danger small fw-bold mt-2">
                    {errors.password?.message}
                  </p>
                )}

                {errors.password && errors.password.type === "minLength" && (
                  <p className="text-danger small fw-bold mt-2">
                    رمز وارد شده کوتاه است
                  </p>
                )}
              </div>
              {/*  */}
              <div className="mb-3">
                <lable htmlFor="form-label">تکرار رمز عبور</lable>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  {...register("confirm", {
                    required: "تکرار رمز عبور الزامی است",
                    validate: (value) => {
                      if (watch("password") !== value) {
                        return "رمز عبور با تکرار رمز عبور مطابقت ندارد";
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
                  {isSubmetting ? "درحال انجام عملیات" : "وارد شوید"}
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

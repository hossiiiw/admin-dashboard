import logo from "@assets/images/logo.svg";
import { useForm } from "react-hook-form";
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
  return (
    <>
      <div className="text-center mt-4">
        <img src={logo} alt="logo" style={{ height: "100px" }} />
        <h1 className="h2">پلتفرم آموزش آنلاین</h1>
        <p className="lead">
          جهت ورود لازم است از طریق موبایل و رمز عبور خود اقدام کنید
        </p>
        <p className="lead">
          قبلا ثبت نام نکرده اید؟
          <Link to="/register" className="me-2">
            ثبت نام کنید{" "}
          </Link>
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSumbitForm)}>
              <div className="mb-3">
                <label htmlFor="form-label">موبایل</label>
                <input
                  type="tel"
                  className={`form-control form-control-lg mt-2 ${
                    errors && "is-invalid"
                  }`}
                  {...register("mobile", {
                    required: "وارد کردن شماره موبایل الزامی است",
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
                  className={`form-control form-control-lg mt-2 ${
                    errors && "is-invalid"
                  }`}
                  {...register("password", {
                    required: "رمز عبور را وارد نمایید",
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
                    رمز عبور باید بیشتر از 10 رقم باشد
                  </p>
                )}
              </div>

              <div className="text-center mt-3">
                <button className="btn btn-lg btn-primary" type="sumbit">
                  وارد شوید
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

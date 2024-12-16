import logo from "@assets/images/logo.svg";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
export const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmitForm = (data) => {
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

import logo from "@assets/images/logo.svg";
import { Link } from "react-router-dom";

export const Login = () => {
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
            <form>
              <div className="mb-3">
                <label htmlFor="form-label">موبایل</label>
                <input
                  type="tel"
                  className="form-control form-control-lg mt-2"
                />
              </div>
              <div className="mb-3">
                <lable className="fomr-label">رمز عبور</lable>
                <input
                  type="password"
                  className="form-control form-control-lg mt-2"
                />
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

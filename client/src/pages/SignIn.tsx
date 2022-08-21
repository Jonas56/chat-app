import { useEffect, useState } from "react";
import { BsChatText } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useFormInputs } from "../app/hooks";
import { login } from "../app/redux/features/authSlice";
import { AppDispatch, RootState } from "../app/redux/store";
import { FormInput, Spinner, Toast } from "../components/common";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [inputs, handleInputChange] = useFormInputs({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    message: "",
    type: "",
  });
  const [showToast, setShowToast] = useState(false);

  const { isLoading, message, status, user } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login({ ...inputs }));
  };

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    if (status === "fulfilled" || user) {
      navigate("/");
    } else if (status === "rejected") {
      setShowToast(true);
      setToast({
        message: "" + message,
        type: "warning",
      });
    }
    setTimeout(() => {
      setShowToast(false);
      setToast({
        message: "",
        type: "",
      });
    }, 3000);
  }, [user, isLoading, status, message, navigate]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      {showToast && (
        <Toast
          message={toast.message}
          type={toast.type}
          show={showToast}
          handleShow={setToast}
        />
      )}

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {loading && <Spinner />}
        <a
          href="#login"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-200"
        >
          <BsChatText className="w-9 h-9 mr-2 text-primary-600" />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <FormInput
                label="Email or username"
                type="text"
                name="email"
                id="email"
                placeholder="jonas@tesla.com"
                required
                handleChange={handleInputChange}
              />
              <FormInput
                label="Password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                required
                handleChange={handleInputChange}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  to="#login"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account yet?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

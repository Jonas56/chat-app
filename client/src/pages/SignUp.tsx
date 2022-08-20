import { useEffect, useState } from "react";
import {
  AiFillGithub,
  AiOutlineGoogle,
  AiOutlineTwitter,
} from "react-icons/ai";
import { BsChatText } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { CreateUserRequest } from "../app/api/types";
import { useFormInputs } from "../app/hooks";
import { register } from "../app/redux/features/authSlice";
import { RootState } from "../app/redux/store";
import { FormInput, Spinner, Toast, Alert } from "../components/common";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [inputs, handleInputChange] = useFormInputs({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null as any);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(register(inputs as CreateUserRequest) as any);
  };

  const { isLoading, message, status, errorMessage, user } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    if (status === "fulfilled" || user) {
      setToast({
        show: true,
        message: "" + message,
        type: "success",
      });
      setTimeout(() => {
        setToast({
          show: false,
          message: "",
          type: "",
        });
      }, 3000);
      navigate("/");
    } else if (status === "rejected") {
      setError(errorMessage);
      setTimeout(() => {
        setError(null);
      }, 4000);
    }
  }, [isLoading, status, message, errorMessage, navigate, user]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <Toast
        message={toast.message}
        type={toast.type}
        show={toast.show}
        handleShow={setToast}
      />
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
              Create new Account
            </h1>
            {error && <Alert error={error} />}
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have one?{" "}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                login
              </Link>
            </p>
            <form className="space-y-2 md:space-y-4" onSubmit={handleSubmit}>
              <FormInput
                label="Full Name"
                type="text"
                name="name"
                id="name"
                placeholder="Issac Newton"
                required
                handleChange={handleInputChange}
              />
              <FormInput
                label="Username"
                type="text"
                name="username"
                id="username"
                placeholder="username"
                required
                handleChange={handleInputChange}
              />

              <FormInput
                label="Email"
                type="email"
                name="email"
                id="email"
                placeholder="name@example.com"
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
              {null && (
                <span className="ml-1 text-red-600 text-xs">{null}</span>
              )}

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
              >
                Sign Up
              </button>
              <div className="w-full flex items-center justify-between">
                <hr className="w-full bg-gray-400" />
                <p className="text-base leading-4 px-2.5 text-gray-400 ">or</p>
                <hr className="w-full bg-gray-400" />
              </div>
              <div className="text-center">
                <div className="flex justify-center">
                  <a
                    href="https://www.google.com"
                    type="button"
                    className="text-gray-500 bg-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-10 py-1.5 text-center mr-2 mb-2 border border-gray-300 shadow-sm"
                  >
                    <AiOutlineGoogle className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.twitter.com"
                    type="button"
                    className="text-gray-500 bg-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-10 py-1.5 text-center mr-2 mb-2 border border-gray-300 shadow-sm"
                  >
                    <AiOutlineTwitter className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.github.com/jonas56"
                    type="button"
                    className="text-gray-500 bg-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-10 py-1.5 text-center mr-2 mb-2 border border-gray-300 shadow-sm"
                  >
                    <AiFillGithub className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../api/authApi";
import type {
  AdminLoginResponse,
  AuthInterface,
} from "../../@type/authInterface";
import type { AppDispatch } from "../../store/Store";
import ErrorModule from "../../utils/ErrorModule";
import { useNavigate } from "react-router";

const schemaValidation = yup
  .object()
  .shape({
    email: yup.string().required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();

const Login = () => {
  const [showModal, setShowModal] = useState<boolean>();
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthInterface>({
    resolver: yupResolver(schemaValidation),
  });

  const submitNow = async (data: AuthInterface) => {
    try {
      const response: AdminLoginResponse = await dispatch(
        adminLogin(data),
      ).unwrap();
      if (response.success) {
        navigate("/otp");
      }
    } catch (error) {
      setMessage(error as string);
      setShowModal(true);
    }
  };

  return (
    <main className="min-vh-100 d-flex justify-content-center align-items-center">
      <ErrorModule
        showModal={showModal}
        setShowModal={setShowModal}
        message={message}
      />
      <section>
        <div className="container">
          <form className="row" onSubmit={handleSubmit(submitNow)}>
            <div className="col-12 col-lg-6">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                className="form-control"
                type="email"
                {...register("email")}
              />
              <p className="text-danger">{errors.email?.message}</p>
            </div>
            <div className="col-12 col-lg-6">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                className="form-control"
                type="password"
                {...register("password")}
              />
              <p className="text-danger">{errors.password?.message}</p>
            </div>
            <div className="col-12">
              <button
                disabled={isSubmitting}
                type="submit"
                className="btn-primary btn w-100 mt-5"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;

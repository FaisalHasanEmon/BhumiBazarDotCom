import { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { LuEye, LuEyeOff } from "react-icons/lu";
import {
  Link,
  useAsyncError,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Login.css";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useTheme from "../../../hooks/useTheme";

const Login = () => {
  const { login, googleLogin } = useAuth();
  const [seePassword, setSeePassword] = useState(false);
  const [loginAs, setLoginAs] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const { notifyError, notifySuccess } = useTheme();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data.email, data.password)
      .then((res) => {
        navigate(location?.state ? location.state : "/");
      })
      .then((er) => notifyError(er));
    reset();
  };
  // Handle Login as user button for quick login section
  const handleLoginAsUser = () => {
    const userCredentials = { email: "jhony@gmail.com", password: "Jhony12!" };
    setLoginAs(userCredentials);
  };
  // Handle Login as agent button for quick login section
  const handleLoginAsAgent = () => {
    const userCredentials = {
      email: "agent01@gmail.com",
      password: "Agent12!",
    };
    setLoginAs(userCredentials);
  };
  // Handle Login as admin button for quick login section
  const handleLoginAsAdmin = () => {
    const userCredentials = {
      email: "admin01@gmail.com",
      password: "Admin12!",
    };
    setLoginAs(userCredentials);
  };

  const handleLoginWithGoogle = () => {
    googleLogin().then((res) => {
      const newUser = {
        name: res.user.displayName,
        email: res.user.email,
        photo: res.user.photoURL,
        creationTime: res.user.metadata.creationTime,
        role: "user",
      };
      axiosPublic
        .post("/users", newUser)
        .then(navigate(location?.state ? location.state : "/"));
    });
  };
  return (
    <div className="bg-no-repeat ">
      <div className=" bg-authLoginBg min-h-[calc(100vh-78px)]   bg-cover md:bg-top bg-center w-screen  absolute left-0 flex justify-center items-center ">
        <div className="container mx-auto px-5  flex justify-center items-center bg-transparent ">
          <div className=" card bg-white/5 backdrop-blur-lg w-full max-w-sm shrink-0 border border-white  shadow-slate-900 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <h2 className="text-center text-3xl">Login </h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Quick Login</span>
                </label>
                <div className="flex justify-center items-center gap-1">
                  <button
                    onClick={handleLoginAsUser}
                    className="btn btn-xs bg-green-500 rounded-[6px] text-white font-bold"
                  >
                    Login As User
                  </button>
                  <button
                    onClick={handleLoginAsAgent}
                    className="btn btn-xs bg-green-500 rounded-[6px] text-white font-bold"
                  >
                    Login As Agent
                  </button>
                  <button
                    onClick={handleLoginAsAdmin}
                    className="btn btn-xs bg-green-500 rounded-[6px] text-white font-bold"
                  >
                    Login As Admin
                  </button>
                </div>
              </div>
              <div className="divider my-0"></div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  defaultValue={loginAs?.email}
                  {...register("email", { required: true })}
                />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={seePassword ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered"
                  defaultValue={loginAs?.password}
                  {...register("password", {
                    required: true,
                    pattern:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                    minLength: 6,
                  })}
                />
                {errors.password?.type === "pattern" && (
                  <span className="passwordError">
                    Password must consists of at least one uppercase, one lower
                    case, one number and an especial character.
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="passwordError">
                    Password length must be greater than or equal 6
                  </span>
                )}
                <div
                  onClick={() => setSeePassword(!seePassword)}
                  className="absolute right-5 top-[52px]"
                >
                  {seePassword ? <LuEye></LuEye> : <LuEyeOff></LuEyeOff>}
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn border-2 bg-white border-gray-600 hover:bg-gray-600 hover:text-white hover:font-bold">
                  Login
                </button>
              </div>
              <div className="divider">Social Login</div>
              <div className="form-control">
                <button
                  onClick={handleLoginWithGoogle}
                  className="btn border-2 bg-white border-gray-600 hover:bg-gray-600 hover:text-white  hover:font-bold"
                >
                  <BsGoogle></BsGoogle> Sign In With Google
                </button>
              </div>
              <div>
                <h2>
                  Doesn't have an account?
                  <Link to="/signup">
                    <span className="font-bold"> Please Register</span>
                  </Link>
                </h2>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
// import { BsGoogle } from "react-icons/bs";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./SignUp.css";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useTheme from "../../../hooks/useTheme";

const SignUp = () => {
  const { createUser, user, updateUser, logout } = useAuth();
  const [seePassword, setSeePassword] = useState(false);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { notifySuccess } = useTheme();
  //   const
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Step 1:After submitting the sign up form do next
  const onSubmit = (formData) => {
    //Step 2: collecting the user name, email and password create user with "email and password"
    createUser(formData.email, formData.password)
      .then((data) => {
        //Step 3: after successfully creating the user take the user name, email and other information for storing data to database
        const newUser = {
          email: data.user.email,
          name: formData.name,
          photo: "",
          role: "user",
          creationTime: data.user.metadata.creationTime,
        };

        // Step 3.1: Post or update to database
        axiosPublic
          .post("/users", newUser)
          .then((res) => {
            console.log(res.data);
            if (res.data.acknowledged) {
              notifySuccess("Signup Successful! Now Login");
            }
          })
          .catch((er) => console.log(er));
        //Step 4: After successfully creating an user with email and password update user name
        updateUser(formData.name, "")
          .then(() => {
            // Step 5: After successfully updating the user name navigate the user to home page
            logout();
            navigate("/login");
          })
          .catch((er) => console.log(er));
      })
      .catch((er) => console.log(er));

    reset();
  };
  return (
    <div className=" bg-authLoginBg bg-no-repeat  bg-cover md:bg-top bg-center w-screen h-screen absolute left-0 flex justify-center items-center">
      <div className="container mx-auto px-5  flex justify-center items-center bg-transparent ">
        <div className=" card bg-white/5 backdrop-blur-lg w-full max-w-sm shrink-0 border border-white  shadow-slate-900 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h2 className="text-center text-3xl">SignUp</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                {...register("name", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
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
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                  minLength: 6,
                })}
              />
              {/* {console.log(errors)} */}
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
                Sign Up
              </button>
            </div>

            <div>
              <h2>
                Already have an account?
                <Link to="/login">
                  <span className="font-bold">Login</span>
                </Link>
              </h2>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

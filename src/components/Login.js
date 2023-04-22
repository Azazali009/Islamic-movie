import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { query, where, getDocs } from "firebase/firestore";
import { usersRef } from "../firebase/firebase";
import swal from "sweetalert";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { AppState } from "../App";
import { useContext } from "react";

const Login = () => {
  const useAppState = useContext(AppState);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const quer = query(usersRef, where("mobile", "==", form.mobile));
      const querySnapShot = await getDocs(quer);
      querySnapShot.forEach((doc) => {
        const _data = doc.data();
        const isMatch = bcrypt.compareSync(form.password, _data.password);

        if (isMatch) {
          swal({
            title: "Success.",
            text: "Successfully logged in to the application",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          useAppState.setLogin(true);
          useAppState.setUserName(_data.name);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          swal({
            title: "Invalid Credentials.",
            text: "Invalid Phone number or password! try agian with correct ones.",
            icon: "error",
            buttons: false,
            timer: 3000,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div>
      <section class=" text-white body-font relative">
        <div class="container px-5 py-10 mx-auto">
          <div class="flex flex-col text-center w-full mb-6">
            <h1 class="sm:text-3xl text-2xl font-medium title-font ">Login</h1>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm">
                    Mobile No
                  </label>
                  <input
                    type="number"
                    id="name"
                    name="title"
                    value={form.mobile}
                    onChange={(e) =>
                      setForm({ ...form, mobile: e.target.value })
                    }
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div class="p-2 w-full">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm">
                    Password
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="title"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <p className="md:text-right mt-2 text-gray-500">
                  Don't have an account?{" "}
                  <Link to={"/signup"}>
                    <span className="text-blue-700 hover:text-blue-800">
                      Sign up
                    </span>
                  </Link>
                </p>
              </div>

              <div class="p-2 w-full">
                <button
                  onClick={login}
                  class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
                >
                  {loading ? (
                    <TailSpin height={25} color="white"></TailSpin>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { TailSpin } from "react-loader-spinner";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import app from "../firebase/firebase";
import { usersRef } from "../firebase/firebase";
import { addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
const auth = getAuth(app);

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [OTP, setOTP] = useState("");

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          //reCAPTCHA solved, allow signInWithPhoneNumber,
        },
      },
      auth
    );
  };

  const requestOtp = () => {
    setLoading(true);
    generateRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+92${form.mobile}`, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        swal({
          title: "OTP Sent",
          icon: "success",
          timer: 3000,
          buttons: false,
        });
        setLoading(false);
        setOtpSent(true);
      })
      .catch((error) => {
        swal({
          title: "Failed",
          text: "Failed to sent OTP. Try again later",
          icon: "error",
          timer: 3000,
          buttons: false,
        });
        console.log(error);
        setLoading(false);
      });
  };

  const verifyOTP = async () => {
    setLoading(true);
    try {
      await window.confirmationResult.confirm(OTP);
      uploadData();
      swal({
        title: "You Registered successfully",
        timer: 5000,
        buttons: false,
        icon: "success",
      });

      navigate("/login");
    } catch (error) {
      swal({
        title: "Please input correct OTP!",
        timer: 5000,
        buttons: false,
        icon: "error",
      });
      console.log(error);
    }
    setLoading(false);
  };
  const uploadData = async () => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(form.password, salt);
    await addDoc(usersRef, {
      name: form.name,
      password: hash,
      mobile: form.mobile,
    });
  };
  return (
    <div>
      <section class=" text-white body-font relative">
        <div class="container px-5 py-10 mx-auto">
          <div class="flex flex-col text-center w-full mb-6">
            <h1 class="sm:text-3xl text-2xl font-medium title-font ">
              Sign up
            </h1>
          </div>
          {otpSent ? (
            <>
              <div class="p-2 w-full md:w-1/3 mx-auto">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm">
                    OTP
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="title"
                    value={OTP}
                    onChange={(e) => setOTP(e.target.value)}
                    required
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <p className="text-right mt-2 text-gray-500">
                  Already have an account?
                  <Link to={"/login"}>
                    {" "}
                    <span className=" text-blue-500 hover:text-blue-600 hover:underline">
                      Log in
                    </span>
                  </Link>
                </p>
              </div>
              <div class="p-2 w-full">
                <button
                  onClick={verifyOTP}
                  class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-sm"
                >
                  {loading ? (
                    <TailSpin height={25} color="white"></TailSpin>
                  ) : (
                    "Confirm OTP"
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              <div class="lg:w-1/2 md:w-2/3 mx-auto">
                <div class="flex flex-wrap -m-2">
                  <div class="p-2 w-full">
                    <div class="relative">
                      <label for="name" class="leading-7 text-sm">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="title"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  </div>

                  <div class="p-2 w-full">
                    <div class="relative">
                      <label for="name" class="leading-7 text-sm">
                        Mobile No
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="title"
                        required
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
                        type="password"
                        id="name"
                        name="title"
                        required
                        value={form.password}
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                        class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                    <p className="md:text-right mt-2 text-gray-500">
                      Already have an account?
                      <Link to={"/login"}>
                        {" "}
                        <span className="text-blue-700 hover:text-blue-800">
                          Log in
                        </span>
                      </Link>
                    </p>
                  </div>
                  <div class="p-2 w-full">
                    <button
                      onClick={requestOtp}
                      class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-sm capitalize"
                    >
                      {loading ? (
                        <TailSpin height={25} color="white"></TailSpin>
                      ) : (
                        "request OTP"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div id="recaptcha-container"></div>
      </section>
    </div>
  );
};

export default Signup;

import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { moviesRef } from "../firebase/firebase";
import swal from "sweetalert";
import { AppState } from "../App";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Addmovie = () => {
  const useAppState = useContext(AppState);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    year: "",
    image: "",
    description: "",
    rating: 0,
    rated: 0,
  });

  const [loading, setLoading] = useState(false);

  const addData = async () => {
    setLoading(true);
    try {
      if (useAppState.login) {
        await addDoc(moviesRef, form);
        swal({
          title: "Success",
          text: "Movie added successfully",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setForm({
          title: "",
          year: "",
          image: "",
          description: "",
        });
      } else {
        toast.error("Only Logged user could add movies!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      swal({
        title: error,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setLoading(false);
  };

  return (
    <div>
      <section class=" text-white body-font relative">
        <div class="container px-5 py-10 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font ">
              Add Movie
            </h1>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm">
                    Title
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="title"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="Year" class="leading-7 text-sm">
                    Year
                  </label>
                  <input
                    type="Number"
                    id="Year"
                    name="year"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div class="p-2 w-full">
                <div class="relative">
                  <label for="image" class="leading-7 text-sm">
                    Image Link
                  </label>
                  <input
                    id="image"
                    name="image"
                    value={form.image}
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.value })
                    }
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div class="p-2 w-full">
                <div class="relative">
                  <label for="description" class="leading-7 text-sm">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <button
                  onClick={addData}
                  class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
                >
                  {loading ? <TailSpin height={25} color="white" /> : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Addmovie;

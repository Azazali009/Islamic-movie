import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { reviewsRef, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import swal from "sweetalert";
import { AppState } from "../App";
import { useContext } from "react";

const Reviews = ({ id, prevRating, userRated }) => {
  const useAppState = useContext(AppState);
  const navigate = useNavigate();
  const [rating, setRating] = useState();
  const [input, setInput] = useState("");
  const [loader, setLoader] = useState(false);
  const [reviewLoader, setReviewLoader] = useState(true);
  const [data, setData] = useState([]);
  const [newReview, setNewReview] = useState(false);

  const sentReview = async () => {
    setLoader(true);
    try {
      if (useAppState.login) {
        await addDoc(reviewsRef, {
          movieId: id,
          rating: rating,
          thought: input,
          timestamp: new Date().getTime(),
          name: useAppState.userName,
        });
        swal({
          title: "Sent",
          text: "You successfully sent your thought",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        const ref = doc(db, "movies", id);
        await updateDoc(ref, {
          rating: prevRating + rating,
          rated: userRated + 1,
        });
        setRating(0);
        setInput("");
        setNewReview(true);
      } else {
        toast.error("Only logged in user could share reviews.");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      swal({
        title: "Something went wrong!",
        text: "Try to select some stars for rating",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setLoader(false);
  };

  useEffect(() => {
    async function getReviews() {
      setReviewLoader(true);
      setData([]);
      let quer = query(reviewsRef, where("movieId", "==", id));
      const querySnapShot = await getDocs(quer);
      querySnapShot.forEach((doc) => {
        setData((prv) => [...prv, doc.data()]);
      });
      setReviewLoader(false);
    }
    getReviews();
  }, [newReview]);

  return (
    <div className="w-full mt-4">
      <div className="flex flex-col">
        <ReactStars
          half={true}
          edit={true}
          size={25}
          value={rating}
          onChange={(rate) => setRating(rate)}
        />
        <p className="text-sm text-gray-500 -mt-2 mb-2">
          Tap the stars for rating?
        </p>
      </div>
      <input
        placeholder="Share your thoughts..."
        className="p-2 w-full review_input outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={sentReview}
        className=" bg-green-600 cursor-pointer hover:bg-green-500 mt-2 p-2 w-full"
      >
        {loader ? (
          <div className="flex justify-center">
            <TailSpin height={25} color="white" />
          </div>
        ) : (
          "Share"
        )}
      </button>
      {reviewLoader ? (
        <div className="flex mt-4 justify-center">
          <ThreeDots color="white" height={10} />
        </div>
      ) : (
        data.map((el, i) => {
          return (
            <div key={i} className=" p-0 md:p-2 m-0 md:m-2 mt-4 review_box">
              <div className="flex ">
                <p className=" uppercase font-bold text-yellow-300">
                  {el.name}
                </p>
                <p className=" ml-auto">
                  {new Date(el.timestamp).toLocaleString()}
                </p>
              </div>
              <ReactStars
                half={true}
                edit={false}
                size={15}
                value={el.rating}
                onChange={(rate) => setRating(rate)}
              />
              <p>{el.thought}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Reviews;

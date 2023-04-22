import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import Reviews from "./Reviews";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Bars } from "react-loader-spinner";

const Detail = () => {
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState({
    title: "",
    year: "",
    image: "",
    description: "",
    rating: 0,
    rated: 0,
  });
  useEffect(() => {
    async function getData() {
      setLoader(true);
      const _doc = doc(db, "movies", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setLoader(false);
    }
    getData();
  }, []);

  return (
    <>
      {loader ? (
        <div className="w-full h-96 flex justify-center items-center">
          <Bars height={40} />
        </div>
      ) : (
        <div className=" detail flex flex-col md:flex-row p-0 md:p-8">
          <div className=" w-full m-0 md:w-1/2 img__box">
            <img
              className=" block md:sticky top-28 h-96 md:mb-0 mb-6 "
              src={data.image}
              alt=""
            />
          </div>

          <div className=" w-full  md:w-1/2 ml-1 px-6 ">
            <h2 className=" text-2xl font-bold ">
              {data.title}{" "}
              <span className=" text-lg text-gray-300">({data.year})</span>
            </h2>
            <ReactStars
              edit={false}
              count={5}
              size={20}
              value={data.rating / data.rated}
            />
            <p className="mt-5 border-b-2 pb-4">{data.description} </p>
            <Reviews id={id} prevRating={data.rating} userRated={data.rated} />
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;

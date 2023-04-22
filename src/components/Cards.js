import React, { useState, useEffect } from "react";
import ReactStars from "react-stars";
import { ThreeDots } from "react-loader-spinner";
import { getDocs } from "firebase/firestore";
import { moviesRef } from "../firebase/firebase";
import { Link } from "react-router-dom";

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoader] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoader(true);
      const _data = await getDocs(moviesRef);
      _data.forEach((doc) => {
        setData((prv) => [...prv, { ...doc.data(), id: doc.id }]);
      });
      setLoader(false);
    }
    getData();
  }, []);
  return (
    <div className="w-full cards grid justify-stretch md:justify-center items-stretch md:gap-8 sm:gap-4 gap-2 md:p-8 mt-5">
      {loading ? (
        <div className="w-full flex items-center justify-center h-96 ">
          <ThreeDots height={30} />
        </div>
      ) : (
        data.map((el, i) => {
          return (
            <Link to={`/detail/${el.id}`}>
              <div
                key={i}
                className="card mb-8 md:mb-0 rounded overflow-hidden w-full flex-1 shadow-2xl pb-4 hover:-translate-y-3 transition-all duration-500 cursor-pointer"
              >
                <img
                  className="mb-4 h-72 w-full object-cover"
                  src={el.image}
                  alt=""
                />
                <h2>Name: {el.title}</h2>
                <h2>year:{el.year}</h2>
                <h2 className="flex items-center">
                  <span className="mr-2">Rating : </span>{" "}
                  <ReactStars
                    edit={false}
                    count={5}
                    size={20}
                    value={el.rating / el.rated}
                  />
                </h2>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Cards;

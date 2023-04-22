import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { AppState } from "../App";
import { useContext } from "react";

const Header = () => {
  const useAppState = useContext(AppState);
  return (
    <div className="header flex sticky top-0 z-10 items-center justify-between p-1 md:p-3 border-b">
      <Link to={"/"}>
        <h2 className="text-red-500 font-bold md:text-2xl font-serif ">
          Islamic <span className="text-white">Dramas</span>
        </h2>
      </Link>
      {useAppState.login ? (
        <Link to={"/addMovie"}>
          <Button className="flex items-center ">
            <AddIcon color="secondary" className="mr-1" />
            <h2 className="text-white text-sm">add new</h2>
          </Button>
        </Link>
      ) : (
        <Link to={"/login"}>
          <Button className="flex items-center ">
            <h2 className="text-white rounded bg-green-500 capitalize p-1 px-4 hover:shadow-xl hover:bg-green-600 transition-all duration-150">
              login
            </h2>
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Header;

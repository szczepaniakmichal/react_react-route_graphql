import React from "react";
import { Link } from "react-router-dom";

export const HomePage = () => {
    return (
        <Link to='/continents/'
              className="block p-2 bg-yellow-300 hover:bg-yellow-400 transition duration-300"
        >Go to continent list</Link>
    )
}
import React from 'react';
import { Link } from "react-router-dom";

export const Error = () => (
    <>
        <h2 className="p-2 bg-yellow-200 text-center">Page not found</h2>
        <Link to='/'
              className="block mb-5 p-2 text-center bg-yellow-300 hover:bg-yellow-400 transition duration-300"
        >Go back to home page</Link>
    </>

)
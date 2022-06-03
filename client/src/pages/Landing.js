import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="container-fluid">
        <div className="row my-5">
            <h1 className="text-center my-5">Welcome</h1>
        </div>
        <div className="row my-5">
            <p className="text-center">Welcome to Pet Planet! <br /> An out-of-this-world Pet care experiance</p>
        </div>
        <div className="row justify-content-center mt-5">
            <button className="col-3 mx-2 p-3">
                <Link to="/SignupForm">
                Adopt New
                </Link>
            </button>
            <button className="col-3 mx-2">
                <Link to="/LoginForm">
                Existing Pet
                </Link>
            </button>
        </div>
    </div>
  );
};

export default Landing;

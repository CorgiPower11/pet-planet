
import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery,  } from "@apollo/client";
import { QUERY_USER, QUERY_PET, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
// Get information from database about which photo to display,
//it could be either the photo itself or a refernce to a photo
//

const Pets = () => {

    // use useQuery hook to make query request 
    const { data, loading } = useQuery(QUERY_PET);

    const pet = data?.pet || [];

    return (
        <div className="container-fluid">

        {/* <!-- Pets Name Row --> */}
        <div className="row mt-5 justify-content-center">
            <div className="col-3 border border-dark box py-1">
            <h1 className="text-center" id="petName">{pet.petName}</h1>
            </div>
        </div>

        {/* <!-- Pet Picture Row --> */}
        <div className="row justify-content-center">
            <div className="col-md-4 text-center mt-3">
                <img src={pet.imgName} className="img-fluid" alt="Alien"/>
            </div>
        </div>

        {/* <!-- Pet stats Row --> */}
        <div className="row justify-content-center mt-2">
            <div className="col-2 text-center border border-dark py-2 box">
                <h4>Hunger: {pet.hunger}</h4>
            </div>
            <div className="col-2 text-center border border-dark py-2 mx-2 box">
                <h4>Thirst: {pet.thirst}</h4>
            </div>
            <div className="col-2 text-center border border-dark py-2 box">
                <h4>Affection: {pet.affection}</h4>
            </div>
        </div>
      </div>
  );
};

export default Pets;

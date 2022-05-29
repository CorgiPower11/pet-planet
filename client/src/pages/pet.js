import React from "react";
import jarjar from "../assets/img/Jar-Jar.png"// TEMP FOR EXAMPLE DELETE IN PROD

const Pets = () => {
    return (
        <div className="container-fluid">

        {/* <!-- Pets Name Row --> */}
        <div className="row mt-5 justify-content-center">
            <div className="col-3 border border-dark box py-1">
            <h1 className="text-center" id="petName">Harold</h1>
            </div>
        </div>

        {/* <!-- Pet Picture Row --> */}
        <div className="row justify-content-center">
            <div className="col-md-4 text-center mt-3">
                <img src={jarjar} className="img-fluid" />
            </div>
        </div>

        {/* <!-- Pet stats Row --> */}
        <div className="row justify-content-center mt-2">
            <div className="col-2 text-center border border-dark py-2 box">
                <h4>Hunger:</h4>
            </div>
            <div className="col-2 text-center border border-dark py-2 mx-2 box">
                <h4>Thirst:</h4>
            </div>
            <div className="col-2 text-center border border-dark py-2 box">
                <h4>Affection:</h4>
            </div>
        </div>
    </div>
    );
}

export default Pets;
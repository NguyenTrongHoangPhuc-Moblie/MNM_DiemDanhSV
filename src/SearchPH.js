import Header from "./Header";
import { useState } from "react";
function SearchPH() {
    return (
        <div>
            <Header />
            <div className="col-sm-6 offset-sm-3">
            <h1>Search Phong hoc</h1>
            <br />
            <input type="text" className="form-control" placeholder="Search" />
            </div>
        </div>
    )
}

export default SearchPH
import Header from "./Header";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
function UpdateDepartment(props) {
  const { id } = useParams();
  const [values, setValues] = useState({
    MaPH: id,
    TenPH: "",
    DiaChiPH: "",
  });

  console.warn("TenPH", id);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/layPH/" + id)
      .then((res) => {
        setValues({
          ...values,
          TenPH: res.data.TenPH,
          DiaChiPH: res.data.DiaChiPH,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Header />
      <h1>UpdateDepartment Page</h1>
      <form className="col-sm-4 offset-sm-4">
        <input
          className="form-control"
          type="text"
          value={values.TenPH}
        ></input>
        <br />
        <input className="form-control" type="text" value={values.DiaChiPH}></input>
        <br />
        <button className="btn btn-success">Cap nhat phong hoc</button>
        </form>
    </div>
  );
}

export default UpdateDepartment;

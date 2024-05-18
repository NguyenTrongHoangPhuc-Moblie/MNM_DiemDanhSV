import React, {useState} from 'react'
import Header from "./Header";
function AddDepartment() {
    const [TenPH, setTenPH] = useState("")
    const [DiaChiPH, setDiaChiPH] = useState("")
    async function them() {
        console.warn(TenPH, DiaChiPH)
        const formData = new FormData();
        formData.append('TenPH', TenPH);
        formData.append('DiaChiPH', DiaChiPH);
        let result = await fetch("http://localhost:8000/api/themPhongHoc", {
            method: 'POST',
            body: formData
        });
        alert("Du lieu da duoc luu")
    }
    return (
        <div>
            <Header />
            <h1>AddDepartment Page</h1>
            <div className="col-sm-6 offset-sm-3">
            <input type="text" className="form-control" onChange={(e) =>setTenPH(e.target.value)} placeholder="Ten phong" />
            <br />
            <input type="text" className="form-control" onChange={(e) =>setDiaChiPH(e.target.value)} placeholder="Dia chi phong" />
            <br />
            <button onClick={them} className="btn btn-primary">Them phong hoc</button>
            </div>
        </div>
    )
}

export default AddDepartment
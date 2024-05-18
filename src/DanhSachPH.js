import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
function DanhSachPH() {
  const [data, setData] = useState([]);

  const truyXuat = async () => {
    let result = await fetch("http://localhost:8000/api/danhSachPH");
    result = await result.json();
    setData(result);
  };
  

  useEffect(() => {
    truyXuat();
  }, []);

  async function xoaPhong(id) {
    let result = fetch("http://localhost:8000/api/xoaPH/" + id, {
      method: "DELETE",
    });
    result = (await result).json();
    truyXuat();
  }

  return (
    <div>
      <Header />
      <h1>Danh sach phong hoc</h1>
      <div className="col-sm-10 offset-sm-1">
        <Table>
          <tr>
            <td>MaPH</td>
            <td>TenPH</td>
            <td>DiaChiPH</td>
            <td colSpan={2}>Chuc nang</td>
          </tr>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.MaPH}</td>
              <td>{item.TenPH}</td>
              <td>{item.DiaChiPH}</td>
              <td>
                <span
                  onClick={() => xoaPhong(item.MaPH)}
                  className="btn btn-danger"
                >
                  Xoa
                </span>
              </td>
              <td>
                <Link to={`/update/${item.MaPH}`}>
                  <span
                    className="btn btn-warning"
                  >
                    Cap nhat
                  </span>
                </Link>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}

export default DanhSachPH;

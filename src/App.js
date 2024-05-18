import logo from "./logo.svg";
import "./App.css";
import { Button } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import AddDepartment from "./AddDepartment";
import UpdateDepartment from "./UpdateDepartment";
import EditDepartment from "./EditDepartment";
import Protected from "./Protected";
import DanhSachPH from './DanhSachPH';
import SearchPH from "./SearchPH";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <header className="App-header">
        </header> */}
        <Routes>
          <Route path="/login" element={<Login></Login>}>
          </Route>
          <Route path="/register" element={<Register></Register>}>
          </Route>
          <Route path="/" element={<Protected Cmp={DanhSachPH} />}>
          </Route>
          <Route path="/update/:id" element={<Protected Cmp={UpdateDepartment} />}>
          </Route>
          <Route path="/add" element={<Protected Cmp={AddDepartment} />}>
          </Route>
          <Route path="/search" element={<Protected Cmp={SearchPH} />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

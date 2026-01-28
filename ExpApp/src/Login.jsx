import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import logo from './assets/expences.png';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from './AuthContext';
import {useContext} from 'react';

const Login = () => {

const navigate = useNavigate();
const [nm, setNm] = useState("");
const [mob, setMob] = useState("");
const [opbl, setOpbal] = useState("");
const [umob, setUMob] = useState("");

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


let hndlnm = (e) => {setNm(e.target.value)};
let hndlmob = (e) => {setMob(e.target.value)};
let hndlopbal = (e) => {setOpbal(e.target.value)};
let hndlumob = (e) => {setUMob(e.target.value)};
const{setUser} = useContext(AuthContext);

let reg = () => {
  alert(nm + mob + opbl);

  axios.get(
    "https://codingshika.com/APP/EXP/add_user.php?mobile=" + mob + "&uname=" + nm + "&opbal=" + opbl
  )
  .then(res => {
    if (res.data.posts.status === "200") {
      alert("User Registered Successfully");
      setShow(false);
    } else {
      alert("Failed to Register User");
      setShow(false);
    }
  })
};

let login = () => {
 

  axios.get(
    "https://codingshika.com/APP/EXP/user_login.php",
    {
      params: {
        Mobile: umob
      }
    }
  )
  .then(res => {
    console.log("LOGIN RESPONSE:", res.data);

    if (res.data.posts.status === "200") {
      alert("Login Successfully");
      console.log(res.data.posts.id);
      console.log(res.data.posts.name);
      localStorage.setItem("id", res.data.posts.id);
      localStorage.setItem("name", res.data.posts.name);
      setUser({ id: res.data.posts.id, uname: res.data.posts.name });
      navigate('/dash');
    } else {
      alert("Login Failed");
      
    }
  })
  .catch(err => {
    console.error(err);
    alert("Server Error");
  });
};

return (
 <>
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Add New User</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <Form.Control type="text" onChange={hndlnm} placeholder="Enter a Name:" />
      <br />
      <Form.Control type="number" onChange={hndlmob} placeholder="Enter a Mobile:" />
      <br />
      <Form.Control type="number" onChange={hndlopbal} placeholder="Enter Opening Balance:" />
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>Close</Button>
      <Button variant="primary" onClick={reg}>Save Changes</Button>
    </Modal.Footer>
  </Modal>

  <div className="d-flex justify-content-center align-items-center vh-100 bg-primary">
    <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
      <img style={{ width: "100%", height: "25%" }} src={logo} alt="logo" />
      <h3 className="text-center mb-4">Login</h3>

      <div className="mb-3">
        <label className="form-label">Mobile Number</label>
        <input
          type="number"
          onChange={hndlumob}
          className="form-control"
          placeholder="Enter mobile number"
        />
      </div>

      <button className="btn btn-primary w-100" onClick={login}>
        Login
      </button>

      <a href="#" onClick={handleShow}>New User? Signup</a>
    </div>
  </div>
 </>
);
}

export default Login;

import React from "react";
import {useContext} from 'react';
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";


export default function Dash() {
  const navigate = useNavigate();
  const[ttlc, setTtlc]=useState("");
  const[ttld,setTtld]=useState("");
 const user = useContext(AuthContext);
 

  

 

  const handleLogout=()=>{
    alert("Logged Out Successfully");
    navigate("/");
  };



//debit states
const [dshow, setDShow] = useState(false);
const dhandleClose = () => setDShow(false);
const dhandleShow = () => setDShow(true);
const [ddt, setDDate] = useState("");
const [damt, setDAmt] = useState("");
const [dnt, setDNote] = useState("");
let dhndldt = (e) => {setDDate(e.target.value)};
let dhndlamt= (e) => {setDAmt(e.target.value)};
let dhndlnt = (e) => {setDNote(e.target.value)};


//credit states
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const[data,setData] = useState([]);
const [dt, setDate] = useState("");
const [amt, setAmt] = useState("");
const [nt, setNote] = useState("");
const[id, setId] = useState(Number(localStorage.getItem("id"))||0);
const val=0;
let hndldt = (e) => {setDate(e.target.value)};
let hndlamt= (e) => {setAmt(e.target.value)};
let hndlnt = (e) => {setNote(e.target.value)};




  const [opbl, setOpbal] = useState(0);
  let opbal=()=>{
    axios.get(
      "https://codingshika.com/APP/EXP/opbal_list.php?uid="+id)
    .then(res => {
      if(res.data.posts.status==="200"){
        console.log(res.data)
        setOpbal(res.data.posts.post[0]['OPBAL']);
      }else{
        alert("Error");
      }
    })
  }



  let tran=()=>{
    axios.get(
      "https://codingshika.com/APP/EXP/transaction_list.php?uid="+id)
    .then(res => {
      if(res.data.posts.status==="200"){
        console.log(res.data)
        setData(res.data.posts.post);
        const totalc = res.data.posts.post.reduce((sum,item)=>sum + Number(item.CREDIT) ,0);
        setTtlc(totalc);
        const totald = res.data.posts.post.reduce((sum,item)=>sum + Number(item.DEBIT) ,0);
        setTtld(totald);
      }else{
        alert("Error");
      }
    })
  }

let credit = () => {
  alert(dt + amt + nt + val);

  axios.get(
    "https://codingshika.com/APP/EXP/insert_credit.php?date=" + dt + "&note=" + nt + "&debit=" + val + "&credit=" + amt + "&uid=" +id)
  
  .then(res => {
    if (res.data.posts.status === "200") {
      alert("Credit Success");
      opbal();
      tran();
      setShow(false);
    } else {
      alert("Failed");
      setShow(false);
    }
  })
};

let debit = () => {
  alert(ddt + damt + dnt + val);

  axios.get(
    "https://codingshika.com/APP/EXP/insert_debit.php?date=" + ddt + "&note=" + dnt + "&debit=" + damt + "&credit=" + val + "&uid=" +id )
  
  .then(res => {
    if (res.data.posts.status === "200") {
      alert("Debit Success");
      opbal();
      tran();
      setDShow(false);
    } else {
      alert("Failed");
      setDShow(false);
    }
  })
};





  //onload
  useEffect(() => {
    opbal()
    tran()
  }, []);
  return (
    <>


     {/*Add Credit*/}
   <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Add Credit</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <Form.Control type="date" onChange={hndldt} placeholder="Slect Date:" />
      <br />
      <Form.Control type="number" onChange={hndlamt} placeholder="Credit Amount:" />
      <br />
      <Form.Control type="text" onChange={hndlnt} placeholder="Note:" />
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>Close</Button>
      <Button variant="primary" onClick={credit}>Add Credit</Button>
    </Modal.Footer>
  </Modal>

{/*Add Debit*/}
<Modal show={dshow} onHide={dhandleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Add Debit</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <Form.Control type="date" onChange={dhndldt} placeholder="Slect Date:" />
      <br />
      <Form.Control type="number" onChange={dhndlamt} placeholder="Credit Amount:" />
      <br />
      <Form.Control type="text" onChange={dhndlnt} placeholder="Note:" />
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary" onClick={dhandleClose}>Close</Button>
      <Button variant="primary" onClick={debit}>Add Debit</Button>
    </Modal.Footer>
  </Modal>




    <div className="container mt-4">
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body py-3 px-4">
          <div className="d-flex justify-content-between align-items-center">
            {/* Left: Brand */}
            <h5 className="fw-bold mb-0">My Dashboard</h5>

            {/* Right: User Section */}
            <div className="d-flex align-items-center gap-3">
              {/* Avatar */}
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                style={{
                  width: 40,
                  height: 40,
                  background: "linear-gradient(135deg, #ff7a18, #ffb347)",
                }}
              >
                AD
              </div>

              {/* User Info */}
              <div className="text-end d-none d-md-block">
                <div className="fw-semibold">{localStorage.getItem("name")}</div>
                <small className="text-muted">Admin</small>
              </div>

              {/* Logout */}
              <button className="btn btn-outline-dark btn-sm rounded-pill px-3" onClick={handleLogout}>
                Logout
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>



 <div className="container py-5">
      {/* Top Row */}
      <div className="row g-4 align-items-stretch">
        {/* Card Preview */}
        <div className="col-lg-6">
          <div
            className="p-4 text-white h-100 rounded-4 shadow"
            style={{
              background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
            }}
          >
            <h2 className="fw-bold mb-4">opbal:{opbl}</h2>

            <div className="d-flex justify-content-between align-items-end">
              <div>
                <small className="text-muted">Card Holder</small>
                <h6 className="mb-0">Akshay Dukale</h6>
              </div>
              <div>
                <small className="text-muted">Expires</small>
                <h6 className="mb-0">11/22</h6>
              </div>
              <div className="d-flex gap-1">
                <span
                  className="rounded-circle"
                  style={{
                    width: 18,
                    height: 18,
                    background: "#eb001b",
                  }}
                />
                <span
                  className="rounded-circle"
                  style={{
                    width: 18,
                    height: 18,
                    background: "#f79e1b",
                    marginLeft: -6,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Salary Card */}
        <div className="col-lg-3 col-md-6">
          <div className="card h-100 shadow-sm border-0 rounded-4 text-center">
            <div className="card-body">
              <div
                className="mx-auto mb-3 rounded-3"
                style={{
                  width: 60,
                  height: 60,
                  background: "#177410",
                }}
              />
              <h3 className="fw-bold">Credit</h3>
              <h2 className="fw-bold text-success">{ttlc}</h2>
              <button onClick={handleShow} className="btn btn-dark rounded-pill px-4">
              Add New Credit
            </button>
            </div>
          </div>
        </div>

        {/* Paypal Card */}
        <div className="col-lg-3 col-md-6">
          <div className="card h-100 shadow-sm border-0 rounded-4 text-center">
            <div className="card-body">
              <div
                className="mx-auto mb-3 rounded-3"
                style={{
                  width: 60,
                  height: 60,
                  background: "#ff1818",
                }}
              />
              <h3 className="fw-bold">Debit</h3>
              <h2 className="fw-bold">{ttld}</h2>
              <button onClick={dhandleShow} className="btn btn-dark rounded-pill px-4">
              Add New Debit
            </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="card mt-5 shadow-sm border-0 rounded-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bold mb-0">Payment History</h5>
            
          </div>

          <div className="row g-3">
            <div className="col-md-12">
              
        <div>
            
        <table className="table table">
  <thead>
    <tr>
      <th scope="col">TID</th>
      <th scope="col">DATE</th>
      <th scope="col">NOTE</th>
      <th scope="col">DEBIT</th>
      <th scope="col">CREDIT</th>
      <th scope="col">CLBAL</th>
      
     
    </tr>
  </thead>
  <tbody>
  {data.map((item)=>{
      return(<tr>
        <td>{item.T_ID}</td>
        <td>{item.DATE}</td>
        <td>{item.NOTE}</td>
        <td style={{color:"red"}}>{item.DEBIT}</td>
        <td style={{color:"green"}}>{item.CREDIT}</td>
        <td>{item.CLBAL}</td>
        
      </tr>)
    })}
   
  </tbody>
</table>

            
        </div>
             
            </div>

            
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
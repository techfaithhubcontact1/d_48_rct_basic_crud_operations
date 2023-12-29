//1.
import React, { useEffect, useState } from "react";

export default function APITable() {
  // hoohs area
  const [ddtt, setDDtt] = useState([]);
  const [create, setCreate] = useState();

  useEffect(() => {
    fetch("http://localhost:1337/api/teachers")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data.data);
        let newObj = data.data.map((cv, idx, arr) => {
          return {
            id: cv.id,
            name: cv.attributes.name,
            createdAt: cv.attributes.createdAt,
            updatedAt: cv.attributes.updatedAt,
            publishedAt: cv.attributes.publishedAt,
          };
        });
        // console.log(newObj);
        setDDtt(newObj);
      });
  }, []);

   // define area
   const createData = (e)=>{
    console.log(e.target.value)
    setCreate({
        "data": {
          "name": e.target.value
        }
    })
    console.log(create);
   } 

   const sendData = ()=>{
    console.log(create);
    fetch('http://localhost:1337/api/teachers', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(create)
    })
   }

   let deleteName = (e)=>{
     // Id hold by TravasingUp and TravacingDown mathod
     const tr = e.target.closest('tr');
    var dltid = e.target.closest('tr').querySelector('td:first-child').innerHTML;
    const dlt = window.confirm("Successfull Delete");
    // console.log(typeof dlt)
    if(dlt === true) {
      fetch(`http://localhost:1337/api/teachers/${dltid}`, {
        method:"DELETE"
      })
      .then((res)=>{
        return res.json()
      })
      .then((data)=>{
        console.log(data);
        tr.remove();
      })
      .catch((err)=>{
        console.log(err);
      })
    }
   }

  //return statements
  return (
    <div className="container">
       
       {/* user data insert data ( CRUD- create operation ) */}
      <form className="m-5">
      <h2 className="text-center">Create Form</h2>
        <div className="mb-3">
          <label htmlFor="exampleInputname" className="form-label">
            Name 
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputname"
            aria-describedby="textHelp"
            onChange={createData}
          />
          
        </div>

         <div className="text-center">
            <button type="button" className="btn btn-primary" onClick={sendData}>
              Submit
            </button>
         </div>
      </form>

    
      {/* API Reading in tables ( CRUD- read operation ) */}
      <h2 className="text-center m-4">Data Read Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#id</th>
            <th>Name</th>
            <th>createAt</th>
            <th>updateAt</th>
            <th>publishedAt</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ddtt.map((cv) => {
            return (
              <tr key={cv}>
                <td>{cv.id}</td>
                <td>{cv.name}</td>
                <td>{cv.createdAt}</td>
                <td>{cv.updatedAt}</td>
                <td>{cv.publishedAt}</td>
                <td>
                  <button className="btn btn-success btn-sm">View</button>
                  <a href={`/updateapi?id=${cv.id}&name=${cv.name}`} className="btn btn-primary btn-sm">Update</a>
                  <button className="btn btn-danger btn-sm" onClick={ (e)=>{ deleteName(e) } }>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

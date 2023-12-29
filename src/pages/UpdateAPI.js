//1. import area
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

//2. defination area
export default function UpdateAPI() {
  //hooks area
  const [searchparam, setSearchparam] = useSearchParams();
  const [change, setChange] = useState({
     "data": {
          "name": searchparam.get('name')
        }
  });

  useEffect(()=>{
   console.log(searchparam.get('id'));
   console.log(searchparam.get('name'));
  },[])

  //defination area
  const updateData = (e)=>{
    console.log(e.target.value)
    setChange({
     ...change,
     "data": {
          "name":e.target.value
        }
    })
  }

  const sendData = ()=>{
     console.log("submite", change)
     fetch(`http://localhost:1337/api/teachers/${searchparam.get('id')}`,{
          method:"PUT",
          headers:{
               'Content-Type':'application/json'
          },
          body: JSON.stringify(change)
     })
     .then((res)=>{ return res.json() })
     .then((data)=>{ console.log(data) })
     .catch((err)=>{ console.log(err) })
  }
  //return Statements
  return (
    <>
      <div className="container">
        <form className="m-5">
          <h2 className="text-center">Create Form</h2>
          <div className="mb-3">
            <input type="hidden" name="id" value={searchparam.get('id')} />
            <label htmlFor="exampleInputname" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputname"
              value={change.data.name}
              aria-describedby="textHelp"
              onChange={updateData}
            />
          </div>

          <div className="text-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={sendData}
            >
              Submit
            </button>
            <a href="/" className="btn btn-primary m-5">APITable</a>
          </div>
        </form>
      </div>
    </>
  );
}

//3. export area

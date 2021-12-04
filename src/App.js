import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import env from "./Settings";
import Grade from "./Grade";

function App() {
  const [stuName, setName] = useState("");
  const [stuGrade, setGrade] = useState("");
  // const [newGrade, setnewGrade] = useState("");
  const [stuList, setList] = useState([]);
  /*useEffect(() => {
    axios.get("http://localhost:9000/getDetails").then((response) => {
      setList(response.data)
    });
  }, []);*/
  useEffect(() => {
    async function fetch() {
      try {
        let api = await axios.get(`${env.api}/getDetails`);
        setList([...api.data]);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, []);

  const submitDetails = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${env.api}/insertDetails`, {
        name: stuName,
        grade: stuGrade,
      });
      setList([...stuList, { name: stuName, grade: stuGrade }]);
      setName("");
      setGrade("");
    } catch (error) {
      console.log(error);
    }
  };

  /*const updateStu = async (stud) => {
    await axios.put(`${env.api}/updateDetails`, {
      name: stud,
      grade: setnewGrade,
    });
    setnewGrade("");
  };*/

  const deleteStu = async (stud) => {
    try {
      await axios.delete(`${env.api}/deleteDetails/${stud}`);
    } catch (error) {
      console.log(error);
    }
    let newData = stuList.filter((item) => item.name !== stud);
    setList([...newData]);
  };

  return (
    <div className="App">
      <h1>
        <u>STUDENT DETAILS</u>
      </h1>
      <div className="form">
        <form onSubmit={submitDetails}>
          <label>Student Name:</label>
          <input
            type="text"
            name="name"
            value={stuName}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <label>Student Grade:</label>
          <input
            type="number"
            min="1"
            max="12"
            name="grade"
            value={stuGrade}
            onChange={(e) => {
              setGrade(e.target.value);
            }}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
        <div className="table">
          <table>
            <thead>
              <tr>
                <td className="title">Name</td>
                <td className="title">Grade</td>
              </tr>
            </thead>
            <tbody>
              {stuList.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.name}</td>
                    <td>
                      <Grade key={key} grade={val.grade} />
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          // setnewGrade(val.grade);
                          // updateStu(val.name);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          deleteStu(val.name);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                    {/* <td>
                      <input
                        type="number"
                        id="updateInput"
                        value={newGrade}
                        onChange={(e) => {
                          setnewGrade(e.target.value);
                        }}
                      />
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default App;

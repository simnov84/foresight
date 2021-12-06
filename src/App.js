import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import env from "./Settings";
import Grade from "./Grade";
import Name from "./Name";

function App() {
  const [stuName, setName] = useState("");
  const [stuGrade, setGrade] = useState("");
  const [stuList, setList] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        let api = await axios.get(`${env.api}/getDetails`);
        setList([...api.data]);
        console.log(api.data);
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
            required
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
            required
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
                    <td>{val.grade}</td>

                    <Name
                      key={key}
                      name={val.name}
                      grade={val.grade}
                      stuList={stuList}
                      setList={setList}
                    />

                    <Grade
                      key={key}
                      name={val.name}
                      grade={val.grade}
                      stuList={stuList}
                      setList={setList}
                    />

                    <td>
                      <button
                        onClick={() => {
                          deleteStu(val.name);
                        }}
                      >
                        Delete
                      </button>
                    </td>
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

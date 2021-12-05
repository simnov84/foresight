import React, { useState } from "react";
import axios from "axios";
import env from "./Settings";

function Grade(props) {
  const [change, setChange] = useState(false);
  const [newGrade, setnewGrade] = useState("");

  const updateStu = async (stud) => {
    /*await axios.put(`${env.api}/updateDetails`, {
      name: stud,
      grade: newGrade,
    });*/
    let datas = props.stuList.filter((e) => e.name === stud);
    datas[0].grade = newGrade;
    console.log(datas);
    setnewGrade("");
  };
  return (
    <>
      <td>
        {newGrade ? (
          <input
            type="number"
            id="updateInput"
            value={newGrade}
            onChange={(e) => {
              setnewGrade(e.target.value);
            }}
          />
        ) : (
          props.grade
        )}
      </td>
      <td>
        {change ? (
          <button
            onClick={() => {
              setChange(!change);
              updateStu(props.name);
            }}
          >
            Update
          </button>
        ) : (
          <button
            onClick={() => {
              setChange(!change);
              setnewGrade(props.grade);
            }}
          >
            Edit
          </button>
        )}
      </td>
    </>
  );
}

export default Grade;

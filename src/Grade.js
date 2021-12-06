import React, { useState } from "react";
import axios from "axios";
import env from "./Settings";

function Grade(props) {
  const [change, setChange] = useState(false);
  const [newGrade, setnewGrade] = useState("");

  const updateStu = async (stud) => {
    await axios.put(`${env.api}/updateDetails`, {
      name: stud,
      grade: newGrade,
    });
    let datas = props.stuList.findIndex((e) => e.name === stud);
    let newList = props.stuList;
    newList[datas].grade = newGrade;
    props.setList([...newList]);
    setnewGrade("");
    setChange(!change);
  };

  return (
    <>
      <td>
        {change ? (
          <input
            type="number"
            id="updateInput"
            value={newGrade}
            step="1"
            // min=""
            max="12"
            maxLength="2"
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

import React, { useState } from "react";
import axios from "axios";
import env from "./Settings";

function Name(props) {
  const [change, setChange] = useState(false);
  const [newName, setnewName] = useState("");

  const updateStu = async (stud) => {
    await axios.put(`${env.api}/updateDetails`, {
      name: newName,
      grade: stud,
    });
    let datas = props.stuList.findIndex((e) => e.grade === stud);
    let newList = props.stuList;
    newList[datas].name = newName;
    props.setList([...newList]);
    setnewName("");
    setChange(!change);
  };

  return (
    <>
      <td>
        {change ? (
          <input
            type="string"
            id="updateInput"
            value={newName}
            // step="1"
            // min=""
            // max="12"
            // maxLength="2"
            onChange={(e) => {
              setnewName(e.target.value);
            }}
          />
        ) : (
          props.name
        )}
      </td>
      <td>
        {change ? (
          <button
            onClick={() => {
              updateStu(props.grade);
            }}
          >
            Update
          </button>
        ) : (
          <button
            onClick={() => {
              setChange(!change);
              setnewName(props.name);
            }}
          >
            Edit
          </button>
        )}
      </td>
    </>
  );
}
export default Name;

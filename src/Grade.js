import React from "react";

function Grade(props) {
  return (
    <>
      {/*newGrade ? (
        <input
          type="number"
          id="updateInput"
          value={newGrade}
          onChange={(e) => {
            setnewGrade(e.target.value);
          }}
        />
      ) : (
          ""
      )*/}
      <div>{props.grade}</div>
    </>
  );
}

export default Grade;

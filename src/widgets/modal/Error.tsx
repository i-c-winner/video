import React from "react";

const Error = React.forwardRef((props, ref) => {
  return (
    <div
      style={{ color: "white", fontSize: "150px", margin: "200px" }}
      className=""
    >
      Error
    </div>
  );
});

export { Error };

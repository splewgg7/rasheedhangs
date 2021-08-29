import React from "react";
import { Redirect } from "react-router-dom";
import useLoginContext from "./useLoginContext";

function Loggggin3() {
  const [loginContext, setLogincontext] = useLoginContext();
  return (
    <div>
      {loginContext ? (
        <div>
          logged in
          <button onClick={() => setLogincontext(false)}>logout</button>
          <div>{JSON.stringify(loginContext)}</div>
        </div>
      ) : (
        <div>
          <div>{JSON.stringify(loginContext)}</div>
          <button onClick={() => setLogincontext(true)}>login</button>
        </div>
      )}
    </div>
  );
}

export default Loggggin3;

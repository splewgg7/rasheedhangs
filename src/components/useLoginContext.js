import React from "react";

function useLoginContext() {
  const [context, setContext] = React.useState(() =>
    JSON.parse(localStorage.getItem("loginContext"))
  );

  React.useEffect(() => {
    window.addEventListener("storage", () => setContext(false));
  }, []);
  return [
    context,
    (value) => {
      setContext(value);
      localStorage.setItem("loginContext", JSON.stringify(value));
    },
  ];
}

export default useLoginContext;

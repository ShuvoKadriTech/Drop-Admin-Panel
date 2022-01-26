import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const GlobalWrapper = ({ children }) => {
  //   console.log(children);
  const history = useHistory();

  const { accessToken, admin } = useSelector(state => state.Login);

  useEffect(
    () => {
      if (!accessToken || !admin) {
        history.replace("/login");
      }
    },
    [accessToken, admin]
  );

  return (
    <div>
      {children}
    </div>
  );
};

export default GlobalWrapper;

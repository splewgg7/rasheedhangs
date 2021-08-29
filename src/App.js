import React from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/style.css";
import Login2 from "./components/Login2";
import chatRoom from "./components/chatRoom";
import Loggggin3 from "./components/Loggggin3";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login2} />
          <Route path="/home" component={Home} />
          <Route path="/chat" component={chatRoom} />
          <Route path="/test" component={Loggggin3} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

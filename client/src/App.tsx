import { useState } from "react";
import "./App.css";
import { Reader } from "./Reader";

function App() {
  const [user, setUser] = useState({});
  return (
    <div className="App">
      <Reader user={user} setUser={setUser} />
      <p>{JSON.stringify(user)}</p>
    </div>
  );
}

export default App;

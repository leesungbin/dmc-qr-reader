import { useState } from "react";
import "./App.css";
import { Modal } from "./Modal";
import { Reader } from "./Reader";

function App() {
  const [user, setUser] = useState({} as any);

  return (
    <div className="App">
      <Reader user={user} setUser={setUser} />
      {user["이름"] && <Modal user={user} />}
    </div>
  );
}

export default App;

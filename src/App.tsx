import { Routes, Route } from "react-router-dom";
import { Auth } from "./Screens";
import { Login, Register } from "./Pages";
import "./style/clear.sass";
import "./style/fonts.sass";

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<div>"/" page</div>} />
        <Route path='/login' element={<Auth><Login /></Auth>} />
        <Route path='/reg' element={<Auth><Register /></Auth>} />
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </div>
  );
};

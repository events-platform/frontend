import { Routes, Route } from "react-router-dom";
import { Main, Auth } from "./Screens";
import { Login, Register, Posts } from "./Pages";
import "./style/clear.sass";
import "./style/fonts.sass";
// import "./style/other.sass";

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main><Posts /></Main>} />
        <Route path='/posts' element={<Main><Posts /></Main>} />
        <Route path='/login' element={<Auth><Login /></Auth>} />
        <Route path='/reg' element={<Auth><Register /></Auth>} />
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </div>
  );
};

import { Routes, Route } from "react-router-dom";
import { Main, Auth, Profile } from "./Screens";
import { Login, Register, Posts, Post, PostCreation } from "./Pages";
import "./style/clear.sass";
import "./style/fonts.sass";

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main><Posts /></Main>} />
        <Route path='/posts' element={<Main><Posts /></Main>} />
        <Route path="/posts/*" element={<Main><Post /></Main>} />
        <Route path="/posts/create" element={<Main><PostCreation /></Main>} />
        <Route path="/profile/:profileId" element={<Main><Profile /></Main> } />
        <Route path='/login' element={<Auth><Login /></Auth>} />
        <Route path='/reg' element={<Auth><Register /></Auth>} />
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </div>
  );
};

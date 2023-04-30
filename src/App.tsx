import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Main, Auth } from "./Screens";
import { Login, Register, Posts, Post, PostCreation, Menu, Profile } from "./Pages";
import "./style/clear.sass";
import "./style/fonts.sass";

export const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main><Menu /></Main>} />
        <Route path='/events' element={<Main><Posts /></Main>} />
        <Route path="/events/*" element={<Main><Post /></Main>} />
        <Route path="/events/create" element={<Main><PostCreation /></Main>} />
        <Route path="/profile/:profileId" element={<Main><Profile /></Main> } />
        <Route path='/login' element={<Auth><Login /></Auth>} />
        <Route path='/reg' element={<Auth><Register /></Auth>} />
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </div>
  );
};

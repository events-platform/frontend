import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Main, Auth } from "./Screens";
import { Login, Register, Posts, Post, PostCreation, Menu, Profile } from "./Pages";
import "./style/clear.sass";
import "./style/fonts.sass";
import { useCookies } from "react-cookie";
import { getUserSelf } from "./API/login";
import { useAppDispatch } from "./store/store";
import { setAvatarUrl, setSignIn, setToken, setUserName } from "./store/reducers/userReducer";

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

export const CookiesApp = () => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(["access_token", "refresh_token"]);
  if (cookies.access_token) {
    const dispatch = useAppDispatch();
    dispatch(setToken(cookies.access_token));
    getUserSelf().then((res) => {
      dispatch(setUserName(res.data.username));
      dispatch(setAvatarUrl(res.data.avatar));
      dispatch(setSignIn(true));
    });
  }
  return (
    <App />
  );
};

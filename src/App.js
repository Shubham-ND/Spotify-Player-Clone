import "./App.css";
import Player from "./Components/Player";
import Login from "./Components/Login";
import { Outlet, Route, Routes } from "react-router";
import ProtectedRoute from "./Components/ProtectedRoutes";
import GenreList from "./Components/GenreList";
import Home from "./Components/Home";
import NotFound from "./Components/NotFound";
import Playlists from "./Components/Playlists";
import PlaylistSongs from "./Components/PlaylistSongs";

function App() {
  return (
    <>
      <Outlet />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Player />}>
            <Route path="search" element={<GenreList />} />
            <Route path="playlists" element={<Playlists />} />
            <Route
              path="playlists/:id"
              element={<PlaylistSongs test="test" />}
            />
            <Route index element={<Home />}></Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

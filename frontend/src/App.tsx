import { Routes, Route } from "react-router-dom";
import "./scss/app.scss";
import Home from "./pages/Home";
import { Auth } from "./pages/Auth";
import { NotFound } from "./pages/NotFound";
import { JoinLobby } from "./pages/JoinLobby";
import { CreateLobby } from "./pages/CreateLobby";
import { useStore } from "./stores";
import { useLayoutEffect } from "react";
import { PrivateRoute } from "shared/components/PrivateRoute";
import { Lobby } from "pages/Lobby";
import { getFontSize } from "shared/libs/getFontSize";

const App = () => {
  const { init } = useStore();

  useLayoutEffect(() => {
    init();

    const setupFontSize = () => {
      const fontSize = getFontSize();
      document.documentElement.style.setProperty("font-size", `${fontSize}px`);
    };

    const setupUi = () => {
      setTimeout(() => {
        setupFontSize();
      }, 20);
    };

    setupUi();

    window.addEventListener("resize", setupUi);

    return () => {
      window.removeEventListener("resize", setupUi);
    };
  }, [init]);

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/:authType" element={<Auth />} />
        <Route
          path="/lobby/:code"
          element={
            <PrivateRoute>
              <Lobby />
            </PrivateRoute>
          }
        />
        <Route
          path="/join"
          element={
            <PrivateRoute>
              <JoinLobby />
            </PrivateRoute>
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreateLobby />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;

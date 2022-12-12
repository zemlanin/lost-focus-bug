import {
  useFocusable,
  FocusContext,
  init as initSpatialNavigation,
} from "@noriginmedia/norigin-spatial-navigation";
import { createRoot } from "react-dom/client";
import {
  Routes,
  Route,
  HashRouter,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";

initSpatialNavigation({
  debug: true,
  // visualDebug: true,
});

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />
  </HashRouter>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootView />} />
      <Route path="/back" element={<BackView />} />
      <Route
        path="/auto-back-immediate"
        element={<AutoBackView timeout={false} />}
      />
      <Route
        path="/auto-back-timeout"
        element={<AutoBackView timeout={true} />}
      />
    </Routes>
  );
}

function RootView() {
  const navigate = useNavigate();

  return (
    <View>
      <Button onClick={() => navigate("/back")} focusKey={"root-back"}>
        /back
      </Button>
      <Button
        onClick={() => navigate("/auto-back-immediate")}
        focusKey={"root-auto-back-immediate"}
      >
        /auto-back-immediate
      </Button>
      <Button
        onClick={() => navigate("/auto-back-timeout")}
        focusKey={"root-auto-back-timeout"}
      >
        /auto-back-timeout
      </Button>
    </View>
  );
}

function BackView() {
  const navigate = useNavigate();

  return (
    <View>
      <Button onClick={() => navigate(-1)} focusKey={"back-back"}>
        /
      </Button>
    </View>
  );
}

function AutoBackView({ timeout }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (timeout) {
      setTimeout(() => navigate(-1), 1);
    } else {
      navigate(-1);
    }
  }, [timeout]);

  return <BackView />;
}

function View({ children }) {
  const { ref, focusKey, focusSelf } = useFocusable({
  });

  const location = useLocation();

  useEffect(() => {
    focusSelf();
  }, [location.pathname]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref}>{children}</div>
    </FocusContext.Provider>
  );
}

function Button({ children, onClick, focusKey }) {
  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress() {
      onClick();
    },
  });

  return (
    <button
      ref={ref}
      style={
        focused
          ? { backgroundColor: "black", color: "white" }
          : { backgroundColor: "white" }
      }
    >
      {children}
    </button>
  );
}

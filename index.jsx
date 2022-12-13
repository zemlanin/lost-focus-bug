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
import { useEffect, useState, StrictMode } from "react";

initSpatialNavigation({
  debug: true,
  // visualDebug: true,
});

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <HashRouter>
    <App />
  </HashRouter>
  // </StrictMode>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootView key="root" />} />
      <Route path="/similar" element={<RootView key="similar" />} />
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
  const [addedButton, setAddedButton] = useState(false);

  return (
    <View>
      <Button onClick={() => navigate("/back")} focusKey={"root-back"}>
        /back
      </Button>
      <Button onClick={() => navigate("/similar")} focusKey={"root-similar"}>
        /similar
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
      <div style={{ width: 40 }} />
      <Button onClick={() => setAddedButton(true)} focusKey={"root-add-button"}>
        add nested button
      </Button>
      {addedButton ? (
        <Nested>
          <Button
            onClick={() => setAddedButton(false)}
            focusKey={"root-remove-button"}
          >
            remove button
          </Button>
        </Nested>
      ) : null}
    </View>
  );
}

function BackView() {
  const navigate = useNavigate();

  return (
    <View>
      <Button onClick={() => navigate("/")} focusKey={"back-back"}>
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
  const location = useLocation();

  const { ref, focusKey, focusSelf } = useFocusable({
    focusKey: 'view-' + location.pathname,
  });

  useEffect(() => {
    focusSelf();
  }, [focusSelf, location.pathname]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref}>
        {location.pathname}
        <br/>
        {children}
      </div>
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

function Nested({ children }) {
  const { ref, focused, focusKey } = useFocusable();

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} style={{ marginTop: 30 }}>
        {children}
      </div>
    </FocusContext.Provider>
  );
}

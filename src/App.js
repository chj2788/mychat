import { Switch } from "react-router";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { ProfileProvider } from "./context/profile.context";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <ProfileProvider>
      <Switch>
        <PublicRoute path="/signin">
          <SignIn />
        </PublicRoute>
        <PrivateRoute>
          <Home path="/" />
        </PrivateRoute>
      </Switch>
    </ProfileProvider>
  );
}

export default App;

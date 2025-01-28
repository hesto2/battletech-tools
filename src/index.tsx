import "bootstrap/dist/css/bootstrap.css";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import AppRouter from "./ui/app-router";

// ReactDOM.render(<AppRouter />, document.getElementById('root'));
import { createRoot } from "react-dom/client";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <GoogleOAuthProvider clientId="902689505243-vk0f8croj87arptpaflnt4mri8kpvjs3.apps.googleusercontent.com">
    <GoogleLogin
      onSuccess={(response) => {
        console.log("response", response);
      }}
      onError={() => {
        console.log("Login failed");
      }}
    />
    <AppRouter />
  </GoogleOAuthProvider>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
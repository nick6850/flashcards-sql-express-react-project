import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./components/Root";
import Flashcards from "./pages/Flashcards";
import SignIn from "./pages/SignIn";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import NewFlashcardForm from "./pages/NewFlashcard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Flashcards />} />
      <Route path="new" element={<NewFlashcardForm />} />
      <Route path="signin" element={<SignIn />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

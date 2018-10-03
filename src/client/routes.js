import { Home, NotFound } from "./pages";
import App from "./App";

export default [
  {
    ...App,
    routes: [
      {
        ...Home,
        path: "/",
        exact: true
      },
      {
        ...NotFound
      }
    ]
  }
];

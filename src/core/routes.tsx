import type { RouteObject } from "react-router-dom";
import Layout from "./layout";
import Nexxa from "../modules/nexxa/nexxa";
import Search from "../modules/search/search";

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <Nexxa /> },
      { path: "search", element: <Search /> },
    ],
  },
];

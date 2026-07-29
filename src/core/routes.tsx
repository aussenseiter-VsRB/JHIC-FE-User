import type { RouteObject } from "react-router-dom";
import Layout from "./layout";
import Nexxa from "../modules/nexxa/nexxa";
import Search from "../modules/search/search";
import DashboardPkl from "../modules/dashboard-pkl/dashboard-pkl";
import CvReview from "../modules/cv-review/cv-review";
import TimelineAgit from "../modules/timeline-agit/timeline-agit";

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <Nexxa /> },
      { path: "search", element: <Search /> },
      { path: "dashboard-pkl", element: <DashboardPkl /> },
      { path: "cv-review", element: <CvReview /> },
      { path: "timeline-agit", element: <TimelineAgit /> },
    ],
  },
];

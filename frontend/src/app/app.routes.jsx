import { createBrowserRouter } from "react-router";
import Dashboard from "../features/chat/pages/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />
    },
])
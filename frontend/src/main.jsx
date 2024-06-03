import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page";
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import HomePage from './pages/home';
import ContactUsPage from './pages/contact_us';
import EventDetail from './pages/event_detail';
import ProtectedRoute from './pages/protected_route';
import InterestedPage from './pages/interested';
import AccountPage from './pages/account';
import ReportPage from './pages/report';
import CreateEventPage from './pages/admin_add_event';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contact_us",
    element: <ContactUsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "event_detail/:eventId", 
    element: <EventDetail />,
  },
  {
    path: "/interested",
    element: <ProtectedRoute element={InterestedPage} />
  },
  {
    path: "/account",
    element: <ProtectedRoute element={AccountPage} />,
  },
  {
    path: "/report",
    element: <ProtectedRoute element={ReportPage} />,
  },
  {
    path: "/add_event",
    element: <ProtectedRoute element={CreateEventPage} />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

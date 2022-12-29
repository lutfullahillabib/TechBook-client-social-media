import { createBrowserRouter } from "react-router-dom";
import Main from "../../../Layout/Main";
import Home from "../Home/Home";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";
import Bookmarks from "../Shared/LeftNavInner/Bookmarks";
import Explore from "../Shared/LeftNavInner/Explore";
import Messages from "../Shared/LeftNavInner/Messages";
import Notifications from "../Shared/LeftNavInner/Notifications";
import Profile from "../Shared/LeftNavInner/Profile";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/explore',
                element: <Explore></Explore>
            },
            {
                path: '/profile',
                element: <Profile></Profile>
            },
            {
                path: '/messages',
                element: <Messages></Messages>
            },
            {
                path: '/notifications',
                element: <Notifications></Notifications>
            },
            {
                path: '/bookmarks',
                element: <Bookmarks></Bookmarks>
            },
        ]
    }
])

export default router;



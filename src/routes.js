import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./HomePage";
import Levski from "./pages/Levski";
import PostPage from "./pages/PostPage";
import LevskiEu from "./pages/LevskiEu";
import LevskiInterviews from "./pages/LevskiInterviews";
import LevskiFirstTeam from "./pages/LevskiFirstTeam";
import LevskiYouths from "./pages/LevskiYouths";
import Basketball from "./pages/Basketball";
import Volleyball from "./pages/Volleyball";
import Gymnastics from "./pages/Gymnastics";
import LevskiTransfers from "./pages/LevskiTransfers";
import Others from "./pages/Others";
import SearchPage from "./pages/SearchPage";
import AuthorPage from "./pages/AuthorPage";

const router = createBrowserRouter(
    [
        {
            element: <Layout/>,
            errorElement: <ErrorPage/>,
            children: [
                {path: '/', 
                element: <HomePage/>, 
                errorElement: <ErrorPage/>},
                {
                    path: '/football-club-levski',
                    element: <Levski/>,
                    errorElement: <ErrorPage/>,
                },
                {
                    path: '/football-club-levski/:postID',
                    element: <PostPage/>,
                    errorElement: <ErrorPage/>,
                },
                {
                    path: '/football-club-levski/eu',
                    element: <LevskiEu/>,
                    errorElement: <ErrorPage/>,
                },
                {
                    path: '/football-club-levski/eu/:postID',
                    element: <PostPage/>,
                    errorElement: <ErrorPage/>,
                },
                {
                    path: '/football-club-levski/interviews',
                    element: <LevskiInterviews/>,
                    errorElement: <ErrorPage/>,
                },
                {
                    path: '/football-club-levski/interviews/:postID',
                    element: <PostPage/>,
                    errorElement: <ErrorPage/>,
                },
                {
                    path: '/football-club-levski/first-team',
                    element: <LevskiFirstTeam/>,
                    errorElement: <ErrorPage/>,
                },
                {
                    path: '/football-club-levski/first-team/:postID',
                    element: <PostPage/>,
                    errorElement: <ErrorPage/>,
                },
                {
                    path: '/football-club-levski/transfers',
                    element: <LevskiTransfers/>,
                    errorElement: <ErrorPage/>,
                },
                {
                    path: '/football-club-levski/transfers/:postID',
                    element: <PostPage/>,
                    errorElement: <ErrorPage/>,
                },
                {
                    path: '/football-club-levski/youths',
                    element: <LevskiYouths/>,
                    errorElement: <ErrorPage/>,
                },
                {
                    path: '/football-club-levski/youths/:postID',
                    element: <PostPage/>,
                    errorElement: <ErrorPage/>,
                },
                {
                    path: '/basketball',
                    element: <Basketball/>,
                    errorElement: <ErrorPage/>,
                },
                {
                    path: '/basketball/:postID',
                    element: <PostPage/>,
                    errorElement: <ErrorPage/>,
                },
                {
                    path: '/volleyball',
                    element: <Volleyball/>,
                    errorElement: <ErrorPage/>,
                },
                {
                    path: '/volleyball/:postID',
                    element: <PostPage/>,
                    errorElement: <ErrorPage/>,
                },
                {
                    path: '/gymnastics',
                    element: <Gymnastics/>,
                    errorElement: <ErrorPage/>,
                },
                {
                    path: '/gymnastics/:postID',
                    element: <PostPage/>,
                    errorElement: <ErrorPage/>,
                },
                {
                    path: '/others',
                    element: <Others/> ,
                    errorElement: <ErrorPage/>,
                },
                {
                    path: '/others/:postID',
                    element: <PostPage/> ,
                    errorElement: <ErrorPage/>,
                },
                {
                    path: '/search',
                    element: <SearchPage/> ,
                    errorElement: <ErrorPage/>,
                },
                {
                    path: '/author/:authorID',
                    element: <AuthorPage/>,
                    errorElement: <ErrorPage/>,
                },
            ]
        }
    ]
)

export { router };
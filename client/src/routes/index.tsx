import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../components/ui/Layout'
import HomePage from '../pages/HomePage';
import QuizPage from '../pages/QuizPage';
import TestPage from '../pages/TestPage';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
                errorElement: <NotFound />
            },
            {
                path: "/quiz",
                element: <QuizPage />,
                errorElement: <NotFound />
            },
            {
                path: "/quiz/test",
                element: <TestPage />,
                errorElement: <NotFound />
            },
        ]
    }

]);

export default router;


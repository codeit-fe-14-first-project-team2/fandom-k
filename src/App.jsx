import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalContextProvider from "./contexts/GlobalContext";
import LandingPage from "./pages/LandingPage";
import ListPage from "./pages/list/ListPage";
import MyPage from "./pages/mypage/MyPage";
import NotFound from "./pages/notfound/NotFound";

const router = createBrowserRouter([
	{ path: "/", element: <LandingPage /> },
	{ path: "/list", element: <ListPage /> },
	{ path: "/mypage", element: <MyPage /> },
	{ path: "*", element: <NotFound /> },
]);

function App() {
	return (
		<GlobalContextProvider>
			<RouterProvider router={router} />
		</GlobalContextProvider>
	);
}

export default App;

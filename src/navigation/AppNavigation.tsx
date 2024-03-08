import { Route, Routes } from "react-router-dom";
import { APP_ROUTES, AppRoutesInterface } from "./AppRoutes";


function AppNavigation(){
    return(
        <Routes>
            {APP_ROUTES.map((route: AppRoutesInterface) => 
                <Route {...route} />
            )}
        </Routes>
    );
}

export default AppNavigation;
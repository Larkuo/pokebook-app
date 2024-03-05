import React, {createContext, useState} from "react";
import { AppThemeType } from "./theme";

interface ThemeContextInterface{
    theme: AppThemeType;
    changeTheme: (theme: AppThemeType) => void;
}

export const ThemeContext = createContext<ThemeContextInterface>({} as ThemeContextInterface);

export function ThemeContextProvider({children}:{children: React.ReactNode}){
    const [mode, setMode] = useState<AppThemeType>("pink");

    function changeTheme(theme: AppThemeType){
        setMode(theme);
    }

    return(
        <ThemeContext.Provider value={{theme: mode, changeTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}
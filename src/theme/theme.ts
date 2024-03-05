export type AppThemeType = "pink" | "blue" | 'yellow';

export interface ThemeSelectoryProps {
    id: number;
    theme: AppThemeType;
    color: string;
}

export const THEME_SELECTOR_DATA: ThemeSelectoryProps[] = [
    {id: 0, theme: 'pink', color: '#E85382'},
    {id: 1, theme: 'blue', color: '#39BADF'},
    {id: 2, theme: 'yellow', color: '#E1A725'},
];

export const colors = {
    pink: '#E85382',
    blue: '#39BADF',
    yellow: '#E1A725',
}
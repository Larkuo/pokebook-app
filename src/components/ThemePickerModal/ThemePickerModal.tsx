import { useState } from 'react';
import './ThemePickerModal.css';

interface ThemePickerModalProps{
    closeModal: () => void;
    selectTheme: (theme: string) => void;
}

export function ThemePickerModal({
    closeModal,
    selectTheme,
}:ThemePickerModalProps) {
    const THEME_SELECTOR_DATA = [
        {id: 0, theme: 'pink', color: '#E85382'},
        {id: 1, theme: 'blue', color: '#39BADF'},
        {id: 2, theme: 'yellow', color: '#E1A725'},
    ];

    const [currentTheme, setCurrentTheme] = useState<'pink'|'blue'|'yellow'>('blue');

    return (
        <div className='theme-picker-modal'>
            <div className='theme-selector-container'>
                <div className='theme-modal-header'>
                    <span className='theme-modal-header-text'>Choose Theme</span>
                </div>
                <div className='theme-modal-body'>
                    {THEME_SELECTOR_DATA.map((
                        value: { id: number; theme: string; color: string; }, 
                        index: number) => ( 
                            <div 
                                key={value.id} 
                                className={currentTheme === value.theme? 'theme-selector-circle-active' : 'theme-selector-circle'}
                                onClick={() => {
                                    selectTheme(value.theme);
                                    setCurrentTheme(value.theme as any);
                                    closeModal();
                                }}
                            >
                                <div 
                                    className='theme-selector'
                                    style={{
                                        color: value.color,
                                        backgroundColor: value.color,
                                    }}
                                >|</div>
                            </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

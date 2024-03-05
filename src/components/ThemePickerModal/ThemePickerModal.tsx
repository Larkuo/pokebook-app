import { useContext } from 'react';
import './ThemePickerModal.css';
import { ThemeContext } from '../../theme/ThemeContext';
import { THEME_SELECTOR_DATA, ThemeSelectoryProps } from '../../theme/theme';

interface ThemePickerModalProps{
    closeModal: () => void;
}

export function ThemePickerModal({
    closeModal,
}:ThemePickerModalProps) {
    const { theme, changeTheme } = useContext(ThemeContext);

    return (
        <div className='theme-picker-modal'>
            <div className='theme-selector-container'>
                <div className='theme-modal-header'>
                    <span className='theme-modal-header-text'>Choose Theme</span>
                </div>
                <div className='theme-modal-body'>
                    {THEME_SELECTOR_DATA.map((value: ThemeSelectoryProps, index: number) => ( 
                        <div 
                            key={value.id} 
                            className={theme === value.theme? 'theme-selector-circle-active' : 'theme-selector-circle'}
                            onClick={() => {
                                changeTheme(value.theme as any);
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

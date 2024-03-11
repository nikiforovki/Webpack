import React from 'react';
import Sun from '../../../public/Img/Sun.svg';
import Moon from '../../../public/Img/Moon.svg';
import styles from '../DarkMode/DarkMode.module.scss';

const DarkMode: React.FC = () => {
    const setDarkMode = () => {
        document.querySelector('body')?.setAttribute('data-theme', 'dark');
        localStorage.setItem("selectedTheme", "dark")
    };
    const setLightMode = () => {
        document.querySelector('body')?.setAttribute('data-theme', 'light');
        localStorage.setItem("selectedTheme", "light")
    };

    const selectedTheme = localStorage.getItem("selectedTheme");

    if(selectedTheme === "dark") {
        setDarkMode();
    }


    const toggleTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setDarkMode();
        } else {
            setLightMode();
        }
    };

    return (
        <div className={styles.dark_mode}>
            <input
                className={styles.dark_mode_input}
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
                defaultChecked={selectedTheme === "dark"}
            />
            <label className={styles.dark_mode_label} htmlFor='darkmode-toggle'>
                {/*<Sun />*/}
                {/*<Moon />*/}
            </label>
        </div>
    );
};

export default DarkMode;


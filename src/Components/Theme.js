import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { themeActions } from '../Store/ThemeSlice'
import Classes from './Theme.module.css'

const Theme = () => {
    const theme = useSelector((state) => state.theme.theme);
    const dispatch = useDispatch()
    const themeChangeHandler = () => {
        const newTheme= theme === 'light' ? 'dark' : 'light'
        dispatch(themeActions.setTheme(newTheme))
    }

    useEffect(() => {
        document.body.className = theme === 'light'  ? Classes.bodylight : Classes.bodydark;
      }, [theme]);

    return (
        <label className={Classes["toggle"]}>
        <input className={Classes["toggle-checkbox"]} type="checkbox" onChange={themeChangeHandler} />
        <div className={Classes["toggle-switch"]}></div>
        <span className={Classes["toggle-label"]}>Theme</span>
      </label>
    )
}

export default Theme
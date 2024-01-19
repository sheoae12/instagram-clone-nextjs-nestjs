'use client'

import styles from './ToggleSwitch.module.css'
//import { Dispatch, SetStateAction } from 'react';

interface ToggleSwitchProps {
    statusList: any[];
    checked: boolean;
    setState: any;
}

export default function ToggleSwitch({ statusList, checked, setState }: ToggleSwitchProps): React.ReactNode {
    const handleChange = (id: number, value: boolean) => {
        setState(value);
    };
    
    return (
        <>
            {statusList.map((status) => (
                <label key={status.id} className={styles.switch}>
                    <input
                        type="checkbox"
                        checked={status.value}
                        onChange={() => handleChange(status.id, !checked)}
                    />
                    <span className={styles.slider}></span>
                </label>
            ))}
        </>
    )
}
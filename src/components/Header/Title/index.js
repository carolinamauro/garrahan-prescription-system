'use client';

import styles from './Title.module.css';

export default function Breadcrumb({ title, subtitle }) {
    return (
        <div className={styles.breadcrumb}>
            <h1>{title}</h1>
            <span>{subtitle}</span>
        </div>
    );
}

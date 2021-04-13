import React from 'react';
import styles from './FormsControls.module.css';

const Textarea = ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error;
    return <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
        <div>
            <textarea {...input} {...props} />
        </div>
        {hasError && <span>{error}</span>}
    </div>
}

export const Input = ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error;
    return <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
        <div>
            <input {...input} {...props} />
        </div>
        {hasError && <span>{error}</span>}
    </div>
}

export default Textarea;

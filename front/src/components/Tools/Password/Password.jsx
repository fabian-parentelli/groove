import './password.css';
import { Icons } from "fara-comp-react";
import { useState, useEffect } from 'react';

const getStrengthClass = (strength) => {
    if (strength >= 80) return 'strength-strong';
    if (strength >= 60) return 'strength-medium-high';
    if (strength >= 40) return 'strength-medium-low';
    if (strength > 0) return 'strength-weak';
    return '';
};

const Password = ({ values, setValues }) => {

    const [view, setView] = useState(false);
    const [strength, setStrength] = useState(0);

    useEffect(() => {
        setStrength(calcStrength(values?.password));
    }, [values?.password]);

    const strengthClass = getStrengthClass(strength);

    return (
        <div
            className={`password ${strengthClass}`}
            style={{ '--strength-progress': `${strength}%` }}
        >
            <input
                type={view ? 'text' : 'password'}
                placeholder='Contraseña'
                value={values?.password || ''}
                onChange={(e) => setValues({ ...values, password: e.target.value })}
            />
            
            <Icons
                type={view ? 'eye' : 'eyeclosed'}
                onClick={() => setView(!view)}
            />
        </div>
    );
};

export default Password;

function calcStrength(pass) {
    let score = 0;
    if (!pass) return 0;

    if (/\s/.test(pass)) return 0;
    if (pass.length >= 6) score += 10;
    if (pass.length >= 10) score += 10;
    if (pass.length >= 14) score += 10;
    if (/[a-z]/.test(pass)) score += 10;
    if (/[A-Z]/.test(pass)) score += 10;
    if (/\d/.test(pass)) score += 10;
    if (/[^A-Za-z0-9]/.test(pass)) score += 10;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 10;
    if (/\d/.test(pass) && /[A-Za-z]/.test(pass)) score += 10;
    if (/[^\w\s]/.test(pass) && /\d/.test(pass)) score += 10;
    if (/[A-Z]/.test(pass) && /[^\w\s]/.test(pass)) score += 10;

    return Math.min(score, 100);
};
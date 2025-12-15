const titleEmail = (post) => {

    const type = {

        // Sessions ...
        'register': () => { return 'Registro exitoso' },
        'login': () => { return 'Inicio de sesión detectado' },
        
        
        'recPass': () => { return 'Recuperar contraseña' },
        'report': () => { return 'Recuperar cuenta' },

        'default': () => { return 'Email de Groove music' }
    };

    return (type[post] || type['default'])();
};

export { titleEmail };
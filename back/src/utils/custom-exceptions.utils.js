export class CustomNotFound extends Error {

    constructor(message, level = 'error') {
        super(message);
        this.name = this.constructor.name;
        this.level = level;
    };
    
};
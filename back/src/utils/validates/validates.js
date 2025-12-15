function isMongoId(_id) {
    return typeof _id === 'string' && /^[a-fA-F0-9]{24}$/.test(_id);
};

export { isMongoId };
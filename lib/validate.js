const validateUtil = {
  validateRequiredFields(requiredFields, obj) {
    if (!obj instanceof Object) return false;
    for (let field of requiredFields) {
      if (obj[field] === undefined) return false;
    }
    return true;
  }
};

module.exports = validateUtil;

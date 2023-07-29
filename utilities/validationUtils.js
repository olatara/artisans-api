// validation.js

const validateProfession = (profession) => {
  const validProfessions = ['plumber', 'electrician', 'carpenter', 'painter'];
  return validProfessions.includes(profession.toLowerCase());
};

module.exports = { 
  validateProfession 
};

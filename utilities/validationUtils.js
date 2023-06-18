// validation.js

const validateProfession = (profession) => {
  const validProfessions = ['plumber', 'electrician', 'carpenter', 'painter'];
  return validProfessions.includes(profession);
};

module.exports = { 
  validateProfession 
};

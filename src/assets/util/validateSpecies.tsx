const validateSpecies = (input: string) => {
  let result = input.trim().toLowerCase();
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export default validateSpecies

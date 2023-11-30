export const getClasses = (classes) => {
  if (!Array.isArray(classes)) {
    console.error('Classes is not an array.');
    return ''; // Return an empty string or handle the non-array case
  }

  return classes
    .filter((item) => item !== '')
    .join(' ')
    .trim();
};

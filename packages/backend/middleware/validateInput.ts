// middleware/validateInput.ts
export const validateMicrochip = (chip: string): boolean => {
  return /^[a-zA-Z0-9]{8,15}$/.test(chip);
};

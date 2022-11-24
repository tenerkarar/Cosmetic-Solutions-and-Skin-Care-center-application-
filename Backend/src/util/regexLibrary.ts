// Email regex
export const emailRegex = new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
  );
  // Phone regex
  export const phoneRegex = new RegExp("[0-9]{7,}");
  // Password regex at least 1 of each of the following: uppercase, lowercase and number
  export const passwordValidationRegex = new RegExp(
    "(?=.*[a-z])+(?=.*[A-Z])+(?=.*[0-9])+"
  );
  
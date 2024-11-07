
const CreateGroupValidation = (values) => {
    let errors = {};
  
    // Validation patterns
    const name_pattern = /^[a-zA-Z]+$/;
    const commisson_pattern = /^100(\.0{1,2})?$|^([1-9]?\d(\.\d{1,2})?|0(\.\d{1,2})?)$/;
    const number_pattern = /^\d+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  
    // Validation logic for each field
    if (values.g_name === "") {
      errors.g_name = "Name should not be empty";
    } else if (!name_pattern.test(values.g_name)) {
      errors.g_name = "Name should contain only alphabetic characters";
    }
  
    if (values.g_starting_date === "") {
      errors.g_starting_date = "Starting date should not be empty";
    }
  
    if (values.g_month === "") {
      errors.g_month = "Number of months should not be empty";
    } else if (!number_pattern.test(values.g_month)) {
      errors.g_month = "Number of months should be a valid number";
    }
  
    if (values.g_amount_per_head === "") {
      errors.g_amount_per_head = "Amount per head should not be empty";
    } else if (!number_pattern.test(values.g_amount_per_head)) {
      errors.g_amount_per_head = "Amount per head should be a valid number";
    }
  
    if (values.g_a_commission === "") {
      errors.g_a_commission = "Agency commission should not be empty";
    } else if (!commisson_pattern.test(values.g_a_commission)) {
      errors.g_a_commission =
        "Agency commission should be a number between 0 and 100 with up to two decimal places";
    }
  
    if (values.g_member === "") {
      errors.g_member = "List of members should not be empty";
    } else if (!number_pattern.test(values.g_member)) {
      errors.g_member = "List of members should be a valid number";
    }
  
    if (values.password === "") {
      errors.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
      errors.password = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.";
    }
  
    return errors;
  };
  
  export default CreateGroupValidation;
  
export const CreateSchemeValidation = (values) => {
  let errors = {};
  // const name_pattern = /^(?:[a-zA-Z]+(?: [a-zA-Z]+)*\s?\d*|\d+[a-zA-Z]+)$/;
  // const commisson_pattern = /^100(\.0{1,2})?$|^([1-9]?\d(\.\d{1,2})?|0(\.\d{1,2})?)$/;
  const number_pattern = /^(?!0\d)\d+$/;
const name_pattern =/^(?!\s*$).+/;


  if (values.sch_name === "") {
    errors.sch_name = "Name should not be empty";
  } 
  // else if (!name_pattern.test(values.sch_name)) {
  //   errors.sch_name = "Name should contain only alphabetic characters or numbers in the correct format";
  // }
  else if (!name_pattern.test(values.sch_name)) {
    errors.sch_name = "Name should contain white space";
  }

  if (values.sch_starting_date === "") {
    errors.sch_starting_date = "Starting date should not be empty";
  }

  if (values.sch_month === "") {
    errors.sch_month = "Number of months should not be empty";
  } else if (!number_pattern.test(values.sch_month)) {
    errors.sch_month = "Number of months should be a valid number";
  }

  if (values.sch_amount_per_head === "") {
    errors.sch_amount_per_head = "Amount per head should not be empty";
  } else if (!number_pattern.test(values.sch_amount_per_head)) {
    errors.sch_amount_per_head = "Amount per head should be a valid number";
  }

  // if (values.sch_commission <=100) {
  //   errors.sch_commission = "Scheme commission should not be greater than 100";
  // }
  if (values.sch_commission < 0 || values.sch_commission > 100) {
    errors.sch_commission = "Commission must be between 0 and 100";
  }
  // Uncomment and adjust commission pattern if needed
  // else if (!commisson_pattern.test(values.sch_commission)) {
  //   errors.sch_commission =
  //     "Scheme commission should be a number between 0 and 100 with up to two decimal places";
  // }

  return errors;
};

export default CreateSchemeValidation;

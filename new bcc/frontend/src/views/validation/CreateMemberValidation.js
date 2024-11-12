// const CreateMemberValidation = (values) => {
//   let errors = {};
//   // Validation patterns
//   // const name_pattern = /^[a-zA-Z][a-zA-Z\s]*$/;
//   const name_pattern =/^(?!\s*$).+/;

//   const mobile_pattern = /^\d{10}$/;
//   const address_pattern = /^[a-zA-Z0-9,'-][a-zA-Z0-9\s,'-]*$/;

//   if (values.mem_name === "") {
//     errors.mem_name = "Name should not be empty";
//   }
//    else if (!name_pattern.test(values.mem_name)) {
//     errors.mem_name = "Name should contain only alphabetic characters";
//   }

//   if (values.mem_mobile === "") {
//     errors.mem_mobile = "Number should not be empty";
//   } else if (!mobile_pattern.test(values.mem_mobile)) {
//     errors.mem_mobile = "Number should contain exactly 10 digits";
//   }

//   if (values.mem_address === "") {
//     errors.mem_address = "Address should not be empty";
//   } else if (!address_pattern.test(values.mem_address)) {
//     errors.mem_address = "Invalid address format or Don't Start with empty ";
//   }

//   return errors;
// };

// export default CreateMemberValidation;



const CreateMemberValidation = (values) => {
  let errors = {};
  
  // Validation patterns
  const name_pattern = /^(?!\s*$).+/; // Ensures name is not empty or whitespace only
  const mobile_pattern = /^\d{10}$/; // Allows exactly 10 digits
  const address_pattern = /^[a-zA-Z0-9,'-][a-zA-Z0-9\s,'-]*$/;

  // Name validation
  if (values.mem_name.trim() === "") {
    errors.mem_name = "Name should not be empty";
  } else if (!name_pattern.test(values.mem_name)) {
    errors.mem_name = "Name should contain valid characters";
  }

  // Mobile validation (optional)
  if (values.mem_mobile && !mobile_pattern.test(values.mem_mobile)) {
    errors.mem_mobile = "Number should contain exactly 10 digits";
  }

  // Address validation
  if (values.mem_address.trim() === "") {
    errors.mem_address = "Address should not be empty";
  } else if (!address_pattern.test(values.mem_address)) {
    errors.mem_address = "Invalid address format or can't start with whitespace";
  }

  return errors;
};

export default CreateMemberValidation;

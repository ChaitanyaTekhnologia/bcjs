// function CreateAgencyValidation(values) {
//   let errors = {};

//   const name_pattern = /^[a-zA-Z]+$/;
//   const commisson_pattern =/^100(\.0{1,2})?$|^([1-9]?\d(\.\d{1,2})?|0(\.\d{1,2})?)$/;
//   const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const password_pattern =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

//   if (values.a_name==="") {
//     errors.a_name = "Name should not be empty";
//   } else if (!name_pattern.test(values.a_name)) {
//     errors.a_name = "Name should contain only alphabetic characters";
//   } else {
//     errors.a_name = "";
//   }

//   if (values.a_commission==="") {
//     errors.a_commission = "Percentage should not be empty";
//   } else if (!commisson_pattern.test(values.a_commission)) {
//     errors.a_commission =
//       "Percentage should be a number between 0 and 100 with up to two decimal places";
//   }
//   else {
//     errors.a_commission = "";
//   }

//   if (values.a_username==="") {
//     errors.a_username = "Email should not be empty";
//   } else if (!email_pattern.test(values.a_username)) {
//     errors.a_username = "Invalid email format";
//   }
//   else {
//     errors.a_username = "";
//   }


//   if (values.password === "") {
//     errors.password = "email should not be empty";
//   } else if (!password_pattern.test(values.password)) {
//     errors.password = "email id didnt match";
//   } else {
//     errors.password = "";
//   }
// }
// export default CreateAgencyValidation;

// function CreateAgencyValidation(values) {
//     let errors = {};

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
//     const phoneRegex = /^\d{10}$/; // Assuming phone number consists of 10 digits
//     const nameRegex = /^[a-zA-Z]+$/; // Assuming name consists of only alphabetic characters
//     const salaryRegex = /^\d+$/; // Assuming salary is a positive integer

//     if (!values.email) {
//         errors.email = "Email should not be empty";
//     } else if (!emailRegex.test(values.email)) {
//         errors.email = "Invalid email format";
//     }

//     if (!values.Password) {
//         errors.Password = "Password should not be empty";
//     } else if (!passwordRegex.test(values.Password)) {
//         errors.Password = "Password should contain at least 8 characters, including uppercase, lowercase letters, and numbers";
//     }

//     if (!values.phone) {
//         errors.phone = "Phone number should not be empty";
//     } else if (!phoneRegex.test(values.phone)) {
//         errors.phone = "Invalid phone number format";
//     }

//     if (!values.name) {
//         errors.name = "Name should not be empty";
//     } else if (!nameRegex.test(values.name)) {
//         errors.name = "Name should contain only alphabetic characters";
//     }

//     if (!values.salary) {
//         errors.salary = "Salary should not be empty";
//     } else if (!salaryRegex.test(values.salary)) {
//         errors.salary = "Salary should be a positive integer";
//     }

//     return errors;
// }

// export default CreateAgencyValidation;
// function CreateAgencyValidation(values) {
//     let errors = {};

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
//     const phoneRegex = /^\d{10}$/; // Assuming phone number consists of 10 digits
//     const nameRegex = /^[a-zA-Z]+$/; // Assuming name consists of only alphabetic characters
//     const salaryRegex = /^\d+$/; // Assuming salary is a positive integer
//     const percentageRegex = /^100(\.0{1,2})?$|^([1-9]?\d(\.\d{1,2})?|0(\.\d{1,2})?)$/; // Assuming percentage can be from 0 to 100
//     const numberRegex = /^\d+$/; // Assuming a positive integer for a generic number

//     if (!values.email) {
//         errors.email = "Email should not be empty";
//     } else if (!emailRegex.test(values.email)) {
//         errors.email = "Invalid email format";
//     }

//     if (!values.Password) {
//         errors.Password = "Password should not be empty";
//     } else if (!passwordRegex.test(values.Password)) {
//         errors.Password = "Password should contain at least 8 characters, including uppercase, lowercase letters, and numbers";
//     }

//     if (!values.phone) {
//         errors.phone = "Phone number should not be empty";
//     } else if (!phoneRegex.test(values.phone)) {
//         errors.phone = "Invalid phone number format";
//     }

//     if (!values.name) {
//         errors.name = "Name should not be empty";
//     } else if (!nameRegex.test(values.name)) {
//         errors.name = "Name should contain only alphabetic characters";
//     }

//     if (!values.salary) {
//         errors.salary = "Salary should not be empty";
//     } else if (!salaryRegex.test(values.salary)) {
//         errors.salary = "Salary should be a positive integer";
//     }

//     if (!values.percentage) {
//         errors.percentage = "Percentage should not be empty";
//     } else if (!percentageRegex.test(values.percentage)) {
//         errors.percentage = "Percentage should be a number between 0 and 100 with up to two decimal places";
//     }

//     if (!values.number) {
//         errors.number = "Number should not be empty";
//     } else if (!numberRegex.test(values.number)) {
//         errors.number = "Number should be a positive integer";
//     }

//     return errors;
// }

// export default CreateAgencyValidation;
// CreateAgencyValidation.js





function CreateAgencyValidation(values) {
    let errors = {};
  
    const name_pattern = /^[a-zA-Z]+$/;
    const commisson_pattern = /^100(\.0{1,2})?$|^([1-9]?\d(\.\d{1,2})?|0(\.\d{1,2})?)$/;
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  
    if (values.a_name === "") {
      errors.a_name = "Name should not be empty";
    } else if (!name_pattern.test(values.a_name)) {
      errors.a_name = "Name should contain only alphabetic characters";
    }
  
    if (values.a_commission === "") {
      errors.a_commission = "Percentage should not be empty";
    } else if (!commisson_pattern.test(values.a_commission)) {
      errors.a_commission =
        "Percentage should be a number between 0 and 100 with up to two decimal places";
    }
  
    if (values.a_username === "") {
      errors.a_username = "Email should not be empty";
    } else if (!email_pattern.test(values.a_username)) {
      errors.a_username = "Invalid email format";
    }
  
    if (values.password === "") {
      errors.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
      errors.password = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.";
    }
  
    return errors;
  }
  
  export default CreateAgencyValidation;
  
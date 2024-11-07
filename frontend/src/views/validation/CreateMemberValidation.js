const CreateMemberValidation = (values) => {
  let errors = {};
  // Validation patterns
  // const name_pattern = /^[a-zA-Z][a-zA-Z\s]*$/;
  const name_pattern =/^(?!\s*$).+/;

  const mobile_pattern = /^\d{10}$/;
  const address_pattern = /^[a-zA-Z0-9,'-][a-zA-Z0-9\s,'-]*$/;

  if (values.mem_name === "") {
    errors.mem_name = "Name should not be empty";
  }
   else if (!name_pattern.test(values.mem_name)) {
    errors.mem_name = "Name should contain only alphabetic characters";
  }

  if (values.mem_mobile === "") {
    errors.mem_mobile = "Number should not be empty";
  } else if (!mobile_pattern.test(values.mem_mobile)) {
    errors.mem_mobile = "Number should contain exactly 10 digits";
  }

  if (values.mem_address === "") {
    errors.mem_address = "Address should not be empty";
  } else if (!address_pattern.test(values.mem_address)) {
    errors.mem_address = "Invalid address format or Don't Start with empty ";
  }

  return errors;
};

export default CreateMemberValidation;





// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import CreateMemberValidation from "./CreateMemberValidation";

// const initialValues = {
//   mem_name: "",
//   mem_mobile: "",
//   mem_address: "",
//   m_email: ""
// };

// const MemberForm = () => {
//   const onSubmit = (values) => {
//     // Handle form submission
//     console.log(values);
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validate={CreateMemberValidation} // Here we pass the validation function
//       onSubmit={onSubmit}
//     >
//       {({ errors, touched }) => (
//         <Form>
//           <div>
//             <label>Name</label>
//             <Field type="text" name="mem_name" />
//             <ErrorMessage name="mem_name" component="div" />
//           </div>
//           <div>
//             <label>Mobile</label>
//             <Field type="text" name="mem_mobile" />
//             <ErrorMessage name="mem_mobile" component="div" />
//           </div>
//           <div>
//             <label>Address</label>
//             <Field type="text" name="mem_address" />
//             <ErrorMessage name="mem_address" component="div" />
//           </div>
//           <div>
//             <label>Email</label>
//             <Field type="email" name="m_email" />
//             <ErrorMessage name="m_email" component="div" />
//           </div>
//           <button type="submit">Submit</button>
//         </Form>
//       )}
//     </Formik>
//   );
// };
// export default MemberForm;

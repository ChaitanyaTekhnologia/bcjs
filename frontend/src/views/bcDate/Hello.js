// import React, { useState, useRef, useEffect } from 'react';
// import { Dropdown, Form } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

// const SelectMembers = () => {
//   const [selectedMemberIds, setSelectedMemberIds] = useState([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const dropdownRef = useRef(null);

//   // Dummy data for members
//   const members = [
//     { id: 1, name: 'John Doe' },
//     { id: 2, name: 'Jane Smith' },
//     { id: 3, name: 'Alice Johnson' },
//     { id: 4, name: 'Michael Brown' },
//     { id: 5, name: 'Emily Davis' },
//     { id: 6, name: 'James Wilson' },
//   ];

//   // Function to handle member selection
//   const handleMemberSelect = (id) => {
//     setSelectedMemberIds((prevIds) => {
//       if (prevIds.includes(id)) {
//         return prevIds.filter((memberId) => memberId !== id);
//       }
//       return [...prevIds, id];
//     });
//   };

//   // Function to toggle dropdown open/close
//   const toggleDropdown = () => {
//     setDropdownOpen((prevOpen) => !prevOpen);
//   };

//   // Close dropdown when clicking outside
//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setDropdownOpen(false);
//     }
//   };

//   // Attach click event listener to detect clicks outside the dropdown
//   useEffect(() => {
//     if (dropdownOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     } else {
//       document.removeEventListener('mousedown', handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [dropdownOpen]);

//   // Filter members based on the search term
//   const filteredMembers = members.filter((member) =>
//     member.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <h2>Select Members</h2>
//       <Dropdown show={dropdownOpen} ref={dropdownRef}>
//         <Dropdown.Toggle
//           id="dropdown-basic-button"
//           onClick={toggleDropdown}
//           className="background_dropdown"
//         >
//           <span className="dropdown_width">Select Members</span>
//         </Dropdown.Toggle>

//         <Dropdown.Menu className="w-100" style={{ maxHeight: '200px', overflowY: 'auto' }}>
//           <Dropdown.Item as="div" className="p-2">
//             <Form.Control
//               type="text"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </Dropdown.Item>
//           {filteredMembers.map((member) => (
//             <Dropdown.Item key={member.id} as="div">
//               <div className="d-flex align-items-center">
//                 <Form.Check
//                   type="checkbox"
//                   value={member.id}
//                   onChange={() => handleMemberSelect(member.id)}
//                   checked={selectedMemberIds.includes(member.id)}
//                 />
//                 <span className="ps-3">{member.name}</span>
//               </div>
//             </Dropdown.Item>
//           ))}
//         </Dropdown.Menu>
//       </Dropdown>

//       <h3>Selected Member IDs: {JSON.stringify(selectedMemberIds)}</h3>
//     </div>
//   );
// };

// export default SelectMembers;


import React from 'react'

function Hello() {
  return (
    <div>
      
    </div>
  )
}

export default Hello

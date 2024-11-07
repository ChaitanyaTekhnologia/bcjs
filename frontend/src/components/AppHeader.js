// import React, { useEffect, useRef } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   CContainer,
//   CDropdown,
//   CDropdownItem,
//   CDropdownMenu,
//   CDropdownToggle,
//   CHeader,
//   CHeaderNav,
//   CHeaderToggler,
//   CNavLink,
//   CNavItem,
//   useColorModes,
// } from "@coreui/react";
// import CIcon from "@coreui/icons-react";
// // import { cilContrast, cilMenu, cilMoon, cilSun } from "@coreui/icons";
// // import CIcon from "@coreui/icons-react";
// import { AppHeaderDropdown } from "./header/index";
// import { set } from "../views/store/uiSlice";

// const AppHeader = () => {
//   const navigate=useNavigate();
//   const headerRef = useRef();
//   const { colorMode, setColorMode } = useColorModes(
//     "coreui-free-react-admin-template-theme"
//   );
//   const dispatch = useDispatch();
//   const sidebarShow = useSelector((state) => state.ui.sidebarShow);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (headerRef.current) {
//         headerRef.current.classList.toggle(
//           "shadow-sm",
//           document.documentElement.scrollTop > 0
//         );
//       }
//     };

//     document.addEventListener("scroll", handleScroll);

//     return () => {
//       document.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
//       <CContainer className="border-bottom px-4" fluid>
//         <CHeaderToggler
//           onClick={() => dispatch(set({ sidebarShow: !sidebarShow }))}
//           style={{ marginInlineStart: "-14px" }}
//         >
//           <CIcon  size="lg" />
//         </CHeaderToggler>
//         <CHeaderNav className="d-none d-md-flex">
//           <CNavItem>
//             <CNavLink to="/dashboard" component={NavLink}>
//               Dashboard
//             </CNavLink>
//           </CNavItem>
//         </CHeaderNav>

//         <CHeaderNav className="ms-auto"></CHeaderNav>

//         <CHeaderNav className="d-none d-md-flex">
//           <CNavItem>
//             <CNavLink to="/dashboard" component={NavLink} >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 fill="currentColor"
//                 className="bi bi-whatsapp pb-1 me-2"
//                 viewBox="0 0 16 16"
//                 onClick={()=>navigate('/agency/whatapp')}
//               >
//                 <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
//               </svg>
//               WhatsApp

//             </CNavLink>
//           </CNavItem>
//         </CHeaderNav>
//         <CHeaderNav className="d-flex align-items-center justify-content-center">
//           <li className="nav-item py-1">
//             <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
//           </li>

//           <CDropdown variant="nav-item" placement="bottom-end">
//             <CDropdownToggle caret={false}>
//               {colorMode === "dark" ? (
//                 <CIcon  size="lg" />
//               ) : colorMode === "auto" ? (
//                 <CIcon  size="lg" />
//               ) : (
//                 <CIcon size="lg" />
//               )}
//             </CDropdownToggle>

//             <CDropdownMenu>
//               <CDropdownItem
//                 active={colorMode === "light"}
//                 className="d-flex align-items-center"
//                 as="button"
//                 type="button"
//                 onClick={() => setColorMode("light")}
//               >
//                 <CIcon className="me-2"  size="lg" /> Light
//               </CDropdownItem>
//               <CDropdownItem
//                 active={colorMode === "dark"}
//                 className="d-flex align-items-center"
//                 as="button"
//                 type="button"
//                 onClick={() => setColorMode("dark")}
//               >
//                 <CIcon className="me-2" size="lg" /> Dark
//               </CDropdownItem>
//               <CDropdownItem
//                 active={colorMode === "auto"}
//                 className="d-flex align-items-center"
//                 as="button"
//                 type="button"
//                 onClick={() => setColorMode("auto")}
//               >
//                 <CIcon className="me-2"  size="lg" /> Auto
//               </CDropdownItem>
//             </CDropdownMenu>
//           </CDropdown>
//           <li className="nav-item py-1">
//             <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
//           </li>
//           <AppHeaderDropdown />
//         </CHeaderNav>
//       </CContainer>
//     </CHeader>
//   );
// };

// export default AppHeader;

import React, { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
} from "@coreui/react";
import { SunFill, MoonFill, CircleHalf } from "react-bootstrap-icons"; // Import Bootstrap icons
import { AppHeaderDropdown } from "./header/index";
import { set } from "../views/store/uiSlice";

const AppHeader = () => {
  const navigate = useNavigate();
  const headerRef = useRef();
  const { colorMode, setColorMode } = useColorModes(
    "coreui-free-react-admin-template-theme"
  );
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.ui.sidebarShow);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        headerRef.current.classList.toggle(
          "shadow-sm",
          document.documentElement.scrollTop > 0
        );
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch(set({ sidebarShow: !sidebarShow }))}
          style={{ marginInlineStart: "-14px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm0-5.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm0-5.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11z"
            />
          </svg>
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
        </CHeaderNav>

        <CHeaderNav className="ms-auto"></CHeaderNav>

        <CHeaderNav className="d-none d-md-flex">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-whatsapp pb-1 me-2"
                viewBox="0 0 16 16"
                onClick={() => navigate("/agency/whatsapp")}
              >
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
              </svg>
              WhatsApp
            </CNavLink>
          </CNavItem>
        </CHeaderNav>

        <CHeaderNav className="d-flex align-items-center justify-content-center">
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>

          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === "dark" ? (
                <MoonFill size={24} />
              ) : colorMode === "auto" ? (
                <CircleHalf size={24} />
              ) : (
                <SunFill size={24} />
              )}
            </CDropdownToggle>

            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === "light"}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode("light")}
              >
                <SunFill className="me-2" size={24} /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === "dark"}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode("dark")}
              >
                <MoonFill className="me-2" size={24} /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === "auto"}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode("auto")}
              >
                <CircleHalf className="me-2" size={24} /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>

          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;

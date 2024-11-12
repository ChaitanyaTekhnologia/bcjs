import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from "@coreui/react";

import { Appnav } from "./Appnav";
import navigation from "../_nav";

import { set } from "../views/store/uiSlice";
const AppSidebar = () => {
  const value = localStorage.getItem("pass");
  console.log(value);

  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.ui.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.ui.sidebarShow);

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(set({ sidebarShow: visible }));
      }}
    >
      <CSidebarHeader className="text-center">
        <CSidebarBrand to="/" className=" text-decoration-none">
          {!unfoldable ? (
            <h2 className="text-center pt-3 ps-5 ">Fintek BC</h2>
          ) : (
            <></>
          )}
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch(set({ sidebarShow: false }))}
        />
      </CSidebarHeader>
      <div className="pt-3"></div>
      <Appnav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch(set({ sidebarUnfoldable: !unfoldable }))}
        />
      </CSidebarFooter>
    </CSidebar>
  );
};

export default AppSidebar;





import React from "react";
import {
  HouseDoor,
  PersonPlus,
  Grid,
  CashStack,
  Receipt,
  Trophy,
  FileText,
  QuestionCircle,
} from "react-bootstrap-icons";
import {  CNavItem } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/agency",
    icon: <HouseDoor className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Create Member",
    to: "/agency/createmember",
    icon: <PersonPlus className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Master Data",
    to: "/agency/masterdatatable",
    icon: <Grid className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Payment",
    to: "/agency/payment",
    icon: <CashStack className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Receipt",
    to: "/agency/receipt",
    icon: <Receipt className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Transfer Amount",
    to: "/agency/transferamount",
    icon: <Trophy className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Winner",
    to: "/agency/schememonthwinner",
    icon: <Trophy className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Report Member",
    to: "/agency/tmreport",
    icon: <FileText className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Datewise Report",
    to: "/agency/daywisereport",
    icon: <QuestionCircle className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Help",
    to: "/#",
    icon: <QuestionCircle className="nav-icon" />,
  },
];

export default _nav;

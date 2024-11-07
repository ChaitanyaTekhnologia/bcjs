// import './App.css';
// import Login from './views/pages/Login';
// import "./scss/style.scss";



import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useColorModes } from "@coreui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Login from "./views/pages/login/Login";
import "./scss/style.scss";

import CreateMember from "./views/member/CreateMember";
import Beading from "./views/beading/Beading";
import Payment from "./views/payment/Payment";
import SingleMemberPaymentDetails from "./views/payment/SingleMemberPaymentDetails";
import SearchMonthPaymentDetails from "./views/payment/SearchMonthPaymentDetails";
import WinnerDetails from "./views/winnerdetail/WinnerDetails";
import MasterDatatable from "./views/masterdatatable/MaterDatatable";
import HistoryAmount from "./views/winnerdetail/HistoryAmount";
import CreateMember1 from "./views/member/CreateMember1";
import WinnerSchemeMonth from "./views/winnerdetail/WinnerSchemeMonth";
import Scheme from "./views/scheme/Scheme";
import CreateScheme from './views/scheme/CreateScheme'
import Report from './views/scheme/Report';
import EditMember from './views/member/EditMember';
import Tmreport from "./views/report/Tmreport";
import DeleteScheme from "./views/scheme/DeleteScheme";
import Receipt from "./views/payment/Receipt";
import Upate from "./views/report/Upate";
import BcDate from "./views/bcDate/BcDate";
import Forgotpassword from "./views/pages/login/Forgotpassword";
import EnterOtp from "./views/pages/login/EnterOtp";
import ChangePassword from "./views/pages/login/ChangePassword";
import WinnerData from "./views/beading/WinnerData";
import Bcdatamessage from "./views/bcDate/Bcdatamessage";
import ProtectedRoute from "./components/ProtectedRoute";
import Updateschname from "./views/scheme/Updateschname";
import SelectMembers from "./views/bcDate/Hello";
import DateWisereport from "./views/report/DateWisereport";
import TransferAmount from "./views/payment/TransferAmount";

function App() {
  const { isColorModeSet, setColorMode } = useColorModes("coreui-free-react-admin-template-theme");
  const storedTheme = useSelector((state) => state.theme);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split("?")[1]);
    const theme = urlParams.get("theme") && urlParams.get("theme").match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }
    if (isColorModeSet()) {
      return;
    }
    setColorMode(storedTheme);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/forgotemail" element={<Forgotpassword/>} />
          <Route path="/enterotp/:email" element={<EnterOtp/>} />
          <Route path="/changepassword/:email" element={<ChangePassword/>} />

          <Route path="/agency" element={
            <ProtectedRoute>
              <DefaultLayout />
          </ProtectedRoute> 
          }>
            
            <Route index element={<Scheme/>} />
            <Route path="/agency/editmember/:memberId" element={ <ProtectedRoute><EditMember /></ProtectedRoute>} />
            <Route path="/agency/createscheme" element={<ProtectedRoute><CreateScheme /></ProtectedRoute>} />
            <Route path="/agency/masterdatatable" element={<ProtectedRoute><MasterDatatable /></ProtectedRoute>} />
            <Route path="/agency/createm1/:schemeId" element={<ProtectedRoute><CreateMember1 /></ProtectedRoute>} />
            <Route path="/agency/createmember" element={<ProtectedRoute><CreateMember /></ProtectedRoute>} />
            <Route path="/agency/schememonthwinner" element={<ProtectedRoute><WinnerSchemeMonth /></ProtectedRoute>} />
            <Route path="/agency/beading/:schemeId" element={<ProtectedRoute><Beading /></ProtectedRoute>} />
            <Route path="/agency/report/:schemeId" element={<ProtectedRoute><Report /></ProtectedRoute>} />
            <Route path="/agency/winnerdetails/:schemeId" element={<ProtectedRoute><WinnerDetails /></ProtectedRoute>} />
            <Route path="/agency/delete/:schemeId" element={<ProtectedRoute><DeleteScheme /></ProtectedRoute>} />
            <Route path="/agency/singlememberpaymentdetail/:schemeId" element={<ProtectedRoute><SingleMemberPaymentDetails /></ProtectedRoute>} />
            <Route path="/agency/searchmonthpaymentdetail/:schemeId" element={<ProtectedRoute><SearchMonthPaymentDetails /></ProtectedRoute>} />
            <Route path="/agency/history" element={<ProtectedRoute><HistoryAmount /></ProtectedRoute>} />
            <Route path="/agency/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            <Route path="/agency/receipt" element={<ProtectedRoute><Receipt /></ProtectedRoute>} />
            <Route path="/agency/tmreport" element={<ProtectedRoute><Tmreport /></ProtectedRoute>} /> 
            <Route path="/agency/update/:schemeId" element={<ProtectedRoute><Upate /></ProtectedRoute>} />
            <Route path="/agency/updateDate/:schemeId" element={<ProtectedRoute><BcDate/></ProtectedRoute>} />
            <Route path="/agency/winnerdata/:schemeId/:bcdateId" element={<ProtectedRoute><WinnerData /></ProtectedRoute>} />
            <Route path="/agency/bcdatemessge/:schemeId" element={<ProtectedRoute><Bcdatamessage/></ProtectedRoute>} />
            <Route path="/agency/updatename/:schemeId/:name" element={<ProtectedRoute><Updateschname/></ProtectedRoute>} />
            <Route path="/agency/daywisereport" element={<ProtectedRoute><DateWisereport/></ProtectedRoute>} />
            <Route path="/agency/transferamount" element={<ProtectedRoute><TransferAmount/></ProtectedRoute>} />


            {/* <Route path="" element={<SendDate/>} /> */}


          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

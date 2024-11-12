const express = require("express");
const MemberController = require("../Controllers/MemberController.js");
const SchemeController = require("../Controllers/Schemecontroller.js");
const PaymentController = require("../Controllers/PaymentController.js");
const BiddingController = require("../Controllers/BiddingController.js");
const WinnerController = require("../Controllers/WinnerController.js");
const VoucherController = require("../Controllers/VoucherController.js");
const TransactionController = require("../Controllers/TransactionController.js");
const ReportController = require("../Controllers/ReportController.js");
const authController = require("../Controllers/authController.js");
const whatsappController = require("../Controllers/whatsappController.js");
const bcdateController = require("../Controllers/bcdateController.js");
const forgotController = require("../Controllers/forgotController.js");

const router = express.Router();
//scheme Route test
router.post("/cretaescheme", SchemeController.createScheme);
router.get("/scheme", SchemeController.getSchemeData);
router.post("/totalamountscheme", SchemeController.gettotalaomunt);
router.post("/addsm", SchemeController.addschememember);
router.post("/ad", SchemeController.createScheme1);
router.post(
  "/shemewisememberinformation",
  SchemeController.fechSchemeinformation
);
router.post("/deletescheme", SchemeController.deleteScheme);

router.post("/deletefromtbls", SchemeController.deleteMemberscheme);

router.post("/getmemberschemename", SchemeController.getMemberDataOnScheme);

router.post(
  "/getmemberschemenamebidding",
  SchemeController.getMemberDataOnSchemebidding
);


router.post("/updatename", SchemeController.updateaname);







router.get("/getschemeName", SchemeController.getSchemeName);
router.post("/updatecommission", SchemeController.updatecommission);
router.post("/updatotal", SchemeController.updatotal);
router.post("/noofmonth", SchemeController.findSchemeMonth)
//Member Router test
router.post("/createmember", MemberController.cretaeMember);
router.get("/getmember", MemberController.getMemberData);
router.post("/deletemember", MemberController.deleteMember);
router.put("/memberupdate", MemberController.updateMember);
router.get("/getmembername", MemberController.getMemberName);

//Payment Route test
router.post("/createpayment", PaymentController.createPayment);
router.get("/getpayment", PaymentController.getPaymentData);
router.post("/geroutertpaymentname", PaymentController.getPaymentOnUnameBasis);
router.post("/geroutert", PaymentController.getPaymentOnMonthBasis);

//Bidding Routes test
router.post("/addbidding", BiddingController.createBidding);
router.get("/add", BiddingController.createBidding);
router.post("/biddingdata", BiddingController.getBiddingMonthBasis);
router.delete("/deletebiddingdata", BiddingController.deleteBidding);
router.post("/bidbcdateid", BiddingController.getlastbcdateId);

// Winner Routes test
router.post("/addw", WinnerController.winnerData);
router.post("/winnerschememonth", WinnerController.getWinnerBySchemeidname);
router.post("/winnerscheme", WinnerController.getWinnerDataByScheme);
router.post("/winnerdata", WinnerController.getWinnerdatascheme);
router.post("/report", WinnerController.reportData);
router.post("/winnerdata", WinnerController.getWinnerdatascheme);

router.post("/winnerdata1", WinnerController.getWinnerDatatest);

router.post("/winnerdata2", WinnerController.getWinnerDataonmonthscheme);

router.post(
  "/winnerdatasnamemonth",
  WinnerController.getWinnerDataBySchemeMonth
);

router.get("/winner/scheme/:schemeId", WinnerController.getWinnerDataByScheme);
// dropdowntest
router.get("/getmembername", MemberController.getMemberName);

// router.post("/winnerentryvoucher12", VoucherController.createvoucher12);
// router.post("/winner12", VoucherController. createvoucher12);

//Winner
router.post("/winner", WinnerController.getWinnerData);

//Tracsaction api
router.post(
  "/trasactionentrymember1",
  TransactionController.trasactionentrymember1
);
router.post(
  "/trasactionentrymember2",
  TransactionController.trasactionentrymember2
);
router.post(
  "/trasactionentrymember3",
  TransactionController.trasactionentrymember3
);
router.post(
  "/trasactionentrymember4",
  TransactionController.trasactionentrymember4
);
router.post(
  "/trasactionentrymember5",
  TransactionController.trasactionentrymember5
);
router.post(
  "/trasactionentrymember6",
  TransactionController.trasactionentrymember6
);
router.post(
  "/trasactionentrymember7",
  TransactionController.trasactionentrymember7
);
router.post(
  "/trasactionentrymember8",
  TransactionController.trasactionentrymember8
);


router.post(
  "/trasactionentrymember68",
  TransactionController.trasactionentrymember68
);


//Vaoucher Api
router.post("/winnerentryvoucher", VoucherController.createvoucher);
router.post("/w", VoucherController.checkTotalNo);
router.post("/w1", VoucherController.checkWinnerPresentFormonth);
router.post("/checkstatus_of_scheme", VoucherController.checkbcdatestatus);


//Report api
router.post("/reportmember", ReportController.getreport);
router.post("/reportmember1", ReportController.getreport2);
router.get("/totalbalanceagency", ReportController.gettotalbalanceofagency);





router.post("/reportlastmonth", ReportController.getreportlastmonth);

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/bcdate", bcdateController.createBcDateRecord);
router.get("/fetchbcdata", bcdateController.fetchBcDateRecord);
router.post("/fetchbcdatascheme", bcdateController.fetchBcDateRecordschemeId);
router.post("/updatedate", bcdateController.updatedate);
router.post("/get", bcdateController.getid);
router.post("/updatstatus", bcdateController.updateBcDateStatus);
router.post("/drowpdown", bcdateController.Dropdown);
router.post("/getbcdate", bcdateController.getreceiptbcdateId);
router.post("/getbcno", bcdateController.getbc_no);
router.post("/getbcdatebcno", bcdateController.getbcdateandbcno);



router.post('/sendwinner', whatsappController.sendWinner);
router.post('/sendwinnerinfo', whatsappController.sendMessageWinnerInfo)
router.post('/sendbcdate', whatsappController.sendbcDate);
router.post('/sendpenddingamount', whatsappController.sendPenddingAmount)
router.post('/crediteamount', whatsappController.sendcredited)
router.post('/deabiteamount', whatsappController.senddebiated)

//forgot password
router.post('/sendotp',forgotController.sendOtp);
router.post('/verifyotp',forgotController.verifyOtp);
router.post('/changepassword',forgotController.changePassword);

router.post("/hello", SchemeController.CheckTotaladdschememember);
router.post("/bcstatus", bcdateController.getbcstatus);







///////////////////////////////////////daywise //////////////////////////////
router.post("/datywisereport",ReportController.getreportofdays);


module.exports = router;

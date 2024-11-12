// store.js
import { configureStore } from '@reduxjs/toolkit';
// import apiReducer from './apiSlice';

import uiReducer from './uiSlice'
import schemeReducer from './schemeSlice'
import memberSlice from './memberSlice';
import paymentReducer from './paymentSlice'
import memberReducer from './memberSlice1'
import winnersReducer from './winnersSlice'
import bSlice  from './bSlice';
import selectedMemberReducer from './selectedMemberSlice'
import reportReducer from './reportSlice'
import receiptReducer from './receiptSlice'
import updateReducer from './updateSlice'
import dateReducer from './dateSlice'
// import Scheme from '../scheme/Scheme';
import Scheme1Reducer from './schSlice'
import forgotPasswordReducer from './forgotPasswordSlice'
export default configureStore({
  reducer: {
    ui: uiReducer,
    scheme: schemeReducer,
    selectedMember: selectedMemberReducer,
    bSlice: bSlice,
    payments: paymentReducer,
    members:memberSlice,
    member: memberReducer,
    winners: winnersReducer,
    report: reportReducer,
    receipts: receiptReducer,
    update: updateReducer,
    date: dateReducer,
    Schemes:Scheme1Reducer,
    forgotPassword: forgotPasswordReducer,
  },
});





















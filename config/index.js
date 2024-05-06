import profileTable  from "../v1/profile/model/profileModel.js";
import teamTable from "../v1/team/model/teamModel.js";
import eventTable from "../v1/event/model/eventModel.js";
import userEventTable from "../v1/event/model/userEventModel.js";
import userTeamTable from "../v1/team/model/userTeamModel.js"
import roleTable from "../v1/roles/model/roleModel.js";
import shopTable from "../v1/shop/model/shopModel.js";
import shopImagesTable from "../v1/shop/model/shopImagesModel.js";
import transactionTable from "../v1/transactions/model/transactionModel.js";
import rentalAgreementTable from "../v1/rentalAgreement/model/rentalAgreementModel.js";
import tenantTable from "../v1/rentalAgreement/model/tenantModel.js";
import noteTable from "../v1/notes/model/noteModel.js";
import referralCodesTable from "../v1/event/model/referralModel.js";

export default [ profileTable,eventTable,teamTable, roleTable,shopTable, shopImagesTable, transactionTable,tenantTable,rentalAgreementTable, userEventTable, userTeamTable, noteTable, referralCodesTable];
import profileTable  from "../v1/profile/model/profileModel.js";
import teamTable from "../v1/team/model/teamModel.js";
import eventTable from "../v1/event/model/eventModel.js";
import userEventTable from "../v1/event/model/userEventModel.js";
import userTeamTable from "../v1/team/model/userTeamModel.js"
import roleTable from "../v1/roles/model/roleModel.js";
import shopTable from "../v1/shop/model/shopModel.js";
import imagesTable from "../v1/images/imagesModel.js";
import transactionTable from "../v1/transactions/model/transactionModel.js";
import rentalAgreementTable from "../v1/rentalAgreement/model/rentalAgreementModel.js";
import documentsTable from "../v1/rentalAgreement/model/documentModel.js";
import tenantTable from "../v1/rentalAgreement/model/tenantModel.js";
import noteTable from "../v1/notes/model/noteModel.js";
import referralCodesTable from "../v1/event/model/referralModel.js";
import feedbackTable from "../v1/home/model/feedbackModel.js";
import activationCodeTable from "../v1/admin/model/activationCodeModel.js";

export default [ 
    profileTable, activationCodeTable, eventTable, teamTable, roleTable, shopTable, imagesTable, transactionTable,
    tenantTable,rentalAgreementTable, userEventTable, userTeamTable, noteTable, referralCodesTable, documentsTable, 
    feedbackTable
];
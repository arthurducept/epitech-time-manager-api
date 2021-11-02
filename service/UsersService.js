'use strict';

const UsersRepo = require('../repos/UsersRepo');
// const CustomerService = require('./CustomersService');
// const SendMail = require('../MailServices/SendMail');
// const Status = require('./StatusService');
// const { cron_reminder_delays } = require('../config/config.json');
// const { getCaseStatus } = require('../repos/StatusRepo');
// const { getUTCHoursWithoutDST } = require('../utils/slots');

exports.getUser = async function(userID) {
  return UsersRepo.getUser(userID);
};

exports.getUsers = async function(params) {
  return UsersRepo.getUsers(params);
};

exports.createUser = async function(params) {
  return UsersRepo.createUser(params);
};

exports.updateUser = async function(userID, params) {
  return UsersRepo.updateUser(userID, params);
};



// exports.createCase = async function(userLogged, body) {
//   var customers = await CustomerService.addCustomers(body.customerA, body.customerB);
//   var customerA = customers.customerA;
//   var customerB = customers.customerB;
//   var dateCreation = new Date();
//   var status = await Status.getStartStatus(customerA, customerB);
//   var stateStartCase;
//   if (status === 220 || status === 1) stateStartCase = 'full';
//   else stateStartCase = 'partial';

//   // DONE : Lorsque les mails sont connectés, le post /cases doit créer une case avec le status /0\ !
//   // DONE : La case passe en id 110 / 220 UNIQUEMENT si les mails sont correctement partis grâce aux services.
//   // TODO : Si la case est restée en status 0, réessayer l'envoi de mail le lendemain

//   var cases = await CaseRepo.createCase(body, customerA, customerB, dateCreation, stateStartCase);
//   cases = {
//     idCase: cases.id,
//     idPrescriber: cases.idPrescriber,
//     status: cases.status,
//     stateStartCase: cases.state_start_case,
//     emailJurist: cases.emailJurist,
//     sinisterNumber: cases.sinisterNumber,
//     customerA: customerA,
//     customerB: customerB,
//     details: cases.details,
//   };

//   await Status.updateStatus(cases.idCase, 110, customers);
//   // if (stateStartCase == "full") await Status.updateStatus(cases.idCase, 220, customers);
//   return cases;
// };

// /**
//  * Remonte une ou plusieurs affaires de manière ordonée en fonction des paramètres
//  * @param {Object}      params            - Objet contenant les paramètres de l'affaire
//  * @param {Int32Array}  params.idCase     - Id de l'affaire recherchée
//  * @param {Int32Array}  params.idCustomer - Id d'un des clients
//  * @param {String}      params.lastName   - Nom d'un des clients
//  * @param {String}      params.sortBy     - Enum[apporteur, id, name, phone, email, status] - Remonte les affaires dans l'ordre du paramètre choisi
//  * @param {String}      params.orderBy    - Enum[asc, desc, default] - Remonte les affaires dans l'ordre choisi
//  * @param {Int32Array}  params.limit      - Nombre maximal de lignes retournées
//  * @param {Int32Array}  params.offset     - Retourne les lignes à partir de la n-ième (correspondant au offset)
//  * @param {Int32Array}  params.input      - Contenu du champ de recherche
//  * @param {Int32Array}  params.apporteur  - Filtre sur les apporteurs
//  * @param {Int32Array}  params.status     - Filtre sur une liste de statuts
//  * @returns
//  */
// exports.getCases = async function(params) {

//   var cases = await CaseRepo.getCases(params);
//   cases = {
//     count: cases.count,
//     cases: cases.cases.map((element) => {
//       return {
//         idCase: parseInt(element.id),
//         status: {
//           idStatus: parseInt(element.id_status),
//           name: element.status_name,
//         },
//         idPrescriber: element.id_prescriber,
//         sinisterNumber: element.sinister_number,
//         emailJurist: element.email_jurist,
//         details: element.details,
//         customerA: {
//           idCustomer: element.id_customer_a,
//           firstName: element.customer_a_first_name,
//           lastName: element.customer_a_last_name?.toUpperCase(),
//           contactEmail: element.customer_a_contact_email,
//           contactTel: element.customer_a_contact_tel,
//           postalCode: element.customer_a_postal_code,
//           ...(element.customer_a_code ? {code: element.customer_a_code}:{})
//         },
//         customerB: {
//           idCustomer: element.id_customer_b,
//           firstName: element.customer_b_first_name,
//           lastName: element.customer_b_last_name?.toUpperCase(),
//           contactEmail: element.customer_b_contact_email,
//           contactTel: element.customer_b_contact_tel,
//           postalCode: element.customer_b_postal_code,
//           ...(element.customer_b_code ? {code: element.customer_b_code}:{})
//         },
//       };
//     }),
//   };
//   return cases;
// };

// exports.getProgressReport = async function(idCase) {
//   var allStatus = await Status.getStatus();
//   var logs = await CaseRepo.getProgressReport(idCase);
//   var caseStatus = await getCaseStatus(idCase)
//   var contextStatus, progress;
//   if ([0,1,10,20,30,40,50,60,70,80,90].includes(caseStatus.idStatus)) contextStatus = [caseStatus.idStatus]
//   else if ([110,111,112].includes(caseStatus.idStatus)) contextStatus = [110,111,112]
//   else if ([130,131,132,139].includes(caseStatus.idStatus)) contextStatus = [130,131,132,139]
//   else if ([150,151,152,159].includes(caseStatus.idStatus)) contextStatus = [150,151,152,159]
//   else if ([170,171,172].includes(caseStatus.idStatus)) contextStatus = [170,171,172]
//   else if ([220,221,222,223,224].includes(caseStatus.idStatus)) contextStatus = [220,221,222,223,224]
//   else if ([240,241,242,249].includes(caseStatus.idStatus)) contextStatus = [240,241,242,249]
//   else if ([260,261,262,269].includes(caseStatus.idStatus)) contextStatus = [260,261,262,269]
//   else if ([270,271,272,279].includes(caseStatus.idStatus)) contextStatus = [270,271,272,279]
//   else throw "Bad request"

//   var firstStatus = logs.find(log => log.type == contextStatus[0])
//   progress = contextStatus.map(status => {
//     let performed = logs.find(log => log.type == status) ? true : false
//     return {
//       type: allStatus.find(el => el.idStatus == status),
//       performed,
//       ...(performed ? {sentAt: logs.find(log => log.type == status).sent_at} : { sendingAt: getNewDate(firstStatus.sent_at, getCronDelay(status))}) // TODO : terminer
//     }
//   })
//   return progress;
// };

// // TODO logique - DONE MOCKUP
// exports.getCasePDF = async function(idCase) {
//   return new Promise((resolve, reject) => {
//     resolve({ content: 'string' });
//   });
// };

// exports.getApporteurs = async function() {
//   return CaseRepo.getApporteurs();
// };

// function getNewDate(date, delay) {
//   date = new Date(date)
//   let compareDate = getUTCHoursWithoutDST(date, 9, "Europe/Paris")
//   if (date.getTime() < compareDate.getTime()) date = new Date(compareDate)
//   else date = new Date(compareDate.setHours(compareDate.getHours() + 24))
//   return new Date((date.setHours(date.getHours() + delay)))
// }

// function getCronDelay(status) {
//   switch (status) {
//     case 111:
//       return cron_reminder_delays.part_a_progression.text_message
//     case 112:
//       return cron_reminder_delays.part_a_progression.phone_call
//     case 131:
//       return cron_reminder_delays.part_a_exploration_meeting.second_mail
//     case 132:
//       return cron_reminder_delays.part_a_exploration_meeting.phone_call
//     case 151:
//       return cron_reminder_delays.part_b_individual_meeting.second_mail
//     case 152:
//       return cron_reminder_delays.part_b_individual_meeting.phone_call
//     case 221:
//       return cron_reminder_delays.part_b_progression.second_mail
//     case 222:
//       return cron_reminder_delays.part_b_progression.text_message
//     case 223:
//       return cron_reminder_delays.part_b_progression.second_text_message
//     case 224:
//       return cron_reminder_delays.part_b_progression.phone_call
//     case 241:
//       return cron_reminder_delays.part_b_exploration_meeting.second_mail
//     case 242:
//       return cron_reminder_delays.part_b_exploration_meeting.phone_call
//     case 261:
//       return cron_reminder_delays.part_b_individual_meeting.second_mail
//     case 262:
//       return cron_reminder_delays.part_b_individual_meeting.phone_call
//     case 271:
//       return cron_reminder_delays.part_b_group_meeting.second_mail
//     case 272:
//       return cron_reminder_delays.part_b_group_meeting.phone_call
//     default:
//       break;
//   }
// }
function createSlots(slotConfig, dateStart) {

  // Getting values from slotConfig using destructuring
  const { configSlotHours, configSlotMinutes, configSlotPreparation, timeArr } = slotConfig;

  // This is the default date that we are using to make use of javascript date functions
  // slotsArray will hold final slots
  // _timeArrStartTime is used to store start time date object from the timeArr
  // _timeArrEndTime is used to store end time date object from the timeArr
  // _tempSlotStartTime is used to create slots by adding config values and check that the time is less than the end time and lies withing the duration specified
  // _startSlot holds value of start date time of slot
  // _endSlot holds value of end date time of slot

  let defaultDate = new Date(dateStart);
  defaultDate = defaultDate.toISOString().substring(0, 10)
  let slotsArray = []
  let _timeArrStartTime;
  let _timeArrEndTime;
  let _tempSlotStartTime;
  let _endSlot;
  let _startSlot;

  // Loop over timeArr
  for (var i = 0; i < timeArr.length; i++) {

    // Creating time stamp using time from timeArr and default date
    _timeArrStartTime = (new Date(defaultDate + " " + timeArr[i].startTime)).getTime();
    _timeArrEndTime = (new Date(defaultDate + " " + timeArr[i].endTime)).getTime();
    _tempSlotStartTime = _timeArrStartTime;

    // Loop around till _tempSlotStartTime is less end time from timeArr
    while ((new Date(_tempSlotStartTime)).getTime() < (new Date(_timeArrEndTime)).getTime()) {

      _endSlot = new Date(_tempSlotStartTime);
      _startSlot = new Date(_tempSlotStartTime);

      //Adding minutes and hours from config to create slot and overiding the value of _tempSlotStartTime
      _tempSlotStartTime = _endSlot.setHours(parseInt(_endSlot.getHours()) + parseInt(configSlotHours));
      _tempSlotStartTime = _endSlot.setMinutes(parseInt(_endSlot.getMinutes()) + parseInt(configSlotMinutes));

      // Check _tempSlotStartTime is less than end time after adding minutes and hours, if true push into slotsArr
      if (((new Date(_tempSlotStartTime)).getTime() <= (new Date(_timeArrEndTime)).getTime())) {

        // DateTime object is converted to time with the help of javascript functions
        // If you want 24 hour format you can pass hour12 false
        let date1 = new Date(_startSlot)
        let date2 = new Date(_endSlot)
        // date1.setHours(_startSlot.getHours() -2)
        // date2.setHours(_endSlot.getHours() -2)
        slotsArray.push({
          "start": date1,
          "end": date2
          // "start": (new Date(_startSlot)).toISOString(),
          // "end": (new Date(_endSlot)).toISOString()
        });
      }

      //preparation time is added in last to maintain the break period
      _tempSlotStartTime = _endSlot.setMinutes(_endSlot.getMinutes() + parseInt(configSlotPreparation));
    }
  }

  return slotsArray;
}

function removeTakenSlots(slots, takenSlots) {
  for (var i = slots.length - 1; i >= 0; i--) {
    if (!takenSlots.length && !compareDate(new Date(slots[i].start), true)) slots.splice(i, 1)
    for (let j = 0; j < takenSlots.length; j++) {
      if (
        new Date(slots[i].end).getTime() - new Date(takenSlots[j].start).getTime() > 0 && 
        new Date(slots[i].end).getTime() - new Date(takenSlots[j].end).getTime() < 0 ||
        new Date(slots[i].start).getTime() - new Date(takenSlots[j].start).getTime() > 0 && 
        new Date(slots[i].start).getTime() - new Date(takenSlots[j].end).getTime() < 0 ||
        new Date(slots[i].start).getTime() - new Date(takenSlots[j].start).getTime() <= 0 &&
        new Date(slots[i].end).getTime() - new Date(takenSlots[j].end).getTime() >= 0 ||
        (!compareDate(new Date(slots[i].start), true))
      ) {
        slots.splice(i, 1)
        break;
      }
    }
  }
  return slots
}

function defineDaysList(date, type, numberOfDays) {
  let dateToAdd = new Date(date)
  let list = []
  for (let i = 0; i < numberOfDays;) {
    if ((dateToAdd.getUTCDay() == 1 && type == 15) || (dateToAdd.getUTCDay() == 3 && type == 60)) {
      list.push(getUTCHoursWithoutDST(new Date(dateToAdd), 9, 'Europe/Paris'))
      i++
    }
    dateToAdd.setDate(dateToAdd.getDate() + 1)
  }
  return list
}

function compareDate(date, boolean, type) {
  date = new Date(date)
  let compareDate = new Date((new Date()).toISOString())
  compareDate.setDate(compareDate.getDate() + 2)
  if (boolean) {
    if (date.getTime() < compareDate.getTime()) return false
    if ((type == "group" || type == "individual") && date.getDay() != 3) return false
    if (type == "exploration" && date.getDay() != 1) return false
  }
  return (date.getTime() < compareDate.getTime()) ? new Date(compareDate.toISOString()) : date
}

/**
 * Fonction qui retourne la configuration des heures en format UTC 
 * // Do the magic !
 * @param {Date} date - Date du jour pour lequel il faut créer la configuration
 * @param {String | null} noon - définit si la fonction doit retourner la configuration pour l'après-midi
 * @returns Object
 */
function getCustomHoursConfig(date, noon) {
  let dutc = (new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 9, 0, 0, 0)))
  let dfr_date = new Date((new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 0, 0, 0)).toLocaleString("en-US", {timeZone : "Europe/Paris"}))
  let hourStartFR = `${((noon ? 14 : 9) - (dfr_date.getHours() - dutc.getHours())).toString().padStart(2, "0")}:00`
  let hourEndFR = `${((noon ? 14 : 9) - (dfr_date.getHours() - dutc.getHours()) + 4).toString().padStart(2, "0")}:00`
  return {"startTime": hourStartFR, "endTime": hourEndFR}
}

/**
 * Fonction des BGs
 * @param {Date} date - Date sous format UTC+0, ISO 8601
 * @param {Int32Array} timeZoneHours - Heures de la timeZone recherchée
 * @param {String} timeZone - TimeZone
 * @returns date
 */
function getUTCHoursWithoutDST(date, timeZoneHours, timeZone) {
  date = new Date(date)
  let dutc = (new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), timeZoneHours, 0, 0, 0)))
  let dtz = new Date((new Date(date.getFullYear(), date.getMonth(), date.getDate(), timeZoneHours, 0, 0, 0)).toLocaleString("en-US", {timeZone}))
  return new Date(date.setHours(timeZoneHours - (dtz.getHours() - dutc.getHours()),0,0,0))
}

exports.createSlots = createSlots
exports.removeTakenSlots = removeTakenSlots
exports.defineDaysList = defineDaysList
exports.compareDate = compareDate
exports.getCustomHoursConfig = getCustomHoursConfig
exports.getUTCHoursWithoutDST = getUTCHoursWithoutDST
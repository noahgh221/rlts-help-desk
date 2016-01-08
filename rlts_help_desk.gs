function formSubmitReply(e) {
  var userEmail = e.values[3];
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var row = sheet.getActiveRange().getRowIndex();
  // Set the status of the new ticket to 'New'.
  // Column H is the Status column
  sheet.getRange(lastRow, getColIndexByName("Status")).setValue("New");

  // Calculate how many other 'New' tickets are ahead of this one
  var numNew = 0;
  for (var i = 2; i < lastRow; i++) {
    if (sheet.getRange(i, getColIndexByName("Status")).getValue() == "New") {
      numNew++;
    }
  }
  MailApp.sendEmail(userEmail,
                    "RLTS Ticket #" + lastRow + " " + sheet.getRange(lastRow, getColIndexByName("Subject")).getValue(),
                    "DESCRIPTION OF ISSUE:\n" + sheet.getRange(lastRow, getColIndexByName("Description")).getValue() +
                    "\n\n=====================\n\nThanks for submitting your issue or request. We'll try to resolve " +
                    "high urgency issues as soon as possible.  Others issues will be addressed as time permits. " +
                    // "You are currently number " + (numNew + 1) + " in the queue." +
                    "\n\nSincerely, \n\nYour friendly RLTS Helper. \n\n[PLEASE DO NOT RESPOND DIRECTLY TO THIS EMAIL] \n\n" + 
                      "Submit a new request at: [link to google sheet]",
                    {name:"RLTS Help Desk"});
}


function emailNotificationWithTicketMetadata() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var row = sheet.getActiveRange().getRowIndex();
  //email addresses below are automatically notified on form submit 
  var toNotify = 'person@email.com, person2@email.com';
  var submitter = sheet.getRange(row, getColIndexByName("Contact email")).getValue();
  var urgency = sheet.getRange(row, getColIndexByName("Urgency")).getValue();
  var subject = sheet.getRange(lastRow, getColIndexByName("Subject")).getValue();
  var description = sheet.getRange(lastRow, getColIndexByName("Description")).getValue();
  // Set the status of the new ticket to 'New'.
  // Column H is the Status column
  sheet.getRange(lastRow, getColIndexByName("Status")).setValue("New");

  // Calculate how many other 'New' tickets are ahead of this one
  var numNew = 0;
  for (var i = 2; i < lastRow; i++) {
    if (sheet.getRange(i, getColIndexByName("Status")).getValue() == "New") {
      numNew++;
    }
  }
  MailApp.sendEmail(toNotify,"Ticket #" + lastRow + " " + subject,
                    "[this is an automated notification email]" +
                    "\n\nDESCRIPTION OF ISSUE:\n" + description +
                    "\n\nUrgency: " + urgency +
                    "\n\nSubmitter: " + submitter +
                    "\n\nView Tickets: [link to google sheet]",
                   {name:"RLTS Help Desk"});
}


function getColIndexByName(colName) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var numColumns = sheet.getLastColumn();
  var row = sheet.getRange(1, 1, 1, numColumns).getValues();
  for (i in row[0]) {
    var name = row[0][i];
    if (name == colName) {
      return parseInt(i) + 1;
    }
  }
  return -1;
}

function emailStatusUpdates() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var row = sheet.getActiveRange().getRowIndex();
  var userEmail = sheet.getRange(row, getColIndexByName("Contact email")).getValue();
  var subject = "RLTS Ticket #" + row + " " + sheet.getRange(row, getColIndexByName("Subject")).getValue();
  var body = "Congratulations!  We've updated the status of your ticket.\n\nSTATUS: " + sheet.getRange(row, getColIndexByName("Status")).getValue();
  body += "\nRLTS HELPER: " + sheet.getRange(row, getColIndexByName("RLTS helper")).getValue();
  body += "\nURGENCY: " + sheet.getRange(row, getColIndexByName("Urgency")).getValue();
  body += "\n\nDESCRIPTION: " + sheet.getRange(row, getColIndexByName("Description")).getValue();
  body += "\n\nNOTES: " + sheet.getRange(row, getColIndexByName("Notes")).getValue();
  body += "\n\nRESOLUTION: " + sheet.getRange(row, getColIndexByName("Resolution")).getValue();
  body += "\n\n=====================\n\n[PLEASE DO NOT RESPOND DIRECTLY TO THIS EMAIL. Email your RLTS Helper if you have questions or updates]";
  body += "\n\nSubmit a new request at: [link to ticket form]";
  
  MailApp.sendEmail(userEmail, subject, body, {name:"RLTS Help Desk"});
}

function emailAssign() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var row = sheet.getActiveRange().getRowIndex();
  var userEmail = sheet.getRange(row, getColIndexByName("RLTS helper")).getValue();
  var subject = "RLTS Ticket #" + row + " " + sheet.getRange(row, getColIndexByName("Subject")).getValue();
  var body = "Congratulations!  You've been assigned a ticket!\n\nSTATUS: " + sheet.getRange(row, getColIndexByName("Status")).getValue();
  body += "\nREQUESTER: " + sheet.getRange(row, getColIndexByName("Contact email")).getValue();
  body += "\nURGENCY: " + sheet.getRange(row, getColIndexByName("Urgency")).getValue();
  body += "\n\nDESCRIPTION: " + sheet.getRange(row, getColIndexByName("Description")).getValue();
  body += "\n\nNOTES: " + sheet.getRange(row, getColIndexByName("Notes")).getValue();
  body += "\n\nRESOLUTION: " + sheet.getRange(row, getColIndexByName("Resolution")).getValue();
  body += "\n\n=====================\n\n[PLEASE DO NOT RESPOND DIRECTLY TO THIS EMAIL]";
  MailApp.sendEmail(userEmail, subject, body, {name:"RLTS Help Desk"});
}


function onOpen() {
  var subMenus = [{name:"Send Status Email", functionName: "emailStatusUpdates"},
            {name:"Assign Ticket", functionName: "emailAssign"},
            {name:"Schedule Appointment", functionName: "scheduleAppointment"},
            {name:"Push to KB", functionName: "pushToKb"}];
  SpreadsheetApp.getActiveSpreadsheet().addMenu("Help Desk Menu", subMenus);
}​




function pushToKb() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var row = sheet.getActiveRange().getRowIndex();
  var site = SitesApp.getSite("site", "rltshelpdesk");
  var kbPage = site.getChildByName("kb");
  var values = [sheet.getRange(row, getColIndexByName("Subject")).getValue(),
                sheet.getRange(row, getColIndexByName("Description")).getValue(),
                sheet.getRange(row, getColIndexByName("Notes")).getValue(),
                sheet.getRange(row, getColIndexByName("Resolution")).getValue(),
                sheet.getRange(row, getColIndexByName("Category")).getValue()];
  kbPage.addListItem(values);
}
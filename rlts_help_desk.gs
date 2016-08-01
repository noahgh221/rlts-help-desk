//auto send email with ticket metadata to selected email addressses in toNotify variable
function emailNotificationWithTicketMetadata() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var row = sheet.getActiveRange().getRowIndex();
  var toNotify = 'email1@email.edu, email2@email.edu';
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
                    "\n\nView Tickets: https://docs.google.com/spreadsheets/d/1MkMNzyX-2keiAJXBfYrb0YmP2pdhSCzrEQj7q6o3Gj8/edit?usp=sharing",
                   {name:"RLTS Help Desk"});
}

//find columns by column header name
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

//send status update email when choosing "send status update" from drop-down
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
  body += "\n\nSubmit a new request at: https://docs.google.com/spreadsheet/viewform?formkey=dE1yLTlySk9jbmFwcWFZcGE4LUw1Wnc6MA";
  
  MailApp.sendEmail(userEmail, subject, body, {name:"RLTS Help Desk"});
}

//send email when choosing "assign ticket" from drop-down
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

//creates custom drop-down menu
function onOpen() {
  var subMenus = [{name:"Send Status Email", functionName: "emailStatusUpdates"},
            {name:"Assign Ticket", functionName: "emailAssign"}];
  SpreadsheetApp.getActiveSpreadsheet().addMenu("Help Desk Menu", subMenus);
}

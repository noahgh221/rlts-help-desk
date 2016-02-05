# rlts-help-desk
A Google Script for creating a simple help desk / ticket system using Google Sheets with a linked Google Form.

This RLTS Help Desk is a ticketing system currently used by [Rubenstein Library] (http://library.duke.edu/rubenstein/) Technical Services to collect and manage tickets submitted by other Rubenstein Library staff. Tickets typically include change requests for catalog records and [finding aids] (library.duke.edu/rubenstein/findingaids/), requests for additional processing or conservation work, or requests for information about the availability or location of materials. Most tickets are the result of reference interactions that require some assistance from Technical Services. 

The ticket systems allows the Rubenstein Library Technical Services department to collect, manage, and respond to tickets in a systematic way and it also allows tracking of ticket statistics for quantifying effort.

The system is powered by a custom Google Script, heavily modified from samples in this [tutorial] (https://developers.google.com/apps-script/articles/helpdesk_tutorial?hl=en)

##Features of the ticket system:
- Ticket submission using an simple, customizable, online Google Form

- Automated confirmation emails sent to ticket submitters including ticket metadata and a ticket number

- Form submission triggers automated emails to select TS staff (can subscribe/unsubscribe to notifications)

- Ticket metadata is collected and managed in a linked Google Sheet with the following columns (fields): Timestamp, Subject, Urgency, Contact email (submitters email), Description, RLTS helper (ticket responder), Notes, Resolution, TimeSpent_hours, Category (type of ticket)

- A customized drop-down menu in the Google Sheet provides options to:
  - assign a ticket (send email) to a ticket responder including ticket info
  - send a status email to a ticket submitters with updates on ticket status
  - push ticket metadata to a linked knowledgebase (this feature is currently not in use)

![Screenshot of custom drop-down](/ticket_screenshot.png "Screenshot of custom drop-down menu")

- A 'Stats' tab of the Google Sheet tracks the following statistics:
  -  Total time spent responding to tickets (in hours)
  -  Status breakdown (# of tickets in each category: new, resolved, in-progress, etc.)
  -  Category breakdown (# of tickets by category: catalog edit, finding aid edit, info request, reprocessing request, etc.)
  -  Urgency breakdown (high, medium, low)
  -  Resolver stats (# of tickets resolved by each TS staff member)
  -  Submitter stats (# of tickets submitted by each RS staff member)


##Getting Started

1. Get sample sheet with linked form and Google Script [here] (https://docs.google.com/spreadsheets/d/1VvtLo2sFZCVEzK8j_ib8bFWuW3C0oPiTc-hPQaJEXDA/edit?usp=sharing)
2. Copy the sheet, linked form, and Google script to your own Google account (File>Copy)
3. Customize the script to alter text of automated emails or change notificdation behaviors. Customize the statistics tab as needed. Customize the Google sheet drop-down values to track your own categories or update conditional formatting to highlight cells or rows based on values. Note that the Google script references column header values, so changing column headers in the Google Sheet without changing references to them in the script will break some functionality.





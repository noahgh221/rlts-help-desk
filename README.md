# rlts-help-desk
A Google Script for creating a simple help desk / ticket system using Google Sheets with a linked Google Form.

This ticket system is currently used by Rubenstein Library Technical Services to collect and manage tickets submitted by Rubenstein Library Research Services staff.  Tickets typically include change requests for catalog records and finding aids or requests for information about the availability or location of materials. Most tickets are the result of reference interactions that require some assistance from Technical Services.  The ticket systems allows TS to collect, manage, and respond to tickets in a systematic way and it also allows tracking of ticket statistics for quantifying effort.

##Features of the ticket system include:
- Ticket submission using an online, simple, customizable Google Form

- Automated confirmation emails sent to ticket submitters including ticket metadata and a ticket number

- Form submission triggers automated emails to select TS staff (can subscribe/unsubscribe to notifications)

- Ticket metadata is collected and managed in a linked Google Sheet with the following columns (fields): Timestamp, Subject, Urgency, Contact email (submitters email), Description, RLTS helper (ticket responder), Notes, Resolution, TimeSpent_hours, Category (type of ticket)

- A customized drop-down menu in the Google Sheet can trigger the following actions
  - assign a ticket (send email) to a ticket responder including ticket info
  - send a status email to a ticket submitters including ticket info and status
  - push ticket metadata to a linked knowledgebase (this feature is currently not in use)

- A Stats tab of the Google Sheet tracks the following statistics:
  -  Total time spend responding to tickets (in hours)
  -  Status breakdown (# of tickets in each category: new, resolved, in-progress, etc.)
  -  Category breakdown (# of tickets by category: catalog edit, finding aid edit, info request, reprocessing request, etc.)
  -  Urgency breakdown (high, medium, low)
  -  Resolver stats (# of tickets resolved by each TS staff member)
  -  Submitter stats (# of tickets submitted by each RS staff member)


##Scripts heavily modified from samples in this tutorial: https://developers.google.com/apps-script/articles/helpdesk_tutorial?hl=en

##More documentation coming soon.....

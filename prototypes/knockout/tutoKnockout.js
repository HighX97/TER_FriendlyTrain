console.log("Coucou Chahinaz");
function WebmailViewModel() {
    // Data
    var self = this;
    self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
    self.chosenFolderId = ko.observable();
      self.chosenFolderData = ko.observable();
          self.chosenMailData = ko.observable();


    // Behaviours
    self.goToFolder = function(folder) { self.chosenFolderId(folder); };
};
self.goToMail = function(mail) {
    self.chosenFolderId(mail.folder);
    self.chosenFolderData(null); // Stop showing a folder
    $.get("/mail", { mailId: mail.id }, self.chosenMailData);
};
self.goToFolder = function(folder) {
    self.chosenFolderId(folder);
    $.get('/mail', { folder: folder }, self.chosenFolderData);
        self.chosenMailData(null); // Stop showing a mail
};
function WebmailViewModel() {
    // ... leave everything else unchanged ...

    // Show inbox by default
    self.goToFolder('Inbox');
};

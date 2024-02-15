// file-management.js
'use strict';
const { ipcMain, dialog } = require('electron');
const { showOpenDialogToSelectJsonFile, showSaveDialogToSaveJsonFile } = require('./dialogs/message-dialog');

const {
  IPC_EVENT_OPEN_FILE_DIALOG_JSON,
  IPC_EVENT_OPEN_FILE_DIALOG_JSON_FILE_PATH,
  IPC_EVENT_OPEN_SAVE_FILE_DIALOG_JSON,
  IPC_EVENT_OPEN_SAVE_FILE_DIALOG_JSON_FILE_PATH,
  IPC_EVENT_OPEN_MESSAGE_BOX
} = require('./constants/ipc-event-constants');

module.exports = function fileManagement(
  browserWindow,
  electronDialog = dialog,
  electronIpcMain = ipcMain
) {
  electronIpcMain.on(IPC_EVENT_OPEN_FILE_DIALOG_JSON, async event => {
    try {
      const result = await showOpenDialogToSelectJsonFile(browserWindow, electronDialog);
      if (result.filePaths && result.filePaths.length > 0) {
        event.reply(IPC_EVENT_OPEN_FILE_DIALOG_JSON_FILE_PATH, { filePath: result.filePaths[0] });
      }
    } catch (e) {
      // Handle errors appropriately
    }
  });

  electronIpcMain.on(IPC_EVENT_OPEN_SAVE_FILE_DIALOG_JSON, async event => {
    try {
      const result = await showSaveDialogToSaveJsonFile(browserWindow, electronDialog);
      if (result.filePath) {
        event.reply(IPC_EVENT_OPEN_SAVE_FILE_DIALOG_JSON_FILE_PATH, { filePath: result.filePath });
      }
    } catch (e) {
      // Handle errors appropriately
    }
  });

  electronIpcMain.on(IPC_EVENT_OPEN_MESSAGE_BOX, async (event, data) => {
    try {
      const buttons = ['Ok'];
      await electronDialog.showMessageBox(browserWindow, {
        type: data.messageType,
        buttons,
        message: data.message
      });
    } catch (e) {
      // Handle errors appropriately
    }
  });
};



// 'use strict';
// const { ipcMain, dialog } = require('electron');
// const messageDialog = require('./dialogs/message-dialog');

// const {
//   IPC_EVENT_OPEN_FILE_DIALOG_JSON,
//   IPC_EVENT_OPEN_FILE_DIALOG_JSON_FILE_PATH,
//   IPC_EVENT_OPEN_SAVE_FILE_DIALOG_JSON,
//   IPC_EVENT_OPEN_SAVE_FILE_DIALOG_JSON_FILE_PATH,
//   IPC_EVENT_OPEN_MESSAGE_BOX
// } = require('./constants/ipc-event-constants');

// module.exports = function fileManagement(
//   browserWindow,
//   electronDialog = dialog,
//   electronIpcMain = ipcMain
// ) {
//   const msgDialog = messageDialog(browserWindow, electronDialog);

//   electronIpcMain.on(IPC_EVENT_OPEN_FILE_DIALOG_JSON, async event => {
//     try {
//       const result = await msgDialog.showOpenDialogToSelectJsonFile();
//       if (result.filePath) {
//         event.reply(IPC_EVENT_OPEN_FILE_DIALOG_JSON_FILE_PATH, { filePath: result.filePath });
//       }
//     } catch (e) {
//       await msgDialog.showErrorDialog(e);
//     }
//   });

//   electronIpcMain.on(IPC_EVENT_OPEN_SAVE_FILE_DIALOG_JSON, async event => {
//     try {
//       const result = await msgDialog.showSaveDialogToSaveJsonFile();
//       if (result.filePath) {
//         event.reply(IPC_EVENT_OPEN_SAVE_FILE_DIALOG_JSON_FILE_PATH, { filePath: result.filePath });
//       }
//     } catch (e) {
//       await msgDialog.showErrorDialog(e);
//     }
//   });

//   electronIpcMain.on(IPC_EVENT_OPEN_MESSAGE_BOX, async (event, data) => {
//     try {
//       const buttons = ['Ok'];
//       await msgDialog.showMessageBox({
//         type: data.messageType,
//         buttons,
//         message: data.message
//       });
//     } catch (e) {
//       await msgDialog.showErrorDialog(e);
//     }
//   });
// };

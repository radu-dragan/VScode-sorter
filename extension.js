const vscode = require("vscode");

function activate(context) {
  console.log("function was init >> debug terminal");

  let disposable = vscode.commands.registerCommand(
    "sorter.dev",
    function () {
      const editor = vscode.window.activeTextEditor;
      const selection = editor.selection;
      function getEditorText() {
        return editor.document.getText(editor.selection).split("\r\n");
      }

      function sortLines(arrayLines) {
        arrayLines = arrayLines.filter(function (e) {
          return e;
        });
        return arrayLines.sort();
      }

      function rebuildToString(arrayLines) {
        return arrayLines.join("\r\n");
      }

      function addTextToDom(newText) {
        editor.edit((builder) => builder.replace(selection, newText));
      }

      let text = undefined;
      text = getEditorText();
      text = sortLines(text);
      text = rebuildToString(text);
      console.log(text);

      addTextToDom(text);

      vscode.window.showInformationMessage("Hello World from sorter!");
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};

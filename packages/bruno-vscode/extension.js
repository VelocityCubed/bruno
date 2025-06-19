const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

function getWebviewContent(panel, extensionPath) {
  const indexPath = path.join(extensionPath, 'webapp', 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');

  html = html.replace(/(src|href)="(\.\/)?(.*?)"/g, (match, attr, prefix, file) => {
    const resourcePath = vscode.Uri.file(path.join(extensionPath, 'webapp', file));
    return `${attr}="${panel.webview.asWebviewUri(resourcePath)}"`;
  });

  return html;
}

function activate(context) {
  let disposable = vscode.commands.registerCommand('bruno.open', function () {
    const panel = vscode.window.createWebviewPanel(
      'bruno',
      'Bruno',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'webapp'))]
      }
    );

    panel.webview.html = getWebviewContent(panel, context.extensionPath);
  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;

# Bruno VS Code Extension

This extension hosts the Bruno API client inside Visual Studio Code. Run the `Open Bruno` command to open the client in a tab.

The web assets are pulled from the `bruno-app` package. Build them before packaging the extension:

```bash
npm run build --workspace=packages/bruno-app
npm run build --workspace=packages/bruno-vscode
```

import { commands, window } from "vscode";
import { LanguageClient } from "vscode-languageclient/node";

let client; // : LanguageClient | undefined;

async function startLanguageClient(context) {
	try {
    const serverOptions = {
			command: "daicker",
      args: ["serve"],
    };
		const clientOptions = {
			documentSelector: [
				{
					scheme: "file",
					language: "daicker",
				},
			],
		};
		client = new LanguageClient("Daicker Language Server", serverOptions, clientOptions);
		await client.start();
	} catch (e) {
		window.showErrorMessage("Failed to start DLS (Daicker Language Server).");
		window.showErrorMessage(`${e}`);
	}
}

async function restartLanguageClient() {
	try {
		if (client === undefined) {
			throw new Error();
		}
		await client.restart();
	} catch (e) {
		window.showErrorMessage("Failed to restart PLS (Daicker Language Server).");
		window.showErrorMessage(`${e}`);
	}
}

export async function activate(context) {
	context.subscriptions.push(
		commands.registerCommand("daicker.restartLanguageServer", () => restartLanguageClient())
	);
	await startLanguageClient(context);
}

export function deactivate() {
	if (client) {
		return client.stop();
	}
}

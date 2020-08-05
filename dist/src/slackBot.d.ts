import { Page, Browser } from 'puppeteer';
export default class SlackBot {
    workspace: string;
    email: string;
    password: string;
    channel: string;
    message: string;
    browser: Browser;
    page: Page;
    constructor(workspace: string, email: string, password: string, channel: string, message: string);
    chooseWorkspace(): Promise<void>;
    signInToWorkspace(): Promise<void>;
    browseChannels(): Promise<void>;
    sendMessage(): Promise<void>;
    run(): Promise<void>;
}

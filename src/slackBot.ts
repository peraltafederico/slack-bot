import { Page, Browser } from 'puppeteer'
import * as puppeteer from 'puppeteer'
import { logger } from './config/logger'

export default class SlackBot {
  workspace: string

  email: string

  password: string

  channel: string

  message: string

  browser: Browser

  page: Page

  constructor(
    workspace: string,
    email: string,
    password: string,
    channel: string,
    message: string
  ) {
    this.workspace = workspace
    this.email = email
    this.password = password
    this.channel = channel
    this.message = message
  }

  async chooseWorkspace(): Promise<void> {
    try {
      logger.info('waiting for https://slack.com/signin')

      await this.page.goto('https://slack.com/signin', {
        waitUntil: 'networkidle2',
      })

      logger.info('typing workspace')

      await this.page.type('#domain', this.workspace)

      logger.info('clicking "Continue" button')

      await this.page.click('button[data-qa="submit_team_domain_button"]')

      logger.info('waiting for workspace page')

      await this.page.waitForNavigation()

      logger.info(`now I am in ${this.page.url()}`)
    } catch (error) {
      logger.error('there was an error trying to access to workspace page')

      throw error
    }
  }

  async signInToWorkspace(): Promise<void> {
    try {
      logger.info('typing email')

      await this.page.type('#email', this.email)

      logger.info('typing password')

      await this.page.type('#password', this.password)

      logger.info('clicking "Sign in" button')

      await this.page.click('button[data-qa="signin_button"]')

      logger.info('waiting for app page')

      await this.page.waitForNavigation()

      logger.info(`now I am in ${this.page.url()}`)
    } catch (error) {
      logger.error(`there was an error trying to sign in to ${this.workspace}`)

      throw error
    }
  }

  async browseChannels(): Promise<void> {
    try {
      logger.info(`clicking in sidebar the channel ${this.channel}`)

      await this.page.click(
        `span[data-qa="channel_sidebar_name_${this.channel}"]`
      )

      logger.info(`now I am in ${this.page.url()}`)
    } catch (error) {
      logger.error(`there was an error trying to access to ${this.channel}`)

      throw error
    }
  }

  async sendMessage(): Promise<void> {
    try {
      logger.info(`writting message in ${this.channel}`)

      await this.page.type(`.ql-editor`, this.message)

      logger.info(`sending message`)

      await this.page.keyboard.press('Enter')

      logger.info(`message: "${this.message}" has been sent (:`)
    } catch (error) {
      logger.error(
        `there was an error trying to sending the message to ${this.channel}`
      )

      throw error
    }
  }

  async run(): Promise<void> {
    this.browser = await puppeteer.launch()
    this.page = await this.browser.newPage()

    await this.chooseWorkspace()

    await this.signInToWorkspace()

    await this.browseChannels()

    await this.sendMessage()

    // TODO: Look for the sent message

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve()
      }, 5000)
    )

    logger.info(`closing page`)

    await this.page.close()

    logger.info(`closing browser`)

    await this.browser.close()

    logger.info(`bye!`)
  }
}

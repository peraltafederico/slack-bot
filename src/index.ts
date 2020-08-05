import { config } from 'dotenv'
import { CronJob } from 'cron'
import SlackBot from './slackBot'
import { logger } from './config/logger'

config()

const {
    ADMIN: admin,
    SLACK_EMAIL: email,
    SLACK_PASSWORD: password,
    SLACK_CHANNEL: channel,
    SLACK_WORKSPACE: workspace,
    MESSAGE_TO_SEND: message,
    CRON_TIME: cronTime,
    UTC: utc,
} = process.env

const bot = new SlackBot(workspace, email, password, channel, message)

function cb() {
    try {
        logger.info(`hello ${admin}, let's do it!`)

        bot.run()
    } catch (error) {
        logger.error(`there was an error in the process :(`)

        logger.error(error)
    }
}

const job = new CronJob(cronTime, cb, null, null, null, null, null, utc)

bot.run()

import { transports, createLogger } from 'winston'
import { format } from 'winston'
import moment from 'moment'

const { combine, timestamp, colorize, json } = format

export const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: () => moment().utcOffset('-0300').format('YYYY-MM-DD HH:mm:ss'),
    }),
    json(),
    colorize({
      all: true,
      colors: {
        info: 'green',
        error: 'red',
        warn: 'yellow',
      },
    })
  ),
  transports: [new transports.Console()],
})

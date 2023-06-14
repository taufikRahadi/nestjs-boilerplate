import { Injectable } from '@nestjs/common'
import { en } from './languages'

export class MessageFactory {
  static language = process.env.APP_LANGUAGE ?? 'en'

  static messages = {
    en,
  }

  /**
   *
   * @param query example: "general.success-read-data"
   */
  static getSuccessMessage(query: string) {
    const [partOf, name] = query.split('.')

    const msgLang =
      this.messages[this.language]['successResponse'][partOf][name]

    return msgLang
  }

  static getErrorMessage(query: string) {
    const [partOf, name] = query.split('.')

    const msgLang = this.messages[this.language]['errorResponse'][partOf][name]

    return msgLang
  }
}

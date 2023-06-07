import { Cheerio, CheerioAPI, Element } from 'cheerio'

const ERROR_KEYS = ['Exception:', 'Traceback', 'Error:']

export const hasErrorOnOutput = (output: string): boolean => {
  return ERROR_KEYS.some((key) => output.includes(key))
}

export const getOutputs = (elm: Cheerio<Element>): Cheerio<Element> => {
  return (
    elm
      .find('div .collapse')
      // output は collapse class の collapse_output{n}_{n} で定義
      .filter((_, collapse) => collapse.attribs['id']?.startsWith('collapse_output'))
  )
}

export const getActivities = ($: CheerioAPI): Cheerio<Element> => {
  return $('div .panel')
}

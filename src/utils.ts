/*
 * @Author: Whzcorcd
 * @Date: 2021-02-22 14:10:58
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-02-22 17:50:27
 * @Description: file content
 */
import { cosmiconfigSync } from 'cosmiconfig'
import { RUN_SERVER, moduleName } from './config'

export const loadConfig = () => {
  const explorerSync = cosmiconfigSync(moduleName, {
    searchPlaces: [
      `.${moduleName}rc`,
      `.${moduleName}rc.json`,
      `.${moduleName}rc.yaml`,
      `.${moduleName}rc.yml`,
      `.${moduleName}rc.js`,
      `.${moduleName}rc.cjs`,
      `${moduleName}.config.js`,
      `${moduleName}.config.cjs`,
    ],
  })

  try {
    const result = explorerSync.search()
    console.log('result', result)

    if (result && result.config[RUN_SERVER]) {
      return result.config[RUN_SERVER]
    }
    throw new Error(`No Private config found for: ${RUN_SERVER}`)
  } catch (error) {
    throw error
  }
}

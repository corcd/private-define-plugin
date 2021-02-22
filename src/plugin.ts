/*
 * @Author: Whzcorcd
 * @Date: 2021-02-22 11:02:24
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-02-22 17:28:16
 * @Description: file content
 */
import { DefinePlugin } from 'webpack'
import lodash from 'lodash'
import { loadConfig } from './utils'
import { globalKey } from './config'

const deepJsonStringify = (definitions: any) => {
  return lodash.each(definitions, (val: any, key: string) => {
    definitions[key] = lodash.isString(val)
      ? JSON.stringify(val)
      : deepJsonStringify(definitions[key])
  })
}

export class PrivateDefinePlugin extends DefinePlugin {
  constructor() {
    const clonedDefinitions = lodash.cloneDeep(loadConfig())
    super(deepJsonStringify({ [globalKey]: clonedDefinitions }))
  }
}

export default PrivateDefinePlugin

import { Signatory } from '@cakioe/kit.js'

const appid = __APPID__
const version = __VERSION__
const isDev = process.env.NODE_ENV === 'development'

const signer = new Signatory(appid)

export { appid, isDev, signer, version }

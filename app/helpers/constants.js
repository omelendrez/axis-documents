const CERT_TYPE = {
  STANDARD: 1,
  NIMASA: 2,
  FORKLIFT: 3,
  OPITO: 4
}

const OPITO_HUB_URL =
  'https://www.thehubopito.com/public/validate?Surname={surname}&CertificationDate={date}&Ref={certificate}'

const ZIP_EXTENSION = 'gz'

const SLEEP_TIMEOUT = 500

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

module.exports = {
  CERT_TYPE,
  OPITO_HUB_URL,
  ZIP_EXTENSION,
  sleep,
  SLEEP_TIMEOUT
}

/* eslint-disable require-jsdoc */
import { defineConfig } from 'cypress'
import { setBaseUrl, nodeSsh } from './util/config'
import { publishAndWaitForRabbit } from '@juno/medtronic-web-application-testing-framework'
import getCompareSnapshotsPlugin from 'cypress-image-diff-js/dist/plugin'
import fs from 'fs'

const viewportwidth = 3840
const viewportheight = 2160

export default defineConfig({
  viewportWidth: viewportwidth,
  viewportHeight: viewportheight,
  screenshotOnRunFailure: true,
  projectId: 'qujzzt',
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      getCompareSnapshotsPlugin(on, config)
      on('task', {
        ssh({ cmd }) {
          return nodeSsh({ cmd, config })
        },

        checkForFileExistence(filename) {
          if (fs.existsSync(filename)) {
            throw new Error(
              `You have an existing baseline image at location ${filename}. Existing baseline images must be manually deleted before creating new baseline images`
            )
          }
          return null
        },

        publishAndWaitForRabbit({ publishKey, publishContent, waitKey }) {
          return publishAndWaitForRabbit({
            publishKey,
            publishContent,
            waitKey
          })
        }
      })
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args = launchOptions.args.filter(
            (arg) => arg !== '--disable-gpu'
          )
          // TODO: uncomment when Viz is faster and waits are not needed to allow the images to load
          // launchOptions.args.push('--enable-unsafe-webgpu')
          launchOptions.args.push(
            '--enable-features=Vulkan,SharedArrayBuffer',
            `--window-size=${viewportwidth},${viewportheight}`,
            '--force-device-scale-factor=1'
          )
        }

        if (browser.name === 'electron') {
          launchOptions.preferences.width = viewportwidth
          launchOptions.preferences.height = viewportheight
        }

        return launchOptions
      })

      config = setBaseUrl(config)

      const languageDict = {}
      config.env.languageSet.forEach((lang) => {
        const words = require('./cypress/fixtures/data/language/' +
          lang +
          '.json')
        languageDict[lang] = words
      })
      config.env.allLanguages = languageDict

      return config
    },
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}'
  }
})

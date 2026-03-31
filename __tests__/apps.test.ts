import { expect, test, describe } from "bun:test";
import { appInfoSchema, dynamicComposeSchemaYaml } from '@runtipi/common/schemas'
import { fromError } from 'zod-validation-error';
import fs from 'node:fs'
import path from 'node:path'
import { type } from "arktype";
import { parse as parseYaml } from 'yaml';

const getApps = async () => {
  const appsDir = await fs.promises.readdir(path.join(process.cwd(), 'apps'))

  const appDirs = appsDir.filter((app) => {
    const stat = fs.statSync(path.join(process.cwd(), 'apps', app))
    return stat.isDirectory()
  })

  return appDirs
};

const getFile = async (app: string, file: string) => {
  const filePath = path.join(process.cwd(), 'apps', app, file)
  try {
    const file = await fs.promises.readFile(filePath, 'utf-8')
    return file
  } catch (err) {
    return null
  }
}

describe("each app should have the required files", async () => {
  const apps = await getApps()

  for (const app of apps) {
    const files = ['config.json', 'docker-compose.yml', 'metadata/logo.jpg', 'metadata/description.md']

    for (const file of files) {
      test(`app ${app} should have ${file}`, async () => {
        const fileContent = await getFile(app, file)
        expect(fileContent).not.toBeNull()
      })
    }
  }
})

describe("each app should have a valid config.json", async () => {
  const apps = await getApps()

  for (const app of apps) {
    test(`app ${app} should have a valid config.json`, async () => {
      const fileContent = await getFile(app, 'config.json')
      const parsed = appInfoSchema.omit('urn')(JSON.parse(fileContent || '{}'))

      if (parsed instanceof type.errors) {
        const validationError = fromError(parsed);
        console.error(`Error parsing config.json for app ${app}:`, validationError.toString());
      }

      expect(parsed instanceof type.errors).toBe(false)
    })
  }
})

describe("each app should have a valid docker-compose.yml", async () => {
  const apps = await getApps()

  for (const app of apps) {
    test(`app ${app} should have a valid docker-compose.yml`, async () => {
      const fileContent = await getFile(app, 'docker-compose.yml')
      const parsed = dynamicComposeSchemaYaml(parseYaml(fileContent || '{}'))

      if (parsed instanceof type.errors) {
        const validationError = fromError(parsed);
        console.error(`Error parsing docker-compose.yml for app ${app}:`, validationError.toString());
      }

      expect(parsed instanceof type.errors).toBe(false)
    })
  }
});

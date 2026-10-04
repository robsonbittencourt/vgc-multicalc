import fs from "fs"
import os from "os"
import path from "path"

export async function downloadSmogonFiles(date, regulation) {
  console.log(`⏳ [downloadSmogonFiles] Downloading Smogon stats for ${date} / ${regulation.toUpperCase()}...`)

  const year = date.substring(0, date.indexOf("-"))
  const format = `gen9championsvgc${year}reg${regulation.toLowerCase()}bo3`
  const baseUrl = `https://www.smogon.com/stats/${date}`
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "smogon-data-"))

  const files = {
    directory,
    usage: await download(`${baseUrl}/${format}-1760.txt`, path.join(directory, "usage.txt")),
    moveset: await download(`${baseUrl}/moveset/${format}-1760.txt`, path.join(directory, "moveset.txt")),
    chaos: await download(`${baseUrl}/chaos/${format}-0.json`, path.join(directory, "chaos.json"))
  }

  console.log(`✅ [downloadSmogonFiles] Files saved in '${directory}'`)

  return files
}

async function download(url, filePath) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to download '${url}': ${response.status} ${response.statusText}`)
  }

  fs.writeFileSync(filePath, await response.text())

  return filePath
}

export function readSmogonFile(filePath) {
  return fs.readFileSync(filePath, "utf8")
}

export function deleteSmogonFiles(files) {
  fs.rmSync(files.directory, { recursive: true, force: true })

  console.log(`🧹 [deleteSmogonFiles] '${files.directory}' removed`)
}

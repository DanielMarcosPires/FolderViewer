import { readdir } from "fs/promises"
import { join } from "path"

export class readFolder {
    async ReadFolder(path = "./System") {
        try {
            const folders = await readdir(path, { withFileTypes: true })

            console.log("Folder's System found!")
            return folders.map(dirent => ({
                name: dirent.name,
                path: join(path, dirent.name),
                isDirectory: dirent.isDirectory(),
            }))
        } catch (error) {
            console.error(error)
            return []
        }
    }

    async cascadeReadingFolder(folderDataPromise) {
        try {
            const folderData = await folderDataPromise
            const result = []

            for (const item of folderData) {
                if (item.isDirectory) {
                    const subfolders = await readdir(item.path, { withFileTypes: true })
                    const children = subfolders.map(dirent => ({
                        name: dirent.name,
                        path: join(item.path, dirent.name),
                        isDirectory: dirent.isDirectory(),
                    }))
                    item.children = await this.cascadeReadingFolder(Promise.resolve(children))
                }
                result.push(item)
            }

            return result
        } catch (error) {
            console.error(error)
            return []
        }
    }
}

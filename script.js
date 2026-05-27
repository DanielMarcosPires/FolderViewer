import { existsSync, mkdirSync } from 'fs';
import {readFolder} from './read_folder.js'

class genFolderSystem {
    defaultFolderName = "System";
    constructor(folderName = this.defaultFolderName) {
        let currentPath = `./${folderName}`

        if (!existsSync(currentPath)) {
            mkdirSync(currentPath);
            console.log(`${currentPath} has been created`)
        }
    }

    genFolder({ folderName = "File", path = "" }) {
        let finalPath = path || `./${this.defaultFolderName}/${folderName}`

        if (folderName !== "File" && finalPath !== `./${this.defaultFolderName}/${folderName}`){
           finalPath = path+`/${folderName}`
        }

        try {
            if (!existsSync(finalPath)) {
                mkdirSync(finalPath, { recursive: true })
                console.log(`${finalPath} has been created!`)
            }

            return {
                folderName,
                finalPath
            }
        } catch (error) {
            console.log(error)
        }

    }
}

const gen = new genFolderSystem()
const reading = new readFolder()
const folderData = reading.ReadFolder()
reading.cascadeReadingFolder(folderData).then(data => console.log(JSON.stringify(data, null, 2)))

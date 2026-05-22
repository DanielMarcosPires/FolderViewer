import { existsSync, mkdirSync } from 'fs';

class genFolderSystem {
    defaultFolderName = "System";
    constructor(folderName = this.defaultFolderName) {
        let currentPath = `./${folderName}`

        if (!existsSync(currentPath)) {
            mkdirSync(currentPath);
            console.log(`${currentPath} has been created`)
        }
    }

    genFolder({ folderName = "File", path = null }) {
        const finalPath = path || `./${this.defaultFolderName}/${folderName}`

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



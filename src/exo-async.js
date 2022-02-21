import fs from "fs/promises";

/**
 * Fonction qui parcours un dossier
 * @param {string} path chemin du dossier à parcourir
 */
export async function browseFolder(path) {

    let folderContent = await fs.readdir(path);

    for(let item of folderContent) {
        let itemStats = await fs.stat(path+'/'+item);
        if(itemStats.isFile()) {
            let content = await fs.readFile(path+'/'+item, 'utf-8')
            console.log(content);
        }
    }
}

// import fs from 'fs';

// export function browseFolder(path) {

//     fs.readdir(path, (err, folderContent) => {
        
//         for(let item of folderContent) {
//             fs.stat(path+'/'+item, (err, itemStats) => {

//                 if(itemStats.isFile()) {
//                     fs.readFile(path+'/'+item, 'utf-8', (err, content) => {

//                         console.log(content);
//                     })
//                 }
//             });
//         }
//     });

// }
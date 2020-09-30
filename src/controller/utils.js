/**
 * @description utils controller
 * @author Young
 */

const path = require('path')
const fse = require('fs-extra')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')

// 头像文件最大不超过2m
const MAX_SIZE = 2 * 1024 * 1024 * 1024
// 挪动图片的路径
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')

// 判断是否要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})

/**
 * 保存文件
 * @param {String} name // 文件名
 * @param {String} type // 文件类型
 * @param {Number} size // 文件体积
 * @param {String} FilepPath // 文件路径
 */
async function saveFile ({ name, type, size, FilepPath }) {
    if (size > MAX_SIZE) {
        // 文件过大，删掉 -> 返回错误信息
        await fse.remove(FilePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }
    // 成功 -> 移动文件
    const fileName = `${Date.now()}-${name}` // 防止重名
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
    await fse.move(FilepPath, distFilePath)

    return new SuccessModel({
        url: `/${fileName}`
    })
}
module.exports = {
    saveFile
}
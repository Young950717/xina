/**
 * @description 失败信息集合，包括 errNum 和 msg
 * @author Young
 */

module.exports = {
    // 用户名已存在
    registerUserNameExistInfo: {
        errNum: 10001,
        msg: '用户名已存在'
    },
    // 注册失败
    registerFailInfo: {
        errNum: 10002,
        msg: '注册失败，请重试'
    },
    // 用户名不存在
    registerUserNameNotExistInfo: {
        errNum: 10003,
        msg: '用户名未存在'
    },
    // 登录失败
    loginFailInfo: {
        errNum: 10004,
        msg: '登录失败，用户名或密码错误'
    },
    // 未登录
    loginCheckFailInfo: {
        errNum: 10005,
        msg: '您尚未登录'
    },
    // 修改密码失败
    changePasswordFailInfo: {
        errNum: 10006,
        msg: '修改密码失败，请重试'
    },
    // 上传文件过大
    uploadFileSizeFailInfo: {
        errNum: 10007,
        msg: '上传文件尺寸过大'
    },
    // 修改基本信息失败
    changeInfoFailInfo: {
        errNum: 10008,
        msg: '修改基本信息失败'
    },
    // json schema 校验失败
    jsonSchemaFileInfo: {
        errNum: 10009,
        msg: '数据格式校验错误'
    },
    // 删除用户失败
    deleteUserFailInfo: {
        errNum: 10010,
        msg: '删除用户失败'
    },
    // 添加关注失败
    addFollowerFailInfo: {
        errNum: 10011,
        msg: '添加关注失败'
    },
    // 取消关注失败
    deleteFollowerFailInfo: {
        errNum: 10012,
        msg: '取消关注失败'
    },
    // 创建微博失败
    createBlogFailInfo: {
        errNum: 11001,
        msg: '创建微博失败，请重试'
    },
    // 删除微博失败
    deleteBlogFailInfo: {
        errNum: 11002,
        msg: '删除微博失败，请重试'
    }
}
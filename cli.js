#!/usr/bin/env node

// Node CLI 应用入口文件必须要有这样的文件头
// 如果是linux或者Mac os 系统下还需要修改此文件读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

// 脚手架的工作过程
// 1.通过命令行交互询问用户问题
// 2.根据用户回答的结果生成文件

const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Project name?'
    }
]).then(answers => {
    // 生成文件

    // 模板目录
    const tmplDir = path.join(__dirname, 'templates')
    // 目标目录
    const destDir = process.cwd()
    copyDir(tmplDir, destDir,() => {
        console.log("全部复制完成")
    })
    return
    // 将模板下文件输出到目标目录
    fs.readdir(tmplDir, (err, files) => {
        console.log(files)
        if (err) throw err
        files.forEach(file => {
            // 通过模板引擎渲染文件
            ejs.renderFile(path.join(tmplDir, file), answers, (e, result) => {
                if (e) throw e
                // 将结果写入目标路径
                fs.writeFileSync(path.join(destDir, file), result)
            })
        })
    })
})

// 复制文件
function copyFile(srcPath, tarPath, cb) {
    var rs = fs.createReadStream(srcPath)
    rs.on('error', function (err) {
        if (err) {
            console.log('read error', srcPath)
        }
        cb && cb(err)
    })
 
    var ws = fs.createWriteStream(tarPath)
    ws.on('error', function (err) {
        if (err) {
            console.log('write error', tarPath)
        }
        cb && cb(err)
    })
 
    ws.on('close', function (ex) {
        cb && cb(ex)
    })
 
    rs.pipe(ws)
    console.log("复制文件完成", srcPath)
}

// 复制文件夹所有
function copyDir(srcDir, tarDir, cb) {
    if (fs.existsSync(tarDir)) {
        fs.readdir(srcDir, function (err, files) {
            var count = 0
            var checkEnd = function () {
                console.log("进度", count)
                ++count == files.length && cb && cb()
            }

            if (err) {
                checkEnd()
                return
            }

            files.forEach(function (file) {
                var srcPath = path.join(srcDir, file)
                var tarPath = path.join(tarDir, file)

                fs.stat(srcPath, function (err, stats) {
                    if (stats.isDirectory()) {
                        fs.mkdir(tarPath, function (err) {
                            if (err) {
                                console.log(err)
                                return
                            }

                            copyDir(srcPath, tarPath, checkEnd)
                            console.log("复制文件完成", srcPath)
                        })
                    } else {
                        copyFile(srcPath, tarPath, checkEnd)
                        console.log("复制文件完成", srcPath)
                    }
                })
            })

            //为空时直接回调
            files.length === 0 && cb && cb()
        })

    } else {
        fs.mkdir(tarDir, function (err) {
            if (err) {
                console.log(err)
                return
            }
            console.log('创建文件夹', tarDir)
            copyDir(srcDir, tarDir, cb)
        })
    }
}
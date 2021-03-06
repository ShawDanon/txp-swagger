const axios = require('axios');
const fs = require('fs');
const CONFIG = require('./config');
const ANTD = require('./template/antDesignPro');
let CNAME = {};

/**
 * @desc 创建目录
 */
function mkdir() {
  const hasDir = fs.existsSync('dist/');
  if (!hasDir) {
    fs.mkdir('dist/', function(err) {
      if (err) {
        return console.error('目录创建失败', err);
      }
      console.log('目录创建成功');
    });
  }
}
/**
 * @param  {String} name 文件名，包括后缀。
 * @param  {String} str 输入文件的字符串。
 */
function writeFile(name, str) {
  const directory = 'dist/';
  fs.writeFile(directory + name, str, function(err) {
    if (err) console.log('写文件操作失败', err);
    else console.log('写文件操作成功');
  });
}
/**
 * @desc 通过api生成需要的名字
 */
function generateName(api) {
  let name = api.match(`[^/]+(?!.*/)`)[0];
  name = name.replace(/\-/g, '_');
  switch (name) {
    case 'delete':
      name = 'del';
      break;
    case 'import':
      name = 'imports';
      break;

    default:
      break;
  }
  return name;
}
/**
 * @desc 根据tag生成注释添加进文本
 */
function generateStringTag(oldStr, tag) {
  let str = oldStr + `\n/**\n * ${tag}\n */`;
  return str;
}
function generateString(oldStr, api, method, element, apiData) {
  let name = generateName(api);
  const dec = element.summary;
  while (name in CNAME) {
    name = name + '_copy';
  }
  CNAME[name] = '';
  let str;
  switch (CONFIG.type) {
    case 'services':
      str = oldStr + ANTD['services'][method](name, api, dec, apiData);
      break;
    case 'mock':
      str = oldStr + ANTD['mock'][method](method, api, dec, apiData);
      break;
    case 'models':
      str = oldStr + ANTD['models'](name);
      break;

    default:
      break;
  }
  return str;
}
/**
 * @param {Array} response 网站数据
 */
function generateFile(response) {
  const apiData = response.data.paths;
  //遍历数组，写入文件
  CONFIG.arr.forEach(element => {
    let str = '';
    CNAME = {};
    //遍历标签，生成需要的字符串
    element.tags.forEach(tag => {
      str = generateStringTag(str, tag);
      //遍历api数据，匹配标签生成字符串
      for (const key in apiData) {
        if (apiData.hasOwnProperty(key)) {
          const itemData = apiData[key];
          const api = key;
          for (const key in itemData) {
            if (itemData.hasOwnProperty(key)) {
              const element = itemData[key];
              const method = key;
              if (tag === element.tags[0]) {
                str = generateString(str, api, method, element, apiData);
              }
            }
          }
        }
      }
    });
    writeFile(element.name, str);
  });
}

/**
 * @desc 主函数
 */
function main() {
  axios
    .get(CONFIG.url)
    .then(function(response) {
      mkdir();
      generateFile(response);
    })
    .catch(function(error) {
      console.log('请求失败！');
      console.log(error);
    });
}
main();

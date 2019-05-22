const antDesignPro = {
  services: {
    /**
     * @param  {String} name 模板方法名字
     * @param  {String} api 模板方法对应的api
     * @param  {String} desc 模板方法对应的注释
     */
    get: (name, api, desc) => {
      return `\nexport async function ${name}(params) {\n  return request(\`${api}?\${stringify(params)}\`);\n} // ${desc}\n`;
    }, //get请求模板
    /**
     * @param  {String} name 模板方法名字
     * @param  {String} api 模板方法对应的api
     * @param  {String} desc 模板方法对应的注释
     */
    post: (name, api, desc) => {
      return `\nexport async function ${name}(params) {\n  return request(\`${api}\`, {\n    method: 'POST',\n    body: params\n  });\n} // ${desc}\n`;
    }, //post请求模板
  },
  mock: {
    get: (method, api, dec) => {
      return `\n'${method.toUpperCase()} ${api}':table,`;
    },
    post: (method, api, dec) => {
      return `\n'${method.toUpperCase()} ${api}':table,`;
    },
  },
  models: name => {
    return `\n${name},`;
  },
};

module.exports = antDesignPro;

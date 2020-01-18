const container = require('markdown-it-container');

module.exports = function tabsPlugin(md, options = {}) {
  options = options || {};

  md.use(container, 'tabs', {
    render: (tokens, idx) => {
      const token = tokens[idx];
      const attributes = getTabsAttributes(token.info);
      if (token.nesting === 1) {
        return `<Tabs ${attributes}>\n`;
      } else {
        return `</Tabs>\n`;
      }
    },
  });

  md.use(container, 'tab', {
    render: (tokens, idx) => {
      const token = tokens[idx];
      const attributes = getTabAttributes(token.info);

      if (token.nesting === 1) {
        return `<Tab ${attributes}>\n`;
      } else {
        return `</Tab>\n`;
      }
    },
  });
};

function getTabsAttributes(info) {
  var arr = info.split(' ');
  var result = '';
  if (arr.length > 2) {
    arr.forEach(item => {
      if (item !== '' && item !== 'tabs') {
        var attribute = item.split(':');
        result += `${attribute[0]}="${attribute[1]}" `;
      }
    });
  } else {
    result = `type="border-card"`;
  }
  return result;
}

/* 
  (1)label="标题"&lazy
  (2)label="标题包含空格 Tab"
*/
function getTabAttributes(info) {
  return info.split('&').join(' ');
}

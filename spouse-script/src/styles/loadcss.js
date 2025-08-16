const css = ["index", "nav", "spinner", "travel"];
for (var i = 0; i < css.length; i++) {
    var div = document.createElement('link');
    div.rel = 'stylesheet'
    div.href = `./src/styles/${css[i]}.css`;
    document.head.appendChild(div)
};

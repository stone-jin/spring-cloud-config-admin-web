var Koa = require('koa');
var fs = require('fs');
var path = require('path');

var app = new Koa();

app.use(ctx => {
    console.log(ctx.path);
    var filePath = path.join(__dirname, "test", "mock", ctx.method, ctx.path)
    if (fs.existsSync(filePath)) {
        ctx.set('content-type', 'application/json');
        ctx.body = fs.readFileSync(
            filePath
        );
    } else {
        ctx.body = '404 not found!';
    }
});

app.listen(10002, () => {
    console.log('mock listen in 10002.');
});
var Koa = require('koa');
var fs = require('fs');
var path = require('path');

var app = new Koa();

app.use(ctx => {
    console.log(ctx.path);
    var filePath = path.join(__dirname, "test", "mock", ctx.method, ctx.path)
    console.log(filePath)
    if (fs.existsSync(filePath)) {
        if(fs.statSync(filePath).isDirectory()){
            if (fs.existsSync(filePath+ ".do")){
                ctx.set('content-type', 'application/json');
                ctx.body = fs.readFileSync(
                    filePath + ".do"
                );
            }else{
                ctx.body = '404 not found!';
                ctx.status = 404;
            }
        }else{
            ctx.set('content-type', 'application/json');
            ctx.body = fs.readFileSync(
                filePath
            );
        }
    } else {
        ctx.body = '404 not found!';
        ctx.status = 404;
    }
});

app.listen(12000, () => {
    console.log('mock listen in 10002.');
});
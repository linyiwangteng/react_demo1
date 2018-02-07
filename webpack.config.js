
module.exports = {
    // entry:__dirname+'/app.js',
    entry:{
        'main_file':'./app.js',
        'other_file':'./other.js'
    },
    output:{
        path:__dirname+'/dist',
        filename:'[name].bundle.js'
    },
    module:{
        loaders:[
            {
                test:/\.js|jsx?$/,
                loader:'babel-loader',
                exclude:/node_modules/,
                query:{
                    presets:['es2015','react']
                }
            }
        ]
    },
    resolve:{
        extensions: ['','.coffee','.js']
    },
    watch:true
}
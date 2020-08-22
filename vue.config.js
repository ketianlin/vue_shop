module.exports = {
    chainWebpack: config => {
        // chainWebpack可以通过链式编程的形式，修改webpack配置
        // configureWebpack可以通过操作对象的形式，修改webpack配置
        // 默认情况下，依赖项的所有第三方包都会被打包到js/chunk-vendors.******.js文件中，导致该js文件过大
        // 那么我们可以通过externals排除这些包，使它们不被打包到js/chunk-vendors.******.js文件中
        // 开发环境的首页和发布环境的首页展示内容的形式有所不同
        // 如开发环境中使用的是import加载第三方包，而发布环境则是使用CDN，那么首页也需根据环境不同来进行不同的实现
        // 我们可以通过插件的方式来定制首页内容
        //发布模式
        config.when(process.env.NODE_ENV === 'production', config => {
            config
                .entry('app')
                .clear()
                .add('./src/main-prod.js')

            //使用externals设置排除项
            config.set('externals',{
                vue:'Vue',
                'vue-router':'VueRouter',
                axios:'axios',
                lodash:'_',
                echarts:'echarts',
                nprogress:'NProgress',
                'vue-quill-editor':'VueQuillEditor'
            })

            //使用插件
            config.plugin('html').tap(args=>{
                //添加参数isProd
                args[0].isProd = true
                return args
            })
        })
        // 开发模式
        config.when(process.env.NODE_ENV === 'development', config => {
            config
                .entry('app')
                .clear()
                .add('./src/main-dev.js')

            //使用插件
            config.plugin('html').tap(args => {
                args[0].isProd = false
                return args
            })
        })
    }
}
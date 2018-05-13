const isProduction = process.env.NODE_ENV === 'production'
const devTool = isProduction ? 'source-map' : 'inline-cheap-module-source-map'

module.exports = devTool

/**
 * Module Dependencies
 */

const charset = require('superagent-charset');
const request = require('superagent');
var superagent = charset(request);

/**
 * Export `driver`
 */

module.exports = driver

/**
 * Default HTTP driver
 *
 * @param {Object} opts
 * @return {Function}
 */

function driver(opts) {
  var agent = superagent.agent(opts || {})

  return function http_driver(ctx, fn) {
    agent
      .get(ctx.url)
      .charset('binary')
      .set(ctx.headers)
      .end(function(err, res) {
        if (err && !err.status) return fn(err)

        ctx.status = res.status
        ctx.set(res.headers)

        ctx.body = 'application/json' == ctx.type
          ? res.body
          : res.text

        // update the URL if there were redirects
        ctx.url = res.redirects.length
          ? res.redirects.pop()
          : ctx.url

        return fn(null, ctx)
      })
  }
}

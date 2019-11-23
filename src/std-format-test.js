(function ($, ko, PORTAL) {
  const waitFor = ms => new Promise(resolve => setTimeout(resolve, ms))
  const list = [1, 2, 3]
  list.forEach(async num => {
    await waitFor(50)
    console.log(num)
  })

  console.log('Done')
})(window.jQuery, window.ko, window.PORTAL = window.PORTAL || {})

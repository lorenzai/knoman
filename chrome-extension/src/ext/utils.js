'use strict'
import * as moment from 'moment'

export function truncate (n, useWordBoundary) {
  if (this.length <= n) { return this }
  let subString = this.substr(0, n - 1)
  return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(' '))
    : subString) + ' ...'
}

export function formatTime (epoch, format) {
  return moment.unix(epoch).format(format)
}

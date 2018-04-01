'use strict'

export default function truncate (n, useWordBoundary) {
  if (this.length <= n) { return this }
  let subString = this.substr(0, n - 1)
  return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(' '))
    : subString) + ' ...'
}

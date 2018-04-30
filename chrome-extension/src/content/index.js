import * as $ from 'jquery'
// import config from './config'
import config from '../ext/constants'

const port = chrome.runtime.connect()
const REST_API_BASE = config.REST_API_BASE

function getParameterByName (url, name) {
  if (!url) url = window.location.href
  name = name.replace(/[[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  var results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

function init () {
  port.onMessage.addListener(function (msg) {
    if (msg.onWebsite || msg.onSearch) {
      let endpoint = '/search'
      if (msg.onWebsite) {
        endpoint = '/website'
      }
      console.log(msg.data)
      $.ajax({
        type: 'POST',
        url: REST_API_BASE + '/node' + endpoint,
        dataType: 'json',
        headers: {
          authorization: 'JWT ' + msg.token
        },
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(msg.data),
        success: function (data) {
          if (data) {
            console.log(JSON.stringify(data))
          }
        },
        failure: function (errMsg) {
          console.error(errMsg)
        }
      })
    }
    // if (msg.onHistory) {
    //     console.log('vistItems:');
    //     console.log(msg.data);
    // }
  })
}

function getSearchEngine (url) {
  let pattern = /^.*\.([^.]+)(?=\.com).*$/
  let result = url.match(pattern)
  if (result.length > 0) {
    return result[1]
  }
  return 'Unknown'
}

function isSearchEngine (url) {
  return url.startsWith('https://www.google.com') ||
         url.startsWith('https://notifications.google.com') ||
         url.startsWith('https://search.yahoo.com') ||
         url.startsWith('https://www.bing.com')
}

function sentInfo (url) {
  let query = getParameterByName(url, 'q') || getParameterByName(url, 'p')
  console.log('url: ' + url)
  console.log('isSearchEngine: ' + isSearchEngine(url))
  if (!query && !isSearchEngine(url)) {
    console.log('plain website')
    console.log('referer:' + document.referrer)
    // plain website
    port.postMessage({
      website: true,
      data: {
        referrer: document.referrer,
        domain: new URL(url).hostname,
        url: url
        // timestamp: Math.round((new Date()).getTime() / 1000),
        // label: 'Website'
      }
    })
    return
  }

  if (!query) { return }

  console.log('query:' + query)
  let searchEngine = getSearchEngine(url)
  // search portal
  port.postMessage({
    search: true,
    data: {
      engine: searchEngine,
      referrer: document.referrer,
      query: query,
      type: 'web'
      // timestamp: Math.round((new Date()).getTime() / 1000),
      // label: 'Search'
    }
  })
}

function load () {
  if (isRecorded) {
    return
  }
  console.log('knoman content js started')
  init()
  // delay sending web info for 3 seconds to exclude accidental click
  // Todo: tuning the delay time
  setTimeout((function (url) { sentInfo(url) })(window.location.href), 3000)
  // port.postMessage({
  //     history: true,
  //     url: window.location.href
  // })
  isRecorded = true
}

function unload () {
}

var isRecorded = false
// document.addEventListener('DOMContentLoaded', load, false)
var hidden
var visibilityChange
if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
  hidden = 'hidden'
  visibilityChange = 'visibilitychange'
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden'
  visibilityChange = 'msvisibilitychange'
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden'
  visibilityChange = 'webkitvisibilitychange'
}

function handleVisibilityChange () {
  if (document[hidden]) {
    // TODO: do something when user leaves the page?
    unload()
  } else {
    load()
  }
}

// Warn if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === 'undefined' || typeof document.hidden === 'undefined') {
  console.log('This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.')
  document.addEventListener('DOMContentLoaded', load, false)
} else {
  // Issue: if user stays in the search page and change the query, the content script won't fire since
  // the visibility does not change
  if (isSearchEngine(window.location.href)) {
    document.addEventListener('DOMContentLoaded', load, false)
  } else {
    document.addEventListener(visibilityChange, handleVisibilityChange, false)
  }
}

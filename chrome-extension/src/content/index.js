import * as $ from 'jquery'
// import config from './config'
import config from '../ext/constants'
// import iFrameResize from 'iframe-resizer'

var nodeType = 'website'
var token = ''
var nodeData = ''
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
  window.addEventListener('message', function (event) {
    if (event.data.type && (event.data.type === 'FROM_ACTION')) {
      let content = {}
      switch (event.data.text) {
        case 'poor':
          console.log('poor')
          content.feedback = 'poor'
          break
        case 'good':
          content.feedback = 'good'
          break
        case 'favorite':
          content.feedback = 'favorite'
          break
      }
      if (nodeType === 'website') {
        content.url = nodeData.url
      } else {
        content.query = nodeData.query
      }
      let data = JSON.stringify(content)
      console.log('patch:' + JSON.stringify(content))
      $.ajax({
        type: 'patch',
        url: REST_API_BASE + '/node/' + nodeType,
        dataType: 'json',
        headers: {
          authorization: 'JWT ' + token
        },
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (data) {},
        failure: function (errMsg) {
          console.error(errMsg)
        }
      })
    }
  })
  port.onMessage.addListener(function (msg) {
    if (msg.onWebsite || msg.onSearch) {
      let endpoint = msg.onWebsite ? '/website' : '/search'
      // save info
      nodeType = msg.onWebsite ? 'website' : 'search'
      token = msg.token
      nodeData = msg.data
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

function injectActionFrame () {
  var f = document.createElement('iframe')
  f.id = 'actionFrame'
  f.name = 'actionFrame'
  f.src = chrome.extension.getURL('pages/actionFrame.html')
  f.allowtransparency = 'true'
  f.scrolling = 'no'
  f.frameBorder = '0'
  f.border = 'none'
  f.sandbox = 'allow-scripts allow-forms allow-popups allow-same-origin'
  f.style.cssText = `
    position: fixed;
    bottom: 0;
    right: 0;
    width: 250px;
    height: 250px;
    background-color: rgba(255, 255, 255, 0.5);
    box-sizing: border-box;
    border: 2px solid #4CAF50;
    transition: 0.5s;
    z-index:2147483640;
  `

  var a = document.createElement('input')
  a.id = 'knomanButton'
  a.type = 'button'
  a.value = 'Knoman    \u002B'
  a.onclick = function () {
    var fr = f
    var button = a
    var frame = document.getElementById('actionFrame')
    if (frame) {
      frame.parentNode.removeChild(frame)
      button.value = 'Knoman    \u002B'
    } else {
      button.value = '\u2212'
      document.body.appendChild(fr)
    }
  }
  a.style.cssText = `
    size: 15px;
    width: 250px;
    height: 34px;
    text-align: right;
    background-color: #4CAF50;
    box-sizing: border-box;
    outline: none;
    color: white;
    cursor: pointer;
    position: fixed;
    bottom: 244px;
    right: 0;
    transition: 0.5s;
    border: 0.5px solid #4CAF50;
    z-index:2147483647;
  `
  document.body.appendChild(a)
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
  injectActionFrame()
}

function unload () {
}

// document.addEventListener('DOMContentLoaded', load, false)
var isRecorded = false
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
  // If it is hidden, run content script when it becomes active
  // If it is already active, run script after the DOM content is loaded
  if (document[hidden]) {
    document.addEventListener(visibilityChange, handleVisibilityChange, false)
  } else {
    document.addEventListener('DOMContentLoaded', load, false)
  }
}

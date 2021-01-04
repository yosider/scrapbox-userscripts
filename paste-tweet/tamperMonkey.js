// ==UserScript==
// @name         twitter-info-proxy
// @namespace    https://scrapbox.io
// @version      0.1
// @description  fetch the information of a tweet
// @author       takker
// @match        https://scrapbox.io/*
// @connect      publish.twitter.com
// @grant        GM_xmlhttpRequest
// @license      MIT
// @copyright    Copyright (c) 2020 takker
// ==/UserScript==

;(function () {
    "use strict"
    unsafeWindow.getTweetInfo = (url) => {
      const u = new URL(url)
      if (!['publish.twitter.com'].includes(u.hostname)) {
        throw Error("unexpected url!")
      }
      return new Promise((r) => {
        GM_xmlhttpRequest({
          method: "GET",
          url,
          onload: (res) => r(res),
          withCredentials: true,
          responseType: "json",
        })
      })
    }
  })()
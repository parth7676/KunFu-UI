/* eslint no-undef: "off" */
import importScripts from 'import-scripts'

importScripts('workbox-sw.prod.js')

const workboxSW = new self.WorkboxSW({
  'skipWaiting': true,
  'clientsClaim': true
})

workboxSW.precache([])

---
layout: page
image: /assets/servers.gif
title: Multithreaded Downloader
tagline: Using HTTP Range Requests
lastUpdated: 2018-08-27T00:00:00.000Z
tags: [ Javascript Async WhatWG Streams ]
category: [ Article ]
---

A browser based multi-threaded downloader implemented in vanilla JavaScript. <!-- more --> Fetches parts of a file using the HTTP Range header and downloads those pieces in parallel. When the pieces have all been downloaded, the original file is re-assembled and saved in the browser's Downloads folder.

[GitHub](https://github.com/Backblaze-B2-Samples/multithreaded-downloader-js)

## Requirements

The downloader should fetch the file directly from the web browser without a server needed to proxy the file. The download process should not need any client software or browser plugin to be installed. It should allow for resuming an interrupted download, or at least retrying a part of the file that was interrupted.

This project will allow us to specify the number of download threads and the size of each request... so we can tune it for specific network conditions, if that is necessary.

-   Sends HTTP HEAD request to get the file info and calculate number of chunks
-   Sends HTTP GET requests with "Range: bytes=start-end" header for each chunk
-   Monitor the progress of each response stream

100% client side JavaScript, no plug-ins or proxy required

## a[download] Method

-   WhatWG Web Streams
-   Memory limit
-   Blob

## StreamSaver.js Method

-   Uses StreamSaver.js to simplify downloading the output stream.
-   Concatenates each response stream (in order) into a final output stream
-   Cross-origin dependency (mitm.html)
-   Service worker timeout
-   WhatWG Web Streams

## HTML5 FileSystem API Method

-   Uses Bro-fs (HTML5 Filesystem api) to temporarily save each chunk.
-   Concatenates all chunks once complete and triggers a[download] with final file.
-   Deprecated

## Code

The Multithread constructor accepts a single object parameter:

```javascript
new MultiThread({
  // The request url
  url: 'http://some-url/',

  // Request headers to pass-though
  headers: {
    'Authorization': `Bearer ${accessToken}`
  },

  // The final output fileName
  fileName: 'some-file.ext',

  // Number of concurrent request threads
  threads: 6,

  // Size of each chunk in MB
  chunkSize: 4,

  // Number of retry attempts
  retries: 2,

  // Delay before another retry attempt in ms
  retryDelay: 1000,
})
```

## Usage

Multithread triggers several events that you can attach callbacks to. The callbacks will be called with a single object consisting of the following keys:

-   onStart({ contentLength, chunks })
-   onFinish({})
-   onProgress({ contentLength, loaded })
-   onError({ error })

Each individual chunk will also trigger it's own events:

-   onChunkStart({ id })
-   onChunkFinish({ id })
-   onChunkProgress({ contentLength, loaded, id })
-   onChunkError({ id, error })

PromiseQueue provides concurrency by using a queue of promises. It will automatically retry a configurable amount of times before triggering either an "onFinish" or "onError" event.

### Reference

-   [Parallel chunk requests in a browser via Service Workers](https://blog.ghaiklor.com/parallel-chunk-requests-in-a-browser-via-service-workers-7be10be2b75f)
-   [Web Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)
-   [Web Streams Spec](https://streams.spec.whatwg.org/)
-   [browser-server](https://github.com/mafintosh/browser-server)
-   [fetch-retry](https://github.com/jonbern/fetch-retry)
-   [Pipes.js](http://pipes.js.org/)

### Dependencies

-   ~~[Web Streams Polyfill](https://github.com/creatorrr/web-streams-polyfill)~~
-   ~~[StreamSaver](https://github.com/jimmywarting/StreamSaver.js)~~
-   [bro-fs](https://github.com/vitalets/bro-fs)

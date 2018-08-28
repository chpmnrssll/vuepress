---
layout: page
image: /assets/servers.svg
title: Multithreaded Downloader
tagline: With HTTP Range Requests
lastUpdated: 2018-06-25T00:00:00.000Z
tags: [ Javascript Async WhatWG Streams ]
category: [ Article ]
---

-   description
-   use case
<!-- more -->
## Requirements

-   HTTP Range requests

## a[download] Method

-   WhatWG Web Streams
-   Blob
-   Memory limit

# StreamSaver.js Method

-   WhatWG Web Streams
-   Service Worker
    -   Cross-origin dependency (mitm.html)
    -   Service worker timeout

# HTML5 FileSystem API Method

-   Deprecated
-   Bro-fs
-   a[download] strikes back

# Code

-   Multithread

    -   Events
        -   onStart
        -   onFinish
        -   onProgress
        -   onError

-   Chunk

    -   Range
    -   Events
        -   onChunkStart
        -   onChunkFinish
        -   onChunkProgress
        -   onChunkError

-   PromiseQueue
    -   Concurrency
    -   Promises
    -   Retry
    -   Events
        -   onFinish

In a nutshell, we're doing the following:

```javascript
//% highlight javascript linenos %}
// % endhighlight %}
```

# References

-   Mr. White
-   Mr. Blonde
-   Mr. Pink
-   Mr. Orange
-   Mr. Brown
-   Mr. Blue

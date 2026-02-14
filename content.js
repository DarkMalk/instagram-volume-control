const DEFAULT_VOLUME = 1
let volume = DEFAULT_VOLUME

chrome.storage.local.get(['volume']).then(result => {
  if (typeof result.volume !== 'undefined') {
    volume = result.volume
  }
})

const observer = new MutationObserver(() => {
  const videos = document.querySelectorAll('video')
  videos.forEach(video => (video.volume = volume))

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    volume = message.volume ?? DEFAULT_VOLUME
    videos.forEach(video => (video.volume = volume))

    chrome.storage.local.set({ volume })
  })
})

observer.observe(document.body, { childList: true, subtree: true })

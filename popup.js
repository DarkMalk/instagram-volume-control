const $counterVolume = document.getElementById('counter_volume')
const $inputVolume = document.getElementById('volume_input')

chrome.storage.local.get(['volume']).then(result => {
  const volume = result.volume

  if (typeof volume !== 'undefined') {
    $inputVolume.value = volume * 100
    $counterVolume.textContent = volume * 100
  } else {
    $counterVolume.textContent = $inputVolume.value
  }
})

$inputVolume.addEventListener('input', async evt => {
  const { value } = evt.target

  $counterVolume.textContent = value

  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  })

  chrome.tabs.sendMessage(tab.id, { volume: Number(value) / 100 })
})

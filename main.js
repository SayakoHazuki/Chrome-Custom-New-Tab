const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function updateTime () {
  const dt1 = new Date()
  const dt2 = dt1.toLocaleString('en-GB').split(',')
  const dt3 = dt2[0].split('/')
  const y = ('0' + dt3[2]).slice(-4)
  const m = ('0' + dt3[1]).slice(-2)
  const d = ('0' + dt3[0]).slice(-2)
  const day = days[dt1.getDay()]
  const dt4a = `${dt2[1]}`.replace(/AM|PM/g, '')
  const dt4b = `${d}/${m}/${y} (${day})`.replace(/AM|PM/g, '')
  document.getElementById('dttime').innerHTML = dt4a
  document.getElementById('dtdate').innerHTML = dt4b
}
setInterval(updateTime, 100)

const HkoApiUrl = 'https://apiproxy.ookai9097oo.repl.co/hkoapi'

$.get(HkoApiUrl).then(response => {
  for (const [type, val] of Object.entries(response)) {
    console.log(type, val)
    const warnCode = val.code
      .replace('WMSGNL', 'sms')
      .replace('WTMW', 'tsunami-warn')
      .replace('WL', 'landslip')
      .replace('FNTSA', 'ntfl')
      .replace('WHOT', 'vhot')
      .replace(/(^|[ ])(W(?=\w))/g, '')
      .toLowerCase()
    $('.warn').prepend(
      `<img class="warnimg" src="https://www.hko.gov.hk/en/textonly/img/warn/images/${warnCode}.gif" alt=${val.code}>`
    )
  }
})



function search (keyword) {
  window.open('http://google.com/search?q=' + keyword, '_self')
}

const input = document.getElementById('input')
input.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    // Enter
    search(input.value)
  }
})

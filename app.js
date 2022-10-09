// 天氣 API
const city = document.querySelector('#cityDropdown');
const form = document.querySelector('#selectForm');
const selectedCity = document.querySelector('h2');
const selectedTime = document.querySelector('h3');
const elValue = document.querySelectorAll('span');
const next = document.querySelector('#next');

form.addEventListener('submit', async (e) => {
    // event prevent
    e.preventDefault();

    // API 呼叫
    const res = await axios({
        method: 'GET',
        baseURL: 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001',
        timeout: 3000,
        params: {
            Authorization: 'CWB-333721CB-8558-410B-B4E0-67BCA1A86A16',
            limit: 1,
            locationName: city.value,
        }
    });

    // 撈出需要的基本 data
    const data = res.data.records.location[0];

    // 天氣因子 取值
    const weatherEl = data.weatherElement;
    const forcast = weatherEl.map((el) => {
        return el.time[0].parameter.parameterName
    })

    // 天氣因子 DOM
    for (let i = 0; i < 5; i++) {
        elValue[i].innerHTML = forcast[i];
    }

    // 地點 DOM
    selectedCity.innerHTML = data.locationName;

    // 時間 DOM
    const period = data.weatherElement[0].time[0];
    selectedTime.innerHTML = `${period.startTime} ~ ${period.endTime}`

    console.log(forcast)
});
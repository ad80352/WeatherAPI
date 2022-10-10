// 天氣 API
const form = document.querySelector('#selectForm');
const city = document.querySelector('#cityDropdown');
const time = document.querySelector('#timeSelect')
const option = document.querySelectorAll('.option');
const info = document.querySelector('#information');
const error = document.querySelector('#error')
const selectedCity = document.querySelector('h2');
const selectedTime = document.querySelector('h3');
const elValue = document.querySelectorAll('span');

form.addEventListener('change', async () => {
    try {
        // city.value !== '選擇縣市' ? '執行' : '不執行'
        if (city.value.length > 0) {
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

            // let error invisible no matter if it exist.
            error.classList.add('d-none');

            // 撈出需要的基本 data
            // 事後檢討：其實已經不需要 locationName 了，可以直接深入 weatherElement
            const data = res.data.records.location[0];

            // 將 data 代入 dom()
            await DOM(data);

            // 顯示 info
            info.classList.remove('d-none');
            
        } else {
            info.classList.add('d-none');
        }
    } catch (e) {
        console.log(e)
        error.classList.remove('d-none');
    }
})


// 取值 & DOM 操作
function DOM(data) {

    // 取值
    const weatherEl = data.weatherElement;

    // 撈出時間區間
    let threePeriod = [];

    for (let i = 0; i <= 2; i++) {
        threePeriod.push(`${weatherEl[0].time[i].startTime} ~ ${weatherEl[0].time[i].endTime}`);
    }

    // Selected選單 時間 DOM
    for (let i = 0; i <= 2; i++) {
        option[i].innerHTML = threePeriod[i]
    }


    // 封裝浮動數據
    function DisplayWeatherEl() {

        // 天氣因子 取值
        const forcast = weatherEl.map((el) => {
            return el.time[time.value].parameter.parameterName
        })

        // 天氣因子 DOM
        for (let i = 0; i < 5; i++) {
            elValue[i].innerHTML = forcast[i];
            elValue[2].style.color = 'blue';
            elValue[4].style.color = 'red';
        }

        // 當前所選時間 DOM
        selectedTime.innerHTML = threePeriod[time.value];
    }

    DisplayWeatherEl();

    // 地點 DOM
    selectedCity.innerHTML = data.locationName;



    // 依據所選的區間改變該時段的天氣因子
    time.addEventListener('change', function () {
        DisplayWeatherEl();
    })
}

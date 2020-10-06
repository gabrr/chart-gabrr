import { message } from "antd";
import { secondsParser } from "../../../utils/normalizers/time";
import { COLORS } from "../../../utils/theme/colors";

export const getTopValue = data => data.reduce((acc, { y }) => {
    return acc < y ? y : acc
}, 0)

export const getDataParsed = (data, topNumber, title) =>  data.map(({ x, y }) => {
    let percentage = 0
    if (topNumber > 0) percentage = ( y / topNumber) * 100
    if (/Duração/.test(title)) return { x, percentage, y: secondsParser(y * 3600)}
    return { x, percentage, y }
})

export const getXIndicator = (topNumber, sufix, decimals = 0) => {
    return [0, 25, 50, 75, 100].map(value => {
        const xValue = (topNumber / 100) * value

        return {
            yPosition: value,
            value: xValue % 1 === 0 ? xValue : xValue.toFixed(decimals),
            sufix,
            id: value + 'x_indicator'
        }
    }) 
}

export const showToolTipIcon = (e) => {
    if(e.target.getAttribute("class").includes('hoverable')) return e.target.querySelector('.chart_tip').classList.add('show')
    return;
}

export const hideToolTipIcon = (e) => {
    if(e.target.getAttribute("class").includes('hoverable')) return e.target.querySelector('.chart_tip').classList.remove('show')
    return;
}

export const showToolTip = (e) => {
    if(e.target.getAttribute("class").includes('chart_tip')) return e.target.querySelector('.tooltip_text').classList.add('show')
    return;
}

export const hideToolTip = (e) => {
    if(e.target.getAttribute("class").includes('chart_tip')) return e.target.querySelector('.tooltip_text').classList.remove('show')
    return;
} 

export const toggleAnimation = (loading) => {
    if(loading) return document?.querySelectorAll('.loader').forEach(el => el?.classList.add('active'))
    if(!loading) return document?.querySelectorAll('.loader')?.forEach(el => el?.classList.remove('active'))
}

export const fadeIn = ({ target }) => {
    target.querySelector('.tooltip').classList.add('fadeIn')
}

export const fadeOut = ({ target }) => {
    target.querySelector('.tooltip').classList.remove('fadeIn')
}

const DESCRIPTIONS = {
    recharge: 'Mostra número de recargas realizadas, de acordo com o volume de dados definido pelo filtro',
    duration: 'Mostra duração média de recargas realizadas',
    energy: 'Mostra consumo médio de energia em cada recarga realizada',
    autonomy: 'Mostra a autonomia média que foi ganhada com as recargas realizadas',
    duration2: 'Mostra a faixa de tempo de recarga mais popular',
    frequency: 'Mostra o número de recargas ao decorrer de um dia'
}

export const parseChartData = (chartsDataResponse, days) => {

    const parseWeekPeriod = (data) => {
        const startPeriod = new Date(data.startDate).toGMTString().match(/[\d]...../i)[0]
        const endPeriod = new Date(data.endDate).toGMTString().match(/[\d]./i)[0]
        return `${startPeriod} - ${endPeriod}`
    }

    const parseYearPeriod = (data) => {
        return new Date(data.startDate).toGMTString().match(/\s\w{3}/i)[0].trim()
    }

    const parseDayPeriod = (data) => {
        return new Date(data.startDate).toGMTString().match(/[\d]...../i)[0]
    }

    const isKeyExisting = (key, arrayOfKeys) => arrayOfKeys.includes(key) 

    const chartBarsKeys = ['recharge', 'duration', 'energy', 'autonomy', 'frequency']
    const chartsWithDynamicX = ['recharge', 'duration', 'energy', 'autonomy',]

    const filterChartBars = Object.entries(chartsDataResponse).filter(([key]) => isKeyExisting(key, chartBarsKeys))
    const dailyChartsData = Object.entries(chartsDataResponse.dailyDistributions).filter(([key]) => isKeyExisting(key, chartBarsKeys))

    const filterChartBars2 = dailyChartsData.map(([ key, obj ]) => {

        const customKey = key === 'duration' ? 'duration2' : key
        const customData = key === 'duration' ? {
            '<1h': obj['<1h'],
            '1h-2h': obj['1h-2h'],
            '2h-4h': obj['2h-4h'],
            '>4h': obj['>4h'],
        } : obj
        
        return [customKey, Object.entries(customData).map(([ objKey, objValues ]) => {
            return { x: objKey, value: objValues }
        })]
    })
    
    const allChartsBar = [...filterChartBars, ...filterChartBars2]
    
    const parseToChartsModel = (arrayWithAllChartsBar) => {
        return arrayWithAllChartsBar.map(([chartsBarKey, chartsBarValues]) => {

            let title;

            if (chartsBarKey === 'recharge') title = `Recargas nos Últimos ${days} Dias`
            if (chartsBarKey === 'duration') title = `Duração nos Últimos ${days} Dias (h)`
            if (chartsBarKey === 'energy') title = `Consumo nos Últimos ${days} Dias (kWh)`
            if (chartsBarKey === 'autonomy') title = `Autonomia nos Últimos ${days} Dias (km)`
            if (chartsBarKey === 'duration2') title = `Tempo de Permanência nos Últimos ${days} Dias`
            if (chartsBarKey === 'frequency') title = `Horários mais Populares nos Últimos ${days} Dias (h)`
            
            const getPeriodByKeyAndDays = (valueToCheck) => {

                if (days === "28" && isKeyExisting(chartsBarKey, chartsWithDynamicX)) return parseWeekPeriod(valueToCheck)
                if (days === "365" && isKeyExisting(chartsBarKey, chartsWithDynamicX)) return parseYearPeriod(valueToCheck)
                if (days === "7" && isKeyExisting(chartsBarKey, chartsWithDynamicX)) return parseDayPeriod(valueToCheck)

                return valueToCheck.x
            } 

            return {
                title,
                key: chartsBarKey,
                tooltip: DESCRIPTIONS[chartsBarKey],
                className: chartsBarKey + '_chart',
                series: chartsBarValues.map((singleChartData) => {
                    return {
                        x: getPeriodByKeyAndDays(singleChartData),
                        y: singleChartData.value,
                    }
                })
            }
        })
    }

    return parseToChartsModel(allChartsBar)

}

export const getColorByTitle = (title) => {
    if (/Duração/i.test(title)) return COLORS.duration
    if (/Recargas/i.test(title)) return COLORS.recharges
    if (/Consumo/i.test(title)) return COLORS.consume
    if (/Autonomia/i.test(title)) return COLORS.autonomy
    if (/permanência/i.test(title)) return COLORS.stayTime
    if (/populares/i.test(title)) return COLORS.popular
}

export const INTERVAL_LIST_DEFAULT = [
    { value: '7', label: 'Últimos 7 dias', id: 7 },
    { value: '28', label: 'Últimos 28 dias', id: 28 },
    { value: '365', label: 'Últimos 365 dias', id: 365 },
]

export const DEFAULT_OPTIONS = [
    { value: '0', id: 'Lista Vazia', label: 'Lista Vazia' }
]


export const MOCK_1 = [
    {
        title: 'Duração nos Últimos 28 Dias (h)',
        key: 'duration',
        className: 'duration_chart',
        series: [
            { x: '06 Sep - 12', y: 0 },
            { x: '13 Sep - 19', y: 0 },
            { x: '20 Sep - 26', y: 0 },
            { x: '27 Sep - 03', y: 0 },
        ]
    },
    {
        title: 'Recargas nos Últimos 28 Dias',
        key: 'recharge',
        className: 'recharge_chart',
        series: [
            { x: '06 Sep - 12', y: 0 },
            { x: '13 Sep - 19', y: 0 },
            { x: '20 Sep - 26', y: 0 },
            { x: '27 Sep - 03', y: 0 },
        ]
    },
    {
        title: 'Consumo nos Últimos 28 Dias (kWh)',
        key: 'energy',
        className: 'energy_chart',
        series: [
            { x: '06 Sep - 12', y: 0 },
            { x: '13 Sep - 19', y: 0 },
            { x: '20 Sep - 26', y: 0 },
            { x: '27 Sep - 03', y: 0 },
        ]
    },
    {
        title: 'Autonomia nos Últimos 28 Dias (km)',
        key: 'autonomy',
        className: 'autonomy_chart',
        series: [
            { x: '06 Sep - 12', y: 0 },
            { x: '13 Sep - 19', y: 0 },
            { x: '20 Sep - 26', y: 0 },
            { x: '27 Sep - 03', y: 0 },
        ]
    },
    {
        title: 'Tempo de Permanência nos Últimos 28 Dias',
        key: 'duration2',
        className: 'duration2_chart',
        series: [
            {x: ">4h", y: 0},
            {x: "<1h", y: 0},
            {x: "2h-4h", y: 0},
            {x: "1h-2h", y: 0},
        ]
    },
    {
        title: "Horários mais Populares nos Últimos 28 Dias (h)",
        key: 'frequency',
        className: 'frequency_chart',
        series: [
            {x: "0", y: 0},
            {x: "1", y: 0},
            {x: "2", y: 0},
            {x: "3", y: 0},
            {x: "4", y: 0},
            {x: "5", y: 0},
            {x: "6", y: 0},
            {x: "7", y: 0},
            {x: "8", y: 0},
            {x: "9", y: 0},
            {x: "10", y: 0},
            {x: "11", y: 0},
            {x: "12", y: 0},
            {x: "13", y: 0},
            {x: "14", y: 0},
            {x: "15", y: 0},
            {x: "16", y: 0},
            {x: "17", y: 0},
            {x: "18", y: 0},
            {x: "19", y: 0},
            {x: "20", y: 0},
            {x: "21", y: 0},
            {x: "22", y: 0},
            {x: "23", y: 0},
            {x: "24", y: 0},
        ]
    },
]

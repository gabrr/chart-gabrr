import { message } from "antd";

export const getTopValue = data => data.reduce((acc, { y }) => {
    return acc < y ? y : acc
}, 0)

export const getDataParsed = (data, topNumber) =>  data.map(({ x, y }) => {
    const percentage = ( y / topNumber) * 100;
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

    return Object.entries(chartsDataResponse).map(([key, data]) => {
        if (key === 'error' && data) return message.error('Erro ao carregar gráficos')
        
        if (key !== 'error') {

            let title;

            if (key === 'recharge') title = `Recargas nos últimos ${days} dias`
            if (key === 'duration') title = `Duração nos últimos ${days} dias (h)`
            if (key === 'energy') title = `Consumo nos últimos ${days} dias (kWh)`
            if (key === 'autonomy') title = `Autonomia nos últimos ${days} dias (km)`

            return {
                [title]: data.map((indicatorsValues) => {
                    let period;

                    if (days === "28") period = parseWeekPeriod(indicatorsValues)
                    if (days === "365") period = parseYearPeriod(indicatorsValues)
                    if (days === "7") period = parseDayPeriod(indicatorsValues)
                    
                    return {
                        x: period,
                        y: indicatorsValues.value,
                    }
                })
            } 
        }
    }).filter(result => result !== undefined)
}


// .match(/[\d]...../i)
// new Date("2020-09-20").toGMTString()
// .match(/[\d]./i)

export const DEFAULT_CHART_DATA = {
    365: [{'Recargas nos últimos 365 dias':
        [
            { x: 'Jan', y: 0 },
            { x: 'Fav', y: 0 },
            { x: 'Mar', y: 0 },
            { x: 'Abr', y: 0 },
            { x: 'Mai', y: 0 },
            { x: 'Jun', y: 0 },
            { x: 'Jul', y: 0 },
            { x: 'Ago', y: 0 },
            { x: 'Set', y: 0 },
            { x: 'Out', y: 0 },
            { x: 'Nov', y: 0 },
            { x: 'Dez', y: 0 },
        ]},
        {'Duração nos últimos 365 dias (h)':
            [
                { x: 'Jan', y: 0 },
                { x: 'Fav', y: 0 },
                { x: 'Mar', y: 0 },
                { x: 'Abr', y: 0 },
                { x: 'Mai', y: 0 },
                { x: 'Jun', y: 0 },
                { x: 'Jul', y: 0 },
                { x: 'Ago', y: 0 },
                { x: 'Set', y: 0 },
                { x: 'Out', y: 0 },
                { x: 'Nov', y: 0 },
                { x: 'Dez', y: 0 },
            ]
        },
        {'Consumo nos últimos 365 dias (kWh)':
            [
                { x: 'Jan', y: 0 },
                { x: 'Fav', y: 0 },
                { x: 'Mar', y: 0 },
                { x: 'Abr', y: 0 },
                { x: 'Mai', y: 0 },
                { x: 'Jun', y: 0 },
                { x: 'Jul', y: 0 },
                { x: 'Ago', y: 0 },
                { x: 'Set', y: 0 },
                { x: 'Out', y: 0 },
                { x: 'Nov', y: 0 },
                { x: 'Dez', y: 0 },
            ]
        },
        {'Autonomia nos últimos 365 dias (km)':
            [
                { x: 'Jan', y: 0 },
                { x: 'Fav', y: 0 },
                { x: 'Mar', y: 0 },
                { x: 'Abr', y: 0 },
                { x: 'Mai', y: 0 },
                { x: 'Jun', y: 0 },
                { x: 'Jul', y: 0 },
                { x: 'Ago', y: 0 },
                { x: 'Set', y: 0 },
                { x: 'Out', y: 0 },
                { x: 'Nov', y: 0 },
                { x: 'Dez', y: 0 },
            ]
        },
    ],
    7: [{'Recargas nos últimos 7 dias': [{ x: 'Seg', y: 0 },
    { x: 'Ter', y: 0 },
    { x: 'Qua', y: 0 },
    { x: 'Qui', y: 0 },
    { x: 'Sex', y: 0 },
    { x: 'Sab', y: 0 },
    { x: 'Dom', y: 0 },]},
    {'Duração nos últimos 7 dias (h)': [{ x: 'Seg', y: 0 },
    { x: 'Ter', y: 0 },
    { x: 'Qua', y: 0 },
    { x: 'Qui', y: 0 },
    { x: 'Sex', y: 0 },
    { x: 'Sab', y: 0 },
    { x: 'Dom', y: 0 },]},
    {'Consumo nos últimos 7 dias (kWh)': [{ x: 'Seg', y: 0 },
    { x: 'Ter', y: 0 },
    { x: 'Qua', y: 0 },
    { x: 'Qui', y: 0 },
    { x: 'Sex', y: 0 },
    { x: 'Sab', y: 0 },
    { x: 'Dom', y: 0 },]},
    {'Autonomia nos últimos 7 dias (km)': [{ x: 'Seg', y: 0 },
    { x: 'Ter', y: 0 },
    { x: 'Qua', y: 0 },
    { x: 'Qui', y: 0 },
    { x: 'Sex', y: 0 },
    { x: 'Sab', y: 0 },
    { x: 'Dom', y: 0 },]},
    
    ],
    28: [
        {'Recargas nos últimos 28 dias': [
            { x: 'Seg', y: 0 },
            { x: 'Ter', y: 0 },
            { x: 'Qua', y: 0 },
            { x: 'Qui', y: 0 },
            { x: 'Sex', y: 0 },
            { x: 'Sab', y: 0 },
            { x: 'Dom', y: 0 },
        ]},
        {'Duração nos últimos 28 dias (h)': [
            { x: 'Seg', y: 0 },
            { x: 'Ter', y: 0 },
            { x: 'Qua', y: 0 },
            { x: 'Qui', y: 0 },
            { x: 'Sex', y: 0 },
            { x: 'Sab', y: 0 },
            { x: 'Dom', y: 0 },
        ]},
        {'Consumo nos últimos 28 dias (kWh)': [
            { x: 'Seg', y: 0 },
            { x: 'Ter', y: 0 },
            { x: 'Qua', y: 0 },
            { x: 'Qui', y: 0 },
            { x: 'Sex', y: 0 },
            { x: 'Sab', y: 0 },
            { x: 'Dom', y: 0 },
        ]},
        {'Autonomia nos últimos 28 dias (km)': [
            { x: 'Seg', y: 0 },
            { x: 'Ter', y: 0 },
            { x: 'Qua', y: 0 },
            { x: 'Qui', y: 0 },
            { x: 'Sex', y: 0 },
            { x: 'Sab', y: 0 },
            { x: 'Dom', y: 0 },
        ]},
        
    ],
}

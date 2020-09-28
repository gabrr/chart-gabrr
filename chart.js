// libraries
import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

// functions and default values
import { fadeIn, fadeOut, getDataParsed, getTopValue, getXIndicator, toggleAnimation } from './tools'


export const BlackChart = ({ data, title, loading }) => {

    const topNumber = getTopValue(data)
    const xIndicators = getXIndicator(topNumber, '')
    const chartData = getDataParsed(data, topNumber)


    useEffect(() => {
        toggleAnimation(loading)
    }, [loading])
    


    return (
        <Div className="chart" >
            <p className="chart_title"> {title} </p>
            <div className="container">
                <div className="loader active">
                    <div className="dots"></div>
                    <div className="dots"></div>
                    <div className="dots"></div>
                </div>
                <div className="x_indicators">
                    {xIndicators.map(line => (
                        <XIndicator
                            key={line.id}
                            value={line.yPosition}
                            className="gray_bg"
                        >
                            <div className="y_label"> { line.value + line.sufix} </div>
                        </XIndicator>
                    ))}
                </div>
                <div className="bar_series">
                    {chartData.map(bar => (
                        <ChartBar
                            key={bar.x}
                            value={`${bar.percentage}`}
                            onMouseEnter={fadeIn}
                            onMouseLeave={fadeOut}
                        >
                            <div className="tooltip"> {bar.y}</div>
                            <div className="x_label"> { bar.x } </div>
                        </ChartBar>
                    ))}
                </div>
            </div>
        </Div>
    )
}

const motion = keyframes`
  0% {
    transform: scale(0.7);
  }
  10% {
    transform: scale(0.6);
  }
  50% {
    transform: scale(1) translateY(-6px);
  }
  90% {
    transform: scale(1) translateY(0);
  }
  100% {
    transform: scale(1) translateY(3px);
  }
`;

const Div = styled.div`
    .chart_title {
        margin: 0 0 30px -30px;
    }

    .container {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .x_indicators {
        position: absolute;
        bottom: 0;
        height: 100%;
        width: 100%;
    }

    .gray_bg {
        background-color: #d8d8d8;
    }

    .bar_series {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
    }

    .x_label {
        position: absolute;
        font-size: 11px;
        bottom: -27px;
        left: 50%;
        transform: translateX(-50%);
        pointer-events: none;
        width: max-content;
    }

    .y_label {
        position: absolute;
        top: 50%;
        left: -25px;
        transform: translateY(-50%);
        font-size: 10px;
    }
    .loader {
        position: absolute;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: #F0f0f0;
        z-index: 3;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        transition: 300ms ease;
        opacity: 0;
        pointer-events: none;
    }

    .loader.active {
        opacity: 1 !important;
    }

    .dots {
        width: 10px;
        height: 10px;
        background-color: blue;
        margin: 0 3px;
        border-radius: 50px;
        animation: ${motion} 500ms linear infinite alternate;

        &:nth-child(1) {
            animation-delay: 0;
        }
        &:nth-child(2) {
            animation-delay: 50ms;
        }
        &:nth-child(3) {
            animation-delay: 100ms;
        }
    }

`

const ChartBar = styled.div`
    height: ${({ value }) => value + '%'};
    width: 100%;
    background-color: rgb(2, 65, 182);
    margin: 0 5px;
    border-radius: 3px 3px 0 0;
    position: relative;
    transition: all 400ms ease;

    .tooltip {
        position: absolute;
        background-color: rgb(2, 65, 182);
        color: #fff;
        padding: 3px 5px;
        border-radius: 3px;
        z-index: 1;
        transform: translate(-50%, -24px);
        left: 50%;
        font-size: 10px;
        opacity: 0;
        transition: 200ms ease;
        pointer-events: none;
    }

    .fadeIn {
        opacity: 1;
    }
`

const XIndicator = styled.div`
    height: 1px;
    width: 100%;
    position: absolute;
    bottom: ${({ value }) => value + '%'}
`

// fetch(`/api/surveyResponses/1`)
fetch(`https://cosmos-wellbeing-function-app.azurewebsites.net/api/surveyResponses/1`)
    .then(function (response) {
        if (!response.ok) {
            throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
    })
    .then(function (json) {
        drawChart1(json);

    })
    .catch(function (error) {

    });


    // fetch(`/api/surveyResponses/2`)
fetch(`https://cosmos-wellbeing-function-app.azurewebsites.net/api/surveyResponses/2`)
    .then(function (response) {
        if (!response.ok) {
            throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
    })
    .then(function (json) {
        drawChart2(json);

    })
    .catch(function (error) {

    });

    var drawChart1 = function (json) {
        var labels = new Set();
        var dataPoints = [];
        for (i = 0; i < json.documents.length; i++) {
            var dataPoint = { x: new Date(json.documents[i].Date), y: json.documents[i].avgRating };
            dataPoints.push(dataPoint);
            labels.add(dataPoint.x);
        }
    
        var sortedLabels = Array.from(labels).sort((a, b) => a - b)
        dataPoints.sort((a, b) => a.x - b.x)
    
        const data = {
            labels: sortedLabels,
            datasets: [{
                label: 'Response',
                backgroundColor: '#36a3eb',
                borderColor: '#36a3eb7F',
                fill: false,
                data: dataPoints
            }]
        };
    
        const totalDuration = 5000;
        const delayBetweenPoints = totalDuration / dataPoints.length;
        const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
        const animation = {
            x: {
                type: 'number',
                easing: 'linear',
                duration: delayBetweenPoints,
                from: NaN, // the point is initially skipped
                delay(ctx) {
                    if (ctx.type !== 'data' || ctx.xStarted) {
                        return 0;
                    }
                    ctx.xStarted = true;
                    return ctx.index * delayBetweenPoints;
                }
            },
            y: {
                type: 'number',
                easing: 'linear',
                duration: delayBetweenPoints,
                from: previousY,
                delay(ctx) {
                    if (ctx.type !== 'data' || ctx.yStarted) {
                        return 0;
                    }
                    ctx.yStarted = true;
                    return ctx.index * delayBetweenPoints;
                }
            }
        };
        const config = {
            type: 'line',
            data: data,
            options: {
                plugins: {
                    title: {
                        text: 'How are you feeling?',
                        display: true,
                        font: {
                            size: 24
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                        },
                        title: {
                            display: false,
                            text: 'Date'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Rating',
                            font: {
                                size: 20
                            }
                        }
                    }
                },
                animation
            },
        };
    
        var chart2 = new Chart(
            document.getElementById('chart1'),
            config
        );
    }

var drawChart2 = function (json) {
    var labels = new Set();
    var dataPoints = [];
    for (i = 0; i < json.documents.length; i++) {
        var dataPoint = { x: new Date(json.documents[i].Date), y: json.documents[i].avgRating };
        dataPoints.push(dataPoint);
        labels.add(dataPoint.x);
    }

    var sortedLabels = Array.from(labels).sort((a, b) => a - b)
    dataPoints.sort((a, b) => a.x - b.x)

    const data = {
        labels: sortedLabels,
        datasets: [{
            label: 'Average rating',
            backgroundColor: '#eb7636',
            borderColor: '#eb76367F',
            fill: false,
            data: dataPoints
        }]
    };

    const totalDuration = 5000;
    const delayBetweenPoints = totalDuration / dataPoints.length;
    const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    const animation = {
        x: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: NaN, // the point is initially skipped
            delay(ctx) {
                if (ctx.type !== 'data' || ctx.xStarted) {
                    return 0;
                }
                ctx.xStarted = true;
                return ctx.index * delayBetweenPoints;
            }
        },
        y: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: previousY,
            delay(ctx) {
                if (ctx.type !== 'data' || ctx.yStarted) {
                    return 0;
                }
                ctx.yStarted = true;
                return ctx.index * delayBetweenPoints;
            }
        }
    };
    const config = {
        type: 'line',
        data: data,
        options: {
            plugins: {
                title: {
                    text: 'How connected do you feel to your team?',
                    display: true,
                    font: {
                        size: 24
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                    },
                    title: {
                        display: false,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Rating',
                        font: {
                            size: 20
                        }
                    }
                }
            },
            animation
        },
    };

    var chart1 = new Chart(
        document.getElementById('chart2'),
        config
    );
}

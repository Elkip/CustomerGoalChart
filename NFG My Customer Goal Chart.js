/**
 * @NApiVersion 2.1
 * @NScriptType suitelet
 * @copyright 2020 National Food Group
 * @author Mitchell Henschel
 */
define(['N/ui/serverWidget','N/search','N/runtime'], function(serverWidget,search,runtime){
    var exports = {onRequest: onRequest};
    function onRequest(context) {
        /**************************Start Projection Logic*******************************/
        log.debug('Current Script', runtime.getCurrentScript().deploymentId)

        var response = context.response;


        let user = runtime.getCurrentUser().id;
        log.debug('User', typeof user + ' | ' + user)
        user = user === 256030 ? 28 : user;



        var goal_filters = [
            ["firstorderdate", "within", "lastfiscalyear"],
            "AND",
            ["salesrep", "anyof", user]
        ];
        var columns = [
            search.createColumn({
                name: "formulanumeric_1",
                summary: "SUM",
                formula: "CASE WHEN to_char({firstorderdate}, 'MM') = '01' THEN 1 ELSE 0 END",
                label: "Jan"
            }),
            search.createColumn({
                name: "formulanumeric_2",
                summary: "SUM",
                formula: "CASE WHEN to_char({firstorderdate}, 'MM') = '02' THEN 1 ELSE 0 END",
                label: "Feb"
            }),
            search.createColumn({
                name: "formulanumeric_3",
                summary: "SUM",
                formula: "CASE WHEN to_char({firstorderdate}, 'MM') = '03' THEN 1 ELSE 0 END",
                label: "Mar"
            }),
            search.createColumn({
                name: "formulanumeric_4",
                summary: "SUM",
                formula: "CASE WHEN to_char({firstorderdate}, 'MM') = '04' THEN 1 ELSE 0 END",
                label: "Apr"
            }),
            search.createColumn({
                name: "formulanumeric_5",
                summary: "SUM",
                formula: "CASE WHEN to_char({firstorderdate}, 'MM') = '05' THEN 1 ELSE 0 END",
                label: "May"
            }),
            search.createColumn({
                name: "formulanumeric_6",
                summary: "SUM",
                formula: "CASE WHEN to_char({firstorderdate}, 'MM') = '06' THEN 1 ELSE 0 END",
                label: "Jun"
            }),
            search.createColumn({
                name: "formulanumeric_7",
                summary: "SUM",
                formula: "CASE WHEN to_char({firstorderdate}, 'MM') = '07' THEN 1 ELSE 0 END",
                label: "Jul"
            }),
            search.createColumn({
                name: "formulanumeric_8",
                summary: "SUM",
                formula: "CASE WHEN to_char({firstorderdate}, 'MM') = '08' THEN 1 ELSE 0 END",
                label: "Aug"
            }),
            search.createColumn({
                name: "formulanumeric_9",
                summary: "SUM",
                formula: "CASE WHEN to_char({firstorderdate}, 'MM') = '09' THEN 1 ELSE 0 END",
                label: "Sep"
            }),
            search.createColumn({
                name: "formulanumeric_10",
                summary: "SUM",
                formula: "CASE WHEN to_char({firstorderdate}, 'MM') = '10' THEN 1 ELSE 0 END",
                label: "Oct"
            }),
            search.createColumn({
                name: "formulanumeric_11",
                summary: "SUM",
                formula: "CASE WHEN to_char({firstorderdate}, 'MM') = '11' THEN 1 ELSE 0 END",
                label: "Nov"
            }),
            search.createColumn({
                name: "formulanumeric_12",
                summary: "SUM",
                formula: "CASE WHEN to_char({firstorderdate}, 'MM') = '12' THEN 1 ELSE 0 END",
                label: "Dec"
            }),
            search.createColumn({
                name: "internalid",
                summary: "COUNT",
                label: "Total"
            })
        ];
        var goalSearchObj = search.create({
            type: "customer",
            filters: goal_filters,
            columns: columns
        });

        var projectedCustomers = new Array();
        var total;
        goalSearchObj.run().each(function (result) {
            projectedCustomers.push(result.getValue({
                name: 'formulanumeric_1',
                summary: search.Summary.SUM
            }));
            projectedCustomers.push(result.getValue({
                name: 'formulanumeric_2',
                summary: search.Summary.SUM
            }));
            projectedCustomers.push(result.getValue({
                name: 'formulanumeric_3',
                summary: search.Summary.SUM
            }));
            projectedCustomers.push(result.getValue({
                name: 'formulanumeric_4',
                summary: search.Summary.SUM
            }));
            projectedCustomers.push(result.getValue({
                name: 'formulanumeric_5',
                summary: search.Summary.SUM
            }));
            projectedCustomers.push(result.getValue({
                name: 'formulanumeric_6',
                summary: search.Summary.SUM
            }));
            projectedCustomers.push(result.getValue({
                name: 'formulanumeric_7',
                summary: search.Summary.SUM
            }));
            projectedCustomers.push(result.getValue({
                name: 'formulanumeric_8',
                summary: search.Summary.SUM
            }));
            projectedCustomers.push(result.getValue({
                name: 'formulanumeric_9',
                summary: search.Summary.SUM
            }));
            projectedCustomers.push(result.getValue({
                name: 'formulanumeric_10',
                summary: search.Summary.SUM
            }));
            projectedCustomers.push(result.getValue({
                name: 'formulanumeric_11',
                summary: search.Summary.SUM
            }));
            projectedCustomers.push(result.getValue({
                name: 'formulanumeric_12',
                summary: search.Summary.SUM
            }));
            total = result.getValue({
                name: 'internalid',
                summary: search.Summary.COUNT
            });
        });

        log.debug(typeof projectedCustomers, projectedCustomers);
        log.debug('Total', total);

        var gData = buildGData(projectedCustomers);
        log.debug("gData", gData);

        var act_filters = [
            ["firstorderdate", "within", "thisyear"],
            "AND",
            ["salesrep", "anyof", user]
        ];

        var actSearchObj = search.create({
            type: "customer",
            filters: act_filters,
            columns: columns
        });

        var actualCustomers = new Array();
        var total2;
        actSearchObj.run().each(function (result) {
            actualCustomers.push(result.getValue({
                name: 'formulanumeric_1',
                summary: search.Summary.SUM
            }));
            actualCustomers.push(result.getValue({
                name: 'formulanumeric_2',
                summary: search.Summary.SUM
            }));
            actualCustomers.push(result.getValue({
                name: 'formulanumeric_3',
                summary: search.Summary.SUM
            }));
            actualCustomers.push(result.getValue({
                name: 'formulanumeric_4',
                summary: search.Summary.SUM
            }));
            actualCustomers.push(result.getValue({
                name: 'formulanumeric_5',
                summary: search.Summary.SUM
            }));
            actualCustomers.push(result.getValue({
                name: 'formulanumeric_6',
                summary: search.Summary.SUM
            }));
            actualCustomers.push(result.getValue({
                name: 'formulanumeric_7',
                summary: search.Summary.SUM
            }));
            actualCustomers.push(result.getValue({
                name: 'formulanumeric_8',
                summary: search.Summary.SUM
            }));
            actualCustomers.push(result.getValue({
                name: 'formulanumeric_9',
                summary: search.Summary.SUM
            }));
            actualCustomers.push(result.getValue({
                name: 'formulanumeric_10',
                summary: search.Summary.SUM
            }));
            actualCustomers.push(result.getValue({
                name: 'formulanumeric_11',
                summary: search.Summary.SUM
            }));
            actualCustomers.push(result.getValue({
                name: 'formulanumeric_12',
                summary: search.Summary.SUM
            }));
            total2 = result.getValue({
                name: 'internalid',
                summary: search.Summary.COUNT
            });
        });
        let today = dayofyear(new Date());
        let thisMonth = (new Date()).getMonth();
        actualCustomers = actualCustomers.slice(0, thisMonth + 1);
        actualCustomers.unshift(0);
        log.debug(typeof actualCustomers, actualCustomers);
        log.debug('Today', today);

        let aData = buildAData(today, gData, actualCustomers);
        let fillColor = actualCustomers[thisMonth + 1] >= projectedCustomers[thisMonth + 1] ? /*Green*/ 'rgba(175,189,33,.5)' : /*Red*/ 'rgba(181,18,27,.5)';
        log.debug('aData', aData);
        log.debug('fill color', fillColor);

        var myHTML = '<html lang="en"><head><title>Chart.js demo</title> <script src="https://3450792.app.netsuite.com/core/media/media.nl?id=16470552&c=3450792&h=9742d268b11975521eb1&_xt=.js"></script>\n' +
            '</head>\n' +
            '<body>\n' +
            '<div width="100%"><canvas id="myChart" width="450" height="450" style="height:450px !important;"></canvas></div>\n' +
            '\n' +
            '<script>\n' +
            'document.getElementById("myChart").style.width = (window.innerWidth - 10) + "px";\n' +
            'function fNumber(x) {\n' +
            '  return x.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",");\n' +
            '}\n' +
            'var ctx = document.getElementById("myChart").getContext(\'2d\');\n' +
            '\n' +
            'var myChart = new Chart(ctx, {\n' +
            '    type: \'line\',\n' +
            '    data: {\n' +
            '        //labels: Array.from({length:12},(_,index) => (index+1)%5 === 0 ? index+1 : \'\'),\n' +
            '        labels: Array.from({length:' + gData[gData.length-1].x + '},(_,index) => index+1),\n' +
            '        datasets: [{\n' +
            '            label: \'Goal\', // Name the series\n' +
            '            //data: x, // Specify the data values array\n' +
            '            data: ' + JSON.stringify(gData) + ',\n' +
            '            fill: false,\n' +
            '            borderColor: \'#50748A\', // Add custom color border (Line)\n' +
            '            backgroundColor: \'#50748A\', // Add custom color background (Points and Fill)\n' +
            '            borderWidth: 1, // Specify bar border width\n' +
            '         },\n' +
            '         {\n' +
            '            label: \'Actual\', // Name the series\n' +
            '            data: ' + JSON.stringify(aData) + ', // Specify the data values array\n' +
            '            fill: true,\n' +
            '            borderColor:  \'' + fillColor + '\', // Add custom color border (Line)\n' +
            '            backgroundColor: \'' + fillColor + '\', // Add custom color background (Points and Fill)\n' +
            '            borderWidth: 1 // Specify bar border width\n' +
            '         }]},\n' +
            'options: {\n' +
            '      responsive: true, // Instruct chart js to respond nicely.\n' +
            '      maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height\n' +
            '      tooltips: {\n' +
            '                                mode: \'label\',\n' +
            '                                callbacks: {\n' +
            '                                    title: function(tooltipItem, data) {\n' +
            '                                        //console.log(\'Title Callback\',tooltipItem, data)\n' +
            '                                        return data.datasets[0].data[tooltipItem[0].index].label;\n' +
            '                                    },\n' +
            '                                   /* afterTitle: function() { \n' +
            '                                        window.total = 0;\n' +
            '                                    },*/\n' +
            '                                    label: function(tooltipItem, data) {\n' +
            '                                      //console.log(\'tooltipItem\', tooltipItem)\n' +
            '                                      //console.log(\'data\', data)\n' +
            '                                      //window.total += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];\n' +
            '                                        console.log()\n' +
            '                                        return data.datasets[tooltipItem.datasetIndex].label + ": " + fNumber(tooltipItem.yLabel);\n' +
            '                                    },\n' +
            '                                    footer: function(tooltipItem, data) {\n' +
            '                                        console.log(\'Tool Tip\' , tooltipItem)\n' +
            '                                        console.log(\'Data\', data)\n' +
            '                                        return tooltipItem[1] ? `Difference: ${fNumber(tooltipItem[1].yLabel - tooltipItem[0].yLabel)}` : \'\';\n' +
            '                                   }\n' +
            '                                }\n' +
            '                            },\n' +
            '      scales: {\n' +
            '            yAxes: [{\n' +
            '                id:\'main-axis\',\n' +
            '                 ticks: {\n' +
            '                    autoSkip: true,\n' +
            '                    //maxTicksLimit: 12,\n' +
            '                    callback: function(value, index, values) {\n' +
            '                        return fNumber(value);\n' +
            '                    }\n' +
            '                },\n' +
            '                scaleLabel: {\n' +
            '                display: true,\n' +
            '                labelString: \'' + "New Customers" + ' \'\n' +
            '              }\n' +
            '            }],\n' +
            '            xAxes: [{\n' +
            '                id: \'main-x-axis\',\n' +
            '                ticks: {\n' +
            '                    autoSkip: true,\n' +
            '                    //maxTicksLimit: 12,\n' +
            '                    callback: function(value, index, values) {\n' +
            '                        return value % 5 === 0 ? value : \'\';\n' +
            '                    }\n' +
            '                },\n' +
            '                scaleLabel: {\n' +
            '                display: true,\n' +
            '                labelString: \'Day of the Year\'\n' +
            '              }\n' +
            '            }]\n' +
            '            \n' +
            '        }\n' +
            '    }\n' +
            '});\n' +
            '</script>' +
            '</body>\n' +
            '</html>';

        var form = serverWidget.createForm({
            title: ' ',
            hideNavBar: true
        });

        var htmlHeader = form.addField({
            id: 'custpage_header',
            type: serverWidget.FieldType.INLINEHTML,
            label: ' '
        }).updateLayoutType({
            layoutType: serverWidget.FieldLayoutType.OUTSIDEABOVE
        }).updateBreakType({
            breakType: serverWidget.FieldBreakType.STARTROW
        }).defaultValue = myHTML;

        response.writePage(form);
    }

    const monthsMap = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];


    function dayofyear(d) {   // d is a Date object\n' +
        var yn = d.getFullYear();
        var mn = d.getMonth();
        var dn = d.getDate();
        var d1 = new Date(yn,0,1,12,0,0); // noon on Jan. 1\n' +
        var d2 = new Date(yn,mn,dn,12,0,0); // noon on input date\n' +
        var ddiff = Math.round((d2-d1)/864e5);
        return ddiff+1;
    }


    function buildGData(arr){
        let goalData = [
            {
                x : 0,
                y : 0,
                label: 'January 1st'
            }
        ];
        let monthBuild = Array.from({length:12}).map((_,index)=> getDays(index));
        let monthDays = monthBuild;
        monthBuild = monthBuild.map((a,index)=> monthBuild.slice(0,index+1).reduce((a,b)=>a+b),0);
        let sum = 0;
        for(let i = 0; i < monthBuild.length; i++){
            sum += parseInt(arr[i]);
            goalData.push(
                {
                    x : monthBuild[i],
                    y : sum,
                    label: monthsMap[i] +  ' '  + getDayString(monthDays[i])
                }
            );

        }
        return goalData
    }


    function buildAData(today, gData, revArray){
        let r = [{
            x : 0,
            y : 0,
            label: 'January 1st'
        }];
        let monthDays = Array.from({length:12}).map((_,index)=> getDays(index));
        let date = new Date();
        let todayNum = revArray.pop();
        for(let i=0;i<revArray.length-1;i++){
            r.push(
                {
                    x : gData[i+1].x,
                    y: revArray[i+1],
                    label: monthsMap[i] +  ' '  + getDayString(monthDays[i])
                }
            )
        }

        r.push({
            x: today,
            y: todayNum,
            label: monthsMap[date.getMonth()] + ' ' + getDayString(date.getDate())
        });
        return r
    }


    function getDays(index){
        return new Date(2020,index+1,0).getDate()
    }


    function getDayString(d){
        if (d > 3 && d < 21) {
            return d + 'th';
        } else if (d % 10 === 1) {
            return d + 'st';
        } else if (d % 10 === 2) {
            return d + 'nd';
        } else if (d % 10 === 3) {
            return d + 'rd';
        } else {
            return d + 'th';
        }
    }

    return exports;
});


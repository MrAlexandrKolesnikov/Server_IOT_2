/**
 * Created by sasha on 27/06/2017.
 */
google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Время');
    data.addColumn('number', 'Температура');
    data.addRows([
        [new Date(2017, 6, 20, 0, 0), 17.5],
        [new Date(2017, 6, 20, 1, 0), 18],
        [new Date(2017, 6, 20, 2, 0), 19.5],
        [new Date(2017, 6, 20, 3, 0), 20],
        [new Date(2017, 6, 20, 4, 0), 20.5],
        [new Date(2017, 6, 20, 5, 0), 20.5],
        [new Date(2017, 6, 20, 6, 0), 20.5],
        [new Date(2017, 6, 20, 7, 0), 21],
        [new Date(2017, 6, 20, 8, 0), 22],
        [new Date(2017, 6, 20, 9, 0), 22],
        [new Date(2017, 6, 20, 10, 0), 22],
        [new Date(2017, 6, 20, 11, 0), 22.5],
        [new Date(2017, 6, 20, 12, 0), 23],
        [new Date(2017, 6, 20, 13, 0), 23.5],
        [new Date(2017, 6, 20, 14, 0), 23.5],
        [new Date(2017, 6, 20, 15, 0), 23.5],
        [new Date(2017, 6, 20, 16, 0), 23],
        [new Date(2017, 6, 20, 17, 0), 23],
        [new Date(2017, 6, 20, 18, 0), 21],
        [new Date(2017, 6, 20, 19, 0), 20.5],
        [new Date(2017, 6, 20, 20, 0), 20.5],
        [new Date(2017, 6, 20, 21, 0), 19],
        [new Date(2017, 6, 20, 22, 0), 18.5],
        [new Date(2017, 6, 20, 23, 0), 18]
    ]);
    var options = {
        chart: {
            title: 'Температурные показания датчика',
            subtitle: 'к градусах цельсия( С )'
        },
        width: 900,
        height: 500,
        axes: {
            x: {
                1: {side: 'dottom'}
            }
        },
        curveType: 'function'
    };
    var chart = new google.charts.Line(document.getElementById('line_top_x'));
    chart.draw(data, options);
}



/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 99.27142857142857, "KoPercent": 0.7285714285714285};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8385714285714285, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.975, 500, 1500, "partialUpdate"], "isController": false}, {"data": [0.98, 500, 1500, "updateBooking "], "isController": false}, {"data": [0.981, 500, 1500, "ping"], "isController": false}, {"data": [0.9735, 500, 1500, "deleteBooking"], "isController": false}, {"data": [0.989, 500, 1500, "getBooking"], "isController": false}, {"data": [0.0, 500, 1500, "login"], "isController": false}, {"data": [0.9715, 500, 1500, "creatBooking"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 7000, 51, 0.7285714285714285, 4075.795, 1, 65477, 283.0, 9100.600000000002, 32790.9, 58956.99, 101.51695333120631, 34.816165373836185, 31.326251015169536], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["partialUpdate", 1000, 15, 1.5, 322.6160000000003, 265, 6286, 284.0, 297.0, 309.94999999999993, 1221.96, 15.43448062972681, 6.277718759646549, 5.00337930718475], "isController": false}, {"data": ["updateBooking ", 1000, 12, 1.2, 311.4930000000005, 265, 8282, 285.0, 296.9, 305.0, 1155.2900000000006, 15.435910101259571, 6.2709590716843655, 7.521222567493516], "isController": false}, {"data": ["ping", 1000, 0, 0.0, 340.0929999999998, 264, 10293, 279.0, 285.0, 290.0, 1912.2200000000007, 15.436863229391788, 3.7386153133683235, 2.0652834594010496], "isController": false}, {"data": ["deleteBooking", 1000, 17, 1.7, 313.96099999999984, 266, 7285, 283.0, 296.0, 306.0, 1211.94, 15.434004198049143, 3.738947806056303, 4.671634928887825], "isController": false}, {"data": ["getBooking", 1000, 3, 0.3, 320.9539999999999, 265, 6313, 282.0, 289.0, 294.0, 1223.6300000000003, 15.436863229391788, 6.219563450331893, 2.8790202174668105], "isController": false}, {"data": ["login", 1000, 2, 0.2, 26575.023000000005, 1845, 65477, 21740.0, 58369.0, 59423.65, 64525.53, 15.06954595458039, 4.0011999125966335, 4.223593446254465], "isController": false}, {"data": ["creatBooking", 1000, 2, 0.2, 346.42499999999995, 1, 6300, 281.0, 290.0, 320.6499999999995, 1170.0, 15.440438508453639, 6.714464675171775, 6.87711702887362], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["503/Service Unavailable", 2, 3.9215686274509802, 0.02857142857142857], "isController": false}, {"data": ["403/Forbidden", 38, 74.50980392156863, 0.5428571428571428], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: restful-booker.herokuapp.com:443 failed to respond", 2, 3.9215686274509802, 0.02857142857142857], "isController": false}, {"data": ["404/Not Found", 9, 17.647058823529413, 0.12857142857142856], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 7000, 51, "403/Forbidden", 38, "404/Not Found", 9, "503/Service Unavailable", 2, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: restful-booker.herokuapp.com:443 failed to respond", 2, "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["partialUpdate", 1000, 15, "403/Forbidden", 13, "404/Not Found", 2, "", "", "", "", "", ""], "isController": false}, {"data": ["updateBooking ", 1000, 12, "403/Forbidden", 10, "404/Not Found", 2, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["deleteBooking", 1000, 17, "403/Forbidden", 15, "404/Not Found", 2, "", "", "", "", "", ""], "isController": false}, {"data": ["getBooking", 1000, 3, "404/Not Found", 3, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["login", 1000, 2, "503/Service Unavailable", 2, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["creatBooking", 1000, 2, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: restful-booker.herokuapp.com:443 failed to respond", 2, "", "", "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});

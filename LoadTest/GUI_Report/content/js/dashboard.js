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
    cell.colSpan = 6;
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

    var data = {"OkPercent": 93.21464321464322, "KoPercent": 6.785356785356785};
    var dataset = [
        {
            "label" : "KO",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "OK",
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.0, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "Update Task Request"], "isController": false}, {"data": [0.0, 500, 1500, "Get Task Request"], "isController": false}, {"data": [0.0, 500, 1500, "Add User Request"], "isController": false}, {"data": [0.0, 500, 1500, "Delete User Request"], "isController": false}, {"data": [0.0, 500, 1500, "Get Parent Task Request"], "isController": false}, {"data": [0.0, 500, 1500, "Update Project Request"], "isController": false}, {"data": [0.0, 500, 1500, "Add Project  Request"], "isController": false}, {"data": [0.0, 500, 1500, "Add Task Request"], "isController": false}, {"data": [0.0, 500, 1500, "End Task Request"], "isController": false}, {"data": [0.0, 500, 1500, "Add Parent Task Request"], "isController": false}, {"data": [0.0, 500, 1500, "Get Project Request"], "isController": false}, {"data": [0.0, 500, 1500, "Get User Request"], "isController": false}, {"data": [0.0, 500, 1500, "Update User Request"], "isController": false}, {"data": [0.0, 500, 1500, "Suspend Project Request"], "isController": false}, {"data": [0.0, 500, 1500, "Get Task By Project Request"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 13986, 949, 6.785356785356785, 21963.809380809304, 2667, 60224, 43126.40000000002, 49537.65, 53144.11999999998, 22.27055878624977, 2656.5075480585115, 6.850344815180317], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["Update Task Request", 841, 61, 7.253269916765755, 30405.411414982194, 3630, 55228, 48652.6, 50564.5, 53246.82000000001, 1.5598743197575424, 0.15363018841371356, 0.6550253491169369], "isController": false}, {"data": ["Get Task Request", 719, 39, 5.4242002781641165, 25613.32406119609, 3566, 54881, 45937.0, 49741.0, 53173.0, 1.5229985490208537, 883.1951423806383, 0.26176537561295926], "isController": false}, {"data": ["Add User Request", 1097, 71, 6.472196900638104, 15943.96991795809, 2667, 52971, 34434.4, 38190.6, 48626.88, 1.7538810814267671, 0.167267964490703, 0.5600772594009304], "isController": false}, {"data": ["Delete User Request", 1008, 36, 3.5714285714285716, 11795.116071428569, 2792, 53974, 31324.300000000007, 35665.75, 48815.899999999994, 1.6681340067652102, 0.14126078991440882, 0.5506145452017979], "isController": false}, {"data": ["Get Parent Task Request", 997, 71, 7.12136409227683, 18485.917753259786, 3415, 54254, 38454.2, 47617.399999999994, 51850.899999999994, 1.6735797652959652, 241.65896230186038, 0.29745265359752504], "isController": false}, {"data": ["Update Project Request", 986, 90, 9.127789046653144, 26013.25456389453, 4079, 54943, 48309.700000000004, 50571.4, 53559.33, 1.686441591138827, 0.17840138250581958, 0.690057643249188], "isController": false}, {"data": ["Add Project  Request", 996, 84, 8.433734939759036, 22393.428714859467, 3573, 54289, 46054.50000000001, 50353.95, 52805.87, 1.6785592703323076, 0.17274988160764182, 0.6474911247863882], "isController": false}, {"data": ["Add Task Request", 894, 79, 8.83668903803132, 31508.866890380345, 4406, 54640, 48999.5, 50644.75, 53245.149999999994, 1.6026129402928084, 0.16694059856428106, 0.6291507832008877], "isController": false}, {"data": ["End Task Request", 788, 70, 8.883248730964468, 28916.80076142131, 3636, 55219, 49067.8, 51438.549999999996, 53874.69, 1.554449117435869, 0.1621927657457016, 0.6497111545532734], "isController": false}, {"data": ["Add Parent Task Request", 1000, 46, 4.6, 14700.172000000002, 2883, 53117, 35739.2, 40967.2, 51165.14, 1.6763588145461006, 0.1486491533968897, 0.4370974643396572], "isController": false}, {"data": ["Get Project Request", 942, 97, 10.29723991507431, 35202.97664543524, 7782, 60224, 52028.5, 53892.149999999994, 56986.399999999994, 1.6386085395510004, 826.7245500077842, 0.286436453691044], "isController": false}, {"data": ["Get User Request", 1056, 45, 4.261363636363637, 13702.303030303026, 2773, 50542, 31386.80000000001, 36911.9, 43326.600000000006, 1.7009185926831507, 398.1453764052511, 0.29234538311741654], "isController": false}, {"data": ["Update User Request", 1031, 28, 2.7158098933074686, 11281.063045586803, 2855, 53567, 27855.0, 35393.4, 47382.79999999999, 1.6856375830147896, 0.13733454009969948, 0.5481614405702392], "isController": false}, {"data": ["Suspend Project Request", 973, 99, 10.174717368961973, 28950.853031860188, 4207, 54844, 49077.6, 50878.799999999996, 53045.12, 1.6799091157082724, 0.18435715744011547, 0.6873846869939123], "isController": false}, {"data": ["Get Task By Project Request", 658, 33, 5.015197568389058, 21807.265957446805, 3428, 53648, 38967.6, 46828.7, 51963.64999999999, 1.4562548136082365, 849.8440989174361, 0.3469982173050876], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Percentile 1
            case 8:
            // Percentile 2
            case 9:
            // Percentile 3
            case 10:
            // Throughput
            case 11:
            // Kbytes/s
            case 12:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500", 949, 100.0, 6.785356785356785], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 13986, 949, "500", 949, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["Update Task Request", 841, 61, "500", 61, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Get Task Request", 719, 39, "500", 39, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Add User Request", 1097, 71, "500", 71, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Delete User Request", 1008, 36, "500", 36, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Get Parent Task Request", 997, 71, "500", 71, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Update Project Request", 986, 90, "500", 90, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Add Project  Request", 996, 84, "500", 84, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Add Task Request", 894, 79, "500", 79, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["End Task Request", 788, 70, "500", 70, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Add Parent Task Request", 1000, 46, "500", 46, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Get Project Request", 942, 97, "500", 97, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Get User Request", 1056, 45, "500", 45, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Update User Request", 1031, 28, "500", 28, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Suspend Project Request", 973, 99, "500", 99, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Get Task By Project Request", 658, 33, "500", 33, null, null, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});

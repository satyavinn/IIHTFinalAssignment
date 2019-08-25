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

    var data = {"OkPercent": 98.52288038325266, "KoPercent": 1.4771196167473426};
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 20039, 296, 1.4771196167473426, 15520.272219172548, 2690, 62513, 31458.0, 38160.700000000004, 46187.95000000001, 31.174451852981168, 1423.0119595050264, 9.459066151979926], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["Update Task Request", 1156, 18, 1.5570934256055364, 21144.230103806203, 3631, 58528, 35823.09999999998, 41377.69999999999, 51055.24000000001, 2.0243553058772847, 0.15604245870735456, 0.8441403472750005], "isController": false}, {"data": ["Get Task Request", 1058, 7, 0.6616257088846881, 15897.969754253312, 3312, 56012, 30753.7, 36347.7, 44731.68000000001, 1.9281201193320467, 418.55117507064153, 0.3257468560980899], "isController": false}, {"data": ["Add User Request", 1518, 13, 0.8563899868247694, 11177.87878787878, 2846, 52533, 22602.500000000004, 28462.399999999994, 39567.09999999997, 2.379903455563377, 0.1771846353558332, 0.7530163277368498], "isController": false}, {"data": ["Delete User Request", 1491, 13, 0.8718980549966465, 10460.08718980549, 2773, 54309, 21440.799999999996, 28302.999999999996, 42541.31999999996, 2.388221311711735, 0.17800162458314248, 0.7813028705306946], "isController": false}, {"data": ["Get Parent Task Request", 1466, 19, 1.296043656207367, 12883.899045020447, 3274, 55666, 29043.1, 34251.44999999997, 44259.78999999999, 2.3902031020466725, 116.86095325143437, 0.4178187063147992], "isController": false}, {"data": ["Update Project Request", 1410, 33, 2.3404255319148937, 18397.305673758852, 3418, 57868, 34892.20000000001, 41086.8, 50104.6100000002, 2.3358873472768686, 0.18702435804514392, 0.948954234831228], "isController": false}, {"data": ["Add Project  Request", 1441, 32, 2.220680083275503, 16036.522553782108, 3403, 55932, 33117.6, 38369.79999999999, 46641.87999999999, 2.358718336948071, 0.18763970874084382, 0.9029468633629333], "isController": false}, {"data": ["Add Task Request", 1219, 33, 2.7071369975389663, 22751.360131255133, 4008, 53201, 39868.0, 43361.0, 49061.2, 2.0690966246057854, 0.1681807358659823, 0.8062202668141684], "isController": false}, {"data": ["End Task Request", 1104, 18, 1.6304347826086956, 19194.710144927543, 3464, 56644, 34465.5, 41700.5, 46514.950000000026, 1.9720835849049863, 0.15245716657675587, 0.8184917222506047], "isController": false}, {"data": ["Add Parent Task Request", 1483, 18, 1.2137559002022926, 11636.188806473374, 3389, 58082, 25809.0, 32085.799999999967, 42677.640000000014, 2.403273508082486, 0.18226581807316775, 0.6195939513025158], "isController": false}, {"data": ["Get Project Request", 1297, 27, 2.081727062451812, 24722.418658442555, 4637, 62513, 42592.200000000004, 46153.59999999999, 51010.6, 2.1698179494300254, 444.38169696817295, 0.37293746005828565], "isController": false}, {"data": ["Get User Request", 1509, 9, 0.5964214711729622, 9607.737574552677, 2690, 56068, 19145.0, 24225.5, 40198.4, 2.383050494139496, 182.39717400897712, 0.4026052104356766], "isController": false}, {"data": ["Update User Request", 1499, 8, 0.533689126084056, 9397.4196130754, 2861, 55394, 19232.0, 23796.0, 40348.0, 2.394419516994948, 0.17545051855794927, 0.7716391021565749], "isController": false}, {"data": ["Suspend Project Request", 1359, 45, 3.3112582781456954, 21176.57027225898, 3889, 59539, 37944.0, 41769.0, 49732.00000000009, 2.2679445480048264, 0.18984120372533672, 0.9213524726269606], "isController": false}, {"data": ["Get Task By Project Request", 1029, 3, 0.2915451895043732, 13252.902818270151, 3305, 57151, 26435.0, 31224.0, 42531.60000000001, 1.9488008908804073, 437.83705117448864, 0.4586533346700958], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500", 296, 100.0, 1.4771196167473426], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 20039, 296, "500", 296, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["Update Task Request", 1156, 18, "500", 18, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Get Task Request", 1058, 7, "500", 7, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Add User Request", 1518, 13, "500", 13, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Delete User Request", 1491, 13, "500", 13, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Get Parent Task Request", 1466, 19, "500", 19, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Update Project Request", 1410, 33, "500", 33, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Add Project  Request", 1441, 32, "500", 32, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Add Task Request", 1219, 33, "500", 33, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["End Task Request", 1104, 18, "500", 18, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Add Parent Task Request", 1483, 18, "500", 18, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Get Project Request", 1297, 27, "500", 27, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Get User Request", 1509, 9, "500", 9, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Update User Request", 1499, 8, "500", 8, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Suspend Project Request", 1359, 45, "500", 45, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Get Task By Project Request", 1029, 3, "500", 3, null, null, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});

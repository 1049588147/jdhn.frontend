(function () {
    'use strict';
    angular
        .module('makeFriends')
        .filter('bookingNoteStatus', [function () {
            return function (value) {
                if (value == "10") {
                    return '待确认';
                } else if(value == "20"){
                    return '已确认，未装车';
                } else if(value == "30"){
                    return '已确认，部分装车';
                } else if(value == "40"){
                    return '已确认，全部装车';
                } else if(value == "50"){
                    return '部分在途';
                } else if(value == "60"){
                    return '全部在途';
                } else if(value == "70"){
                    return '部分交货';
                } else if(value == "80"){
                    return '全部交货';
                } else if(value == "99"){
                    return '已关闭';
                }
            };
        }])
        .filter('driverStatus', [function () {
            return function (value) {
                if (value == "Y") {
                    return '忙碌';
                } else if(value == "N"){
                    return '空闲';
                }
            };
        }])
        .filter('driverOwner', [function () {
            return function (value) {
                if (value == "Own_Driver") {
                    return '公司自有';
                } else if(value == "Carrier_Driver"){
                    return '第三方公司';
                } else if(value == "Social_Driver"){
                    return '社会';
                }
            };
        }])
        .filter('carStatus', [function () {
            return function (value) {
                if (value == "Free") {
                    return '空闲';
                } else if(value == "Scheduling"){
                    return '调度中';
                } else if(value == "OnWay"){
                    return '在途';
                }
            };
        }])
        .filter('carOwner', [function () {
            return function (value) {
                if (value == "Own_Car") {
                    return '公司自有';
                } else if(value == "Carrier_Car"){
                    return '第三方公司';
                } else if(value == "Social_Car"){
                    return '社会';
                }
            };
        }])
        .filter('carTempType', [function () {
            return function (value) {
                if (value == "CT") {
                    return '冷藏车';
                } else if(value == "NT"){
                    return '常温车';
                }
            };
        }]).filter('unitNum', [function () {
            return function (value) {
                if (parseFloat(value) % 10 == 0) {
                    return parseInt(value);
                } else {
                	return parseFloat(value).toFixed(3);
                }
            };
        }]).filter('unitName', [function () {
            return function (value) {
            	var num = parseInt(value);
                if (num < 100000) {
                    return "吨";
                } else if (num >= 100000) {
                    return "万吨";
                }
            };
        }]).filter('positiveNumber', [function () {
            return function (value) {
            	var num = parseInt(value);
                return Math.abs(num);
            }
        }]).filter('temperatureNum', [function () {
            return function (value) {
                return parseFloat(value).toFixed(1);
            }
        }]).filter('humidityNum', [function () {
            return function (value) {
                return parseInt(value);
            }
        }]);
 
})();
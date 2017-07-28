(function () {
    'use strict';
    angular
        .module('makeFriends')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .otherwise('/home');
        $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'homeControl',
            cache: false,
            data: {
                pageTitle: '活动'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/homeController.js',
                    "scripts/service/homeService.js"]);
                }]
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'loginControl',
             cache: false,
            data: {
                pageTitle: '登录'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/loginController.js']);
                }]
            }
        })
        .state('news', {
            url: '/news',
            templateUrl: 'views/news.html',
            controller: 'newsControl',
              cache: false,
            data: {
                pageTitle: '消息'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/newsController.js']);
                }]
            }
        })
        .state('my', {
            url: '/my',
            templateUrl: 'views/my.html',
            controller: 'myControl',
             cache: false,
            data: {
                pageTitle: '个人中心'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/myController.js']);
                }]
            }
        })
        .state('search', {
            url: '/search',
            templateUrl: 'views/search.html',
            controller: 'searchControl',
            cache: false,
            data: {
                pageTitle: '查询信息'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/searchContoller.js']);
                }]
            }
        })
        .state('activityScreening', {
            url: '/activityScreening',
            templateUrl: 'views/activityScreening.html',
            controller: 'activityScreeningControl',
            cache: false,
            data: {
                pageTitle: '活动筛选'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/activityScreeningContoller.js',"scripts/service/activityScreeningService.js"]);
                }]
            }
        })
        .state('myActivities', {
            url: '/myActivities',
            templateUrl: 'views/myActivities.html',
            controller: 'myActivitiesControl',
            cache: false,
            data: {
                pageTitle: '我的活动'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/myActivitiesController.js']);
                }]
            }
        })
      	.state('personalData', {
            url: '/personalData',
            templateUrl: 'views/personalData.html',
            controller: 'personalDataControl',
            cache: false,
            data: {
                pageTitle: '个人资料'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/personalDataContorller.js']);
                }]
            }
        })
      	.state('realNameAuthentication', {
            url: '/realNameAuthentication',
            templateUrl: 'views/realNameAuthentication.html',
            controller: 'realNameAuthenticationControl',
            cache: false,
            data: {
                pageTitle: '实名认证'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/realNameAuthenticationContorller.js']);
                }]
            }
        }).state('accountSettings', {
            url: '/accountSettings',
            templateUrl: 'views/accountSettings.html',
            controller: 'accountSettingsControl',
            cache: false,
            data: {
                pageTitle: '账号设置'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/accountSettingsContorller.js']);
                }]
            }
        }).state('modifyPassword', {
            url: '/modifyPassword/:id',
            templateUrl: 'views/modifyPassword.html',
            controller: 'modifyPasswordControl',
            cache: false,
            data: {
                pageTitle: '修改密码'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/modifyPasswordContorller.js']);
                }]
            }
        })
      	.state('detalis', {
            url: '/detalis',
            templateUrl: 'views/detalis.html',
            controller: 'detalisControl',
            cache: false,
            data: {
                pageTitle: '活动详情'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/detalisContorller.js']);
                }]
            }
        })
      	.state('JiaotongUniversityMatchmaker', {
            url: '/JiaotongUniversityMatchmaker',
            templateUrl: 'views/JiaotongUniversityMatchmaker.html',
            controller: 'JiaotongUniversityMatchmakerControl',
            cache: false,
            data: {
                pageTitle: '关于交大红娘'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/JiaotongUniversityMatchmakerContorller.js']);
                }]
            }
        })
      	.state('customerService', {
            url: '/customerService',
            templateUrl: 'views/customerService.html',
            controller: 'customerServiceControl',
            cache: false,
            data: {
                pageTitle: '联系客服'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/customerServiceContorller.js']);
                }]
            }
        })
      	
    }
})();

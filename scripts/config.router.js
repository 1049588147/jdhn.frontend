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
            templateUrl: 'views/home.html?v=4',
            controller: 'homeControl',
            cache: false,
            data: {
                pageTitle: '交大红娘'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/homeController.js?v=4',
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
                pageTitle: '交大红娘'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/loginController.js']);
                }]
            }
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.html?v=5',
            controller: 'registerControl',
            cache: false,
            data: {
                pageTitle: '交大红娘-注册'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/registerController.js?v=5']);
                }]
            }
        })
        .state('news', {
            url: '/news',
            templateUrl: 'views/news.html?v=1',
            controller: 'newsControl',
              cache: false,
            data: {
                pageTitle: '交大红娘-消息'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/newsController.js?v=1']);
                }]
            }
        })
        .state('my', {
            url: '/my',
            templateUrl: 'views/my.html?v=12',
            controller: 'myControl',
             cache: false,
            data: {
                pageTitle: '交大红娘-个人中心'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/myController.js?v=12']);
                }]
            }
        })
        .state('search', {
            url: '/search',
            templateUrl: 'views/search.html',
            controller: 'searchControl',
            cache: false,
            data: {
                pageTitle: '交大红娘-查询信息'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/searchContoller.js','scripts/service/searchService.js']);
                }]
            }
        })
        .state('activityScreening', {
            url: '/activityScreening',
            templateUrl: 'views/activityScreening.html',
            controller: 'activityScreeningControl',
            cache: false,
            data: {
                pageTitle: '交大红娘-活动筛选'
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
                pageTitle: '交大红娘-我的活动'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/myActivitiesController.js']);
                }]
            }
        })
      	.state('personalData', {
            url: '/personalData',
            templateUrl: 'views/personalData.html?v=3',
            controller: 'personalDataControl',
            cache: false,
            data: {
                pageTitle: '交大红娘-个人资料'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/personalDataContorller.js?v=3']);
                }]
            }
        })
      	.state('realNameAuthentication', {
            url: '/realNameAuthentication',
            templateUrl: 'views/realNameAuthentication.html?v=1',
            controller: 'realNameAuthenticationControl',
            cache: false,
            data: {
                pageTitle: '交大红娘-实名认证'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/realNameAuthenticationContorller.js?v=2']);
                }]
            }
        }).state('accountSettings', {
            url: '/accountSettings',
            templateUrl: 'views/accountSettings.html',
            controller: 'accountSettingsControl',
            cache: false,
            data: {
                pageTitle: '交大红娘-账号设置'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/accountSettingsContorller.js']);
                }]
            }
        }).state('modifyPassword', {
            url: '/modifyPassword/:uid/:token',
            templateUrl: 'views/modifyPassword.html?v=5',
            controller: 'modifyPasswordControl',
            cache: false,
            data: {
                pageTitle: '交大红娘-修改密码'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/modifyPasswordContorller.js?v=4']);
                }]
            }
        })
        .state('forgotpassword', {
            url: '/forgotpassword/:uid/:token',
            templateUrl: 'views/forgotpassword.html?v=5',
            controller: 'forgotpasswordControl',
            cache: false,
            data: {
                pageTitle: '交大红娘-修改密码'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/forgotpasswordContorller.js?v=4']);
                }]
            }
        })
      	.state('detalis', {
            url: '/detalis',
            templateUrl: 'views/detalis.html?v=16',
            controller: 'detalisControl',
            cache: false,
            data: {
                pageTitle: '交大红娘-活动详情'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/detalisContorller.js?v=16','scripts/service/detalisService.js?v=16']);
                }]
            }
        })
      	.state('eventRegistration', {
            url: '/eventRegistration',
            templateUrl: 'views/eventRegistration.html?v=1',
            controller: 'eventRegistrationControl',
            cache: false,
            data: {
                pageTitle: '交大红娘-活动报名'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/eventRegistrationContorller.js?v=1','scripts/service/eventRegistrationService.js']);
                }]
            }
        })
      	.state('JiaotongUniversityMatchmaker', {
            url: '/JiaotongUniversityMatchmaker',
            templateUrl: 'views/JiaotongUniversityMatchmaker.html?v=1',
            controller: 'JiaotongUniversityMatchmakerControl',
            cache: false,
            data: {
                pageTitle: '交大红娘-关于交大红娘'
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
                pageTitle: '交大红娘-联系客服'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/customerServiceContorller.js']);
                }]
            }
        })
      	.state('law', {
            url: '/law',
            templateUrl: 'views/law.html',
            cache: false,
            data: {
                pageTitle: '交大红娘-法律条款'
            }
            
        })
      	.state('evaluate', {
            url: '/evaluate',
            templateUrl: 'views/evaluate.html',
            controller: 'evaluateControl',
            cache: false,
            data: {
                pageTitle: '交大红娘-评价'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/evaluateController.js']);
                }]
            }
        }).state('evaluationdisplay', {
            url: '/evaluationdisplay',
            templateUrl: 'views/evaluationdisplay.html',
            controller: 'evaluationdisplayControl',
            cache: false,
            data: {
                pageTitle: '交大红娘-评价列表'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/evaluationdisplayController.js']);
                }]
            }
        }).state('homepage', {
            url: '/homepage',
            templateUrl: 'views/homepage.html?v=1',
            controller: 'homepageControl',
            cache: false,
            data: {
                pageTitle: '交大红娘-个人主页'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/homepageController.js?v=1']);
                }]
            }
        })
        .state('homepagebian', {
            url: '/homepagebian',
            templateUrl: 'views/homepagebian.html?v=4',
            controller: 'homepagebianControl',
            cache: false,
            data: {
                pageTitle: '交大红娘-个人主页编辑'
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['scripts/controllers/homepagebianController.js?v=1']);
                }]
            }
        })
            .state('goodKu', {
                url: '/goodKu',
                templateUrl: 'views/goodKu.html?v=1',
                controller: 'goodKuControl',
                cache: false,
                data: {
                    pageTitle: '交大红娘-优库'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/goodKuController.js?v=1']);
                    }]
                }
            })


            .state('goodKu02', {
                url: '/goodKu02',
                templateUrl: 'views/goodKu02.html?v=1',
                controller: 'goodKu02Control',
                cache: false,
                data: {
                    pageTitle: '交大红娘-优库'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/goodKu02Controller.js?v=1']);
                    }]
                }
            })
            .state('buyDetails', {
                url: '/buyDetails',
                templateUrl: 'views/buyDetails.html?v=1',
                controller: 'buyDetailsControl',
                cache: false,
                data: {
                    pageTitle: '交大红娘-优库'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/buyDetailsController.js?v=1']);
                    }]
                }
            })

            .state('memberDetail', {
                url: '/memberDetail',
                templateUrl: 'views/memberDetail.html?v=1',
                controller: 'memberDetailControl',
                cache: false,
                data: {
                    pageTitle: '交大红娘-优库'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/memberDetailController.js?v=1']);
                    }]
                }
            })
            .state('whoLoveMe', {
                url: '/whoLoveMe',
                templateUrl: 'views/whoLoveMe.html?v=1',
                controller: 'whoLoveMeControl',
                cache: false,
                data: {
                    pageTitle: '交大红娘-优库'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/whoLoveMeController.js?v=1']);
                    }]
                }
            })

            .state('UhomePage', {
                url: '/UhomePage',
                templateUrl: 'views/UhomePage.html?v=1',
                controller: 'UhomePageControl',
                cache: false,
                data: {
                    pageTitle: '交大红娘-优库'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/UhomePageController.js?v=1']);
                    }]
                }
            })

            .state('MyFile', {
                url: '/MyFile',
                templateUrl: 'views/MyFile.html?v=1',
                controller: 'MyFileControl',
                cache: false,
                data: {
                    pageTitle: '交大红娘-优库我的主页'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/MyFileController.js?v=1']);
                    }]
                }
            })

            .state('chatDetails', {
                url: '/chatDetails',
                templateUrl: 'views/chatDetails.html?v=1',
                controller: 'chatDetailsControl',
                cache: false,
                data: {
                    pageTitle: '交大红娘-聊天详情'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/chatDetailsController.js?v=1']);
                    }]
                }
            })
            .state('sharePage', {
                url: '/sharePage',
                templateUrl: 'views/sharePage.html?v=1',
                controller: 'sharePageControl',
                cache: false,
                data: {
                    pageTitle: '交大红娘'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['scripts/controllers/sharePageController.js?v=1']);
                    }]
                }
            })






    }
})();

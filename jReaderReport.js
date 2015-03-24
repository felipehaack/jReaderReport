/*! API FOR PAGE READER REPORT TO GOOGLE ANALYTICS (with multitracker) API 1.3.7 (c) 2014 
 */
var jReaderReport = {
    reportWebReader: new Array(),
    currentPosition: {
        analytics: '',
        issue: ''
    },
    configuration: {
        auxArray: new Array(),
        multiTracker: function(idAnalytics, nameTracker) {

            for (var i = 0; i < jReaderReport.configuration.auxArray.length; ++i)
                if (nameTracker === jReaderReport.configuration.auxArray[i])
                    return;

            ga('create', idAnalytics, 'auto', {'name': nameTracker});

            jReaderReport.configuration.auxArray.push(nameTracker);
        },
        init: function() {

            for (var i = 0; i < jReaderReport.reportWebReader.length; ++i)
                for (var j = 0; j < jReaderReport.reportWebReader[i].ids.length; ++j) {

                    var id = jReaderReport.reportWebReader[i].ids[j];
                    jReaderReport.reportWebReader[i].ids[j] = jReaderReport.utility.replaceNameTracker(id);

                    jReaderReport.configuration.multiTracker(id, jReaderReport.reportWebReader[i].ids[j]);
                }
        }
    },
    utility: {
        random: function() {

            return Math.floor(Math.random() * (2000 - 100 + 1) + 100).toString();
        },
        replaceNameTracker: function(tracker) {

            tracker = tracker.replace('-', '');
            tracker = tracker.replace('-', '');

            return tracker;
        },
        milisecondsToSeconds: function(v) {

            return (v < 1000) ? 1 : parseInt(v / 1000);
        }
    },
    error: {
        initApi: 'error: some parameters are incorrect. The API can\'t start!',
        array: 'error: function need an array!',
        arrayIndex: 'error: the page number doesn\'t exist into array: ',
        interactivity: 'error: the parameter need a number page with typeof Number',
        interactivityFilenameExist: 'error: the filename parameter doesn\'t is a string',
        interactivityFilenameNeed: 'error: the filename is empty',
        social: 'error: some parameter isn\'t a string',
        socialExist: 'there\'s any support to social network: ',
        socialAction: 'the social network action is wrong: '
    },
    date: {
        milissegundos: function() {

            return (new Date().getTime());
        }
    },
    struct: {
        analytics: function(idsAnalytics) {

            this.ids = (typeof idsAnalytics === 'undefined') ? new Array() : idsAnalytics;
            this.issues = new Array();
        },
        issue: function(id, idTitle, time) {

            this.id = (typeof id === 'undefined') ? '' : id;
            this.idTitle = (typeof idTitle === 'undefined') ? '' : idTitle;
            this.time = (typeof time === 'undefined') ? jReaderReport.date.milissegundos() : time;
            this.view = 1;
            this.pages = new Array();
        },
        page: function(idPage, time, timestamp, view) {

            this.id = (typeof idPage === 'undefined') ? '' : idPage;
            this.time = (typeof time === 'undefined') ? 0 : time;
            this.timestamp = (typeof timestamp === 'undefined') ? 0 : timestamp;
            this.view = (typeof view === 'undefined') ? 0 : view;
            this.interactivities = new Array();
        },
        interactivity: function(idInteractivity, view, filename) {

            this.id = (typeof idInteractivity === 'undefined') ? '' : idInteractivity;
            this.view = (typeof view === 'undefined') ? 1 : view;
            this.filename = (typeof filename === 'undefined') ? '' : filename;
        }
    },
    internet: {
        access: true,
        timeStart: '',
        timeout: 3000,
        timeoutMax: 7000,
        src: 'http://g42.org/temp/png/1x1.png',
        recursive: function() {

            var time = jReaderReport.date.milissegundos() - jReaderReport.internet.timeStart;

            if (time > jReaderReport.internet.timeout)
                jReaderReport.internet.init();
            else
                window.setTimeout("jReaderReport.internet.init()", jReaderReport.internet.timeout - time);
        },
        init: function() {

            var image = new Image();

            image.onload = function() {

                jReaderReport.internet.access = true;
                jReaderReport.internet.recursive();
            };

            image.onerror = function() {

                jReaderReport.internet.access = false;
                jReaderReport.internet.recursive();
            };

            image.src = jReaderReport.internet.src + "?noCache=" + jReaderReport.utility.random();

            jReaderReport.internet.timeStart = jReaderReport.date.milissegundos();

            window.setTimeout(function() {

                var time = jReaderReport.date.milissegundos() - jReaderReport.internet.timeStart;

                if (time > jReaderReport.internet.timeoutMax)
                    jReaderReport.internet.access = false;
            }, jReaderReport.internet.timeoutMax);
        }
    },
    storage: {
        exist: function() {

            return typeof localStorage !== 'undefined' ? true : false;
        },
        struct: {
            set: {
                webReader: function() {

                    if (jReaderReport.storage.exist())
                        localStorage.magtabReportWebReader = '[]';
                }
            },
            get: {
                webReader: function() {

                    return jReaderReport.storage.exist() ? localStorage.magtabReportWebReader : '[]';
                }
            },
            save: {
                webReader: function() {

                    if (jReaderReport.storage.exist())
                        localStorage.magtabReportWebReader = JSON.stringify(jReaderReport.reportWebReader);
                }
            },
            load: {
                webReader: function() {

                    var report = jReaderReport.storage.struct.get.webReader();

                    if ((typeof report) === 'string') {

                        jReaderReport.reportWebReader = JSON.parse(report);

                        jReaderReport.storage.struct.set.webReader();
                    }
                }
            }
        }
    },
    send: {
        social: {
            view: function(nameTracker, social, action, target) {

                console.log('VIEW SOCIAL: ' + social + ' - ' + action + ' - ' + target);

                ga(nameTracker + '.send', 'social', {
                    'socialNetwork': social,
                    'socialAction': action,
                    'socialTarget': target
                });
            }
        },
        title: {
            view: function(nameTracker, idTitle) {

                console.log('VIEW TITLE: ' + idTitle);

                ga(nameTracker + '.send', 'event', 'title/' + idTitle, 'title_view', 'views', 1);
            },
            timeReading: function(nameTracker, idTitle, time) {

                console.log('TIMEREADING TITLE: ' + idTitle + ' - ' + jReaderReport.utility.milisecondsToSeconds(time));

                ga(nameTracker + '.send', 'event', 'title/' + idTitle, 'title_timeread', 'timeread', jReaderReport.utility.milisecondsToSeconds(time));
            }
        },
        issue: {
            view: function(nameTracker, idTitle, idIssue) {

                console.log('VIEW ISSUE: ' + idIssue);

                ga(nameTracker + '.send', 'event', 'title/' + idTitle + '/issue/' + idIssue, 'issue_view', 'views', 1);
            },
            timeReading: function(nameTracker, idTitle, idIssue, time) {

                console.log('TIMEREADING ISSUE: ' + idIssue + ' - ' + jReaderReport.utility.milisecondsToSeconds(time));

                ga(nameTracker + '.send', 'event', 'title/' + idTitle + '/issue/' + idIssue, 'issue_timeread', 'timeread', jReaderReport.utility.milisecondsToSeconds(time));
            }
        },
        page: {
            view: function(nameTracker, idTitle, idIssue, idPage, pageView) {

                console.log('VIEW PAGE: ' + idIssue + ' - ' + idPage + ' - ' + pageView);

                ga(nameTracker + '.send', 'event', 'title/' + idTitle + '/issue/' + idIssue + '/page/' + idPage, 'page_view', 'views', pageView);
            },
            timeReading: function(nameTracker, idTitle, idIssue, idPage, time) {

                console.log('TIMEREADING PAGE: ' + idIssue + ' - ' + idPage + ' - ' + jReaderReport.utility.milisecondsToSeconds(time));

                ga(nameTracker + '.send', 'event', 'title/' + idTitle + '/issue/' + idIssue + '/page/' + idPage, 'page_timeread', 'timeread', jReaderReport.utility.milisecondsToSeconds(time));
            }
        },
        interactivity: {
            view: function(nameTracker, idTitle, idIssue, idPage, idInteractivity, interactivityView, interactivityFilename) {

                console.log('VIEW INTERACTIVITY: ' + idIssue + ' - ' + idPage + ' - ' + idInteractivity + ' - ' + interactivityView);

                ga(nameTracker + '.send', 'event', 'title/' + idTitle + '/issue/' + idIssue + '/page/' + idPage + '/interactivity/' + idInteractivity, 'interactivity_view', interactivityFilename, interactivityView);
            }
        }
    },
    report: {
        start: {
            current: function() {

                var i = jReaderReport.currentPosition.analytics;
                var j = jReaderReport.currentPosition.issue;

                for (var m = 0; m < jReaderReport.reportWebReader[i].ids.length; ++m) {

                    var nameTracker = jReaderReport.reportWebReader[i].ids[m];

                    for (var k = 0; k < jReaderReport.reportWebReader[i].issues[j].pages.length; ++k) {

                        for (var l = 0; l < jReaderReport.reportWebReader[i].issues[j].pages[k].interactivities.length; ++l) {

                            if (jReaderReport.reportWebReader[i].issues[j].pages[k].interactivities[l].view > 0) {

                                jReaderReport.send.interactivity.view(nameTracker, jReaderReport.reportWebReader[i].issues[j].idTitle, jReaderReport.reportWebReader[i].issues[j].id, jReaderReport.reportWebReader[i].issues[j].pages[k].id, jReaderReport.reportWebReader[i].issues[j].pages[k].interactivities[l].id, jReaderReport.reportWebReader[i].issues[j].pages[k].interactivities[l].view, jReaderReport.reportWebReader[i].issues[j].pages[k].interactivities[l].filename);

                                if (m >= jReaderReport.reportWebReader[i].ids.length - 1)
                                    jReaderReport.reportWebReader[i].issues[j].pages[k].interactivities[l].view = 0;
                            }
                        }

                        if (jReaderReport.reportWebReader[i].issues[j].pages[k].view > 0)
                            jReaderReport.send.page.view(nameTracker, jReaderReport.reportWebReader[i].issues[j].idTitle, jReaderReport.reportWebReader[i].issues[j].id, jReaderReport.reportWebReader[i].issues[j].pages[k].id, jReaderReport.reportWebReader[i].issues[j].pages[k].view);

                        if (jReaderReport.reportWebReader[i].issues[j].pages[k].time > 0)
                            jReaderReport.send.page.timeReading(nameTracker, jReaderReport.reportWebReader[i].issues[j].idTitle, jReaderReport.reportWebReader[i].issues[j].id, jReaderReport.reportWebReader[i].issues[j].pages[k].id, jReaderReport.reportWebReader[i].issues[j].pages[k].time);

                        if (m >= jReaderReport.reportWebReader[i].ids.length - 1)
                            jReaderReport.reportWebReader[i].issues[j].pages[k].view = jReaderReport.reportWebReader[i].issues[j].pages[k].time = jReaderReport.reportWebReader[i].issues[j].pages[k].timestamp = 0;
                    }

                    if (jReaderReport.reportWebReader[i].issues[j].view > 0) {

                        jReaderReport.send.issue.view(nameTracker, jReaderReport.reportWebReader[i].issues[j].idTitle, jReaderReport.reportWebReader[i].issues[j].id);
                        jReaderReport.send.title.view(nameTracker, jReaderReport.reportWebReader[i].issues[j].idTitle);

                        if (m >= jReaderReport.reportWebReader[i].ids.length - 1)
                            jReaderReport.reportWebReader[i].issues[j].view = 0;
                    }

                    jReaderReport.send.issue.timeReading(nameTracker, jReaderReport.reportWebReader[i].issues[j].idTitle, jReaderReport.reportWebReader[i].issues[j].id, jReaderReport.reportWebReader[i].issues[j].time);
                    jReaderReport.send.title.timeReading(nameTracker, jReaderReport.reportWebReader[i].issues[j].idTitle, jReaderReport.reportWebReader[i].issues[j].time);
                }
            },
            storage: function() {

                for (var i = 0; i < jReaderReport.reportWebReader.length - 1; ++i) {

                    for (var m = 0; m < jReaderReport.reportWebReader[i].ids.length; ++m) {

                        var nameTracker = jReaderReport.reportWebReader[i].ids[m];

                        for (var j = 0; j < jReaderReport.reportWebReader[i].issues.length; ++j) {

                            for (var k = 0; k < jReaderReport.reportWebReader[i].issues[j].pages.length; ++k) {

                                for (var l = 0; l < jReaderReport.reportWebReader[i].issues[j].pages[k].interactivities.length; ++l) {

                                    if (jReaderReport.reportWebReader[i].issues[j].pages[k].interactivities[l].view > 0) {

                                        jReaderReport.send.interactivity.view(nameTracker, jReaderReport.reportWebReader[i].issues[j].idTitle, jReaderReport.reportWebReader[i].issues[j].id, jReaderReport.reportWebReader[i].issues[j].pages[k].id, jReaderReport.reportWebReader[i].issues[j].pages[k].interactivities[l].id, jReaderReport.reportWebReader[i].issues[j].pages[k].interactivities[l].view, jReaderReport.reportWebReader[i].issues[j].pages[k].interactivities[l].filename);
                                    }
                                }

                                if (jReaderReport.reportWebReader[i].issues[j].pages[k].view > 0)
                                    jReaderReport.send.page.view(nameTracker, jReaderReport.reportWebReader[i].issues[j].idTitle, jReaderReport.reportWebReader[i].issues[j].id, jReaderReport.reportWebReader[i].issues[j].pages[k].id, jReaderReport.reportWebReader[i].issues[j].pages[k].view);

                                if (jReaderReport.reportWebReader[i].issues[j].pages[k].time > 0)
                                    jReaderReport.send.page.timeReading(nameTracker, jReaderReport.reportWebReader[i].issues[j].idTitle, jReaderReport.reportWebReader[i].issues[j].id, jReaderReport.reportWebReader[i].issues[j].pages[k].id, jReaderReport.reportWebReader[i].issues[j].pages[k].time);
                            }

                            if (jReaderReport.reportWebReader[i].issues[j].view > 0) {

                                jReaderReport.send.issue.view(nameTracker, jReaderReport.reportWebReader[i].issues[j].idTitle, jReaderReport.reportWebReader[i].issues[j].id);
                                jReaderReport.send.title.view(nameTracker, jReaderReport.reportWebReader[i].issues[j].idTitle);
                            }

                            if (jReaderReport.reportWebReader[i].issues[j].time > 0) {

                                jReaderReport.send.title.timeReading(nameTracker, jReaderReport.reportWebReader[i].issues[j].idTitle, jReaderReport.reportWebReader[i].issues[j].time);
                                jReaderReport.send.issue.timeReading(nameTracker, jReaderReport.reportWebReader[i].issues[j].idTitle, jReaderReport.reportWebReader[i].issues[j].id, jReaderReport.reportWebReader[i].issues[j].time);
                            }
                        }
                    }

                    jReaderReport.reportWebReader.splice(i, 1);

                    --i;
                }
            }
        },
        fromApiError: function() {

            if (jReaderReport.internet.access)
                jReaderReport.send.start();

            jReaderReport.storage.struct.save.webReader();
        },
        fromTimesCame: function() {

            if (jReaderReport.internet.access) {

                var backupCurrentNumberPages = new Array();

                for (var i = 0; i < jReaderReport.page.current.length; ++i)
                    backupCurrentNumberPages.push(jReaderReport.page.current[i] + 1);

                jReaderReport.issue.time.close();
                jReaderReport.page.change([]);

                jReaderReport.report.start.current();
                jReaderReport.report.start.storage();

                jReaderReport.currentPosition.analytics = jReaderReport.reportWebReader.length - 1;
                jReaderReport.currentPosition.issue = jReaderReport.reportWebReader[jReaderReport.currentPosition.analytics].issues.length - 1;

                jReaderReport.page.change(backupCurrentNumberPages);

                jReaderReport.issue.time.open();
                jReaderReport.page.reset.view();
            }

            jReaderReport.storage.struct.save.webReader();
        },
        recursive: {
            change: 0,
            timeInterval: 10,
            timeSend: 30,
            timeSendAcum: 0,
            timeStop: 10,
            timeStopAcum: 0,
            reset: function() {

                jReaderReport.report.recursive.timeStopAcum = jReaderReport.date.milissegundos();
            },
            validate: function() {

                if (jReaderReport.page.current.length > 0) {

                    var auxChange = 0;

                    for (var i = 0; i < jReaderReport.page.current.length; ++i)
                        auxChange = auxChange + jReaderReport.page.current[i];

                    if (jReaderReport.report.recursive.change !== auxChange) {

                        jReaderReport.report.recursive.change = auxChange;
                        jReaderReport.report.recursive.reset();
                    }

                    var timeNow = jReaderReport.date.milissegundos();

                    if ((timeNow - jReaderReport.report.recursive.timeStopAcum) < ((jReaderReport.report.recursive.timeStop * 1000) * 60)) {

                        if ((timeNow - jReaderReport.report.recursive.timeSendAcum) > jReaderReport.report.recursive.timeSend * 1000) {

                            jReaderReport.report.recursive.timeSendAcum = timeNow;
                            jReaderReport.report.fromTimesCame();
                        }
                    } else {

                        jReaderReport.page.reset.view();
                        jReaderReport.page.reset.time();
                    }
                }
            },
            start: function() {

                window.setInterval("jReaderReport.report.recursive.validate()", jReaderReport.report.recursive.timeInterval * 1000);
            },
            init: function() {

                jReaderReport.report.recursive.timeStopAcum = jReaderReport.report.recursive.timeSendAcum = jReaderReport.date.milissegundos();

                jReaderReport.report.recursive.start();
            }
        }
    },
    social: {
        networks: ['facebook', 'twitter', 'googleplus', 'pinterest'],
        actions: ['share'],
        /**
         * The "social.init" need three parameters: the first is the social name, the second is reader's action and the last is the final destination url.
         * @argument {social} string facebook - twitter - googleplus - pinterest
         * @argument {action} string share
         * @argument {target} string final destination url
         */
        init: function(social, action, target) {

            if ((typeof social) === 'string' && (typeof action) === 'string' && (typeof target) === 'string') {

                var i;

                for (i = 0; i < jReaderReport.social.actions.length; ++i)
                    if (action === jReaderReport.social.actions[i])
                        break;

                if (i >= jReaderReport.social.actions.length)
                    return console.log(jReaderReport.error.socialAction + action);

                for (i = 0; i < jReaderReport.social.networks.length; ++i)
                    if (social === jReaderReport.social.networks[i])
                        break;
                
                if (i < jReaderReport.social.networks.length)
                    for (i = 0; i < jReaderReport.reportWebReader[jReaderReport.currentPosition.analytics].ids.length; ++i)
                        jReaderReport.send.social.view(jReaderReport.reportWebReader[jReaderReport.currentPosition.analytics].ids[i], social, action, target);
                else
                    console.log(jReaderReport.error.socialExist + social);
            } else
                console.log(jReaderReport.error.social);
        }
    },
    analytics: {
        validate: function(idsAnalytics) {

            for (var i = 0; i < idsAnalytics.length; ++i) {

                if (idsAnalytics[i].toString().search(new RegExp(/^[a-zA-Z]{2}\-[\d]{4,10}\-[\d]{1,2}$/)) < 0) {

                    jReaderReport.send.initFromApiError();

                    return false;
                }
            }

            return true;
        },
        push: function(idsAnalytics) {

            jReaderReport.reportWebReader.push(new jReaderReport.struct.analytics(idsAnalytics));
        },
        init: function(idsAnalytics) {

            jReaderReport.analytics.push(idsAnalytics);
            jReaderReport.currentPosition.analytics = jReaderReport.reportWebReader.length - 1;
        }
    },
    issue: {
        time: {
            open: function() {

                jReaderReport.reportWebReader[jReaderReport.currentPosition.analytics].issues[jReaderReport.currentPosition.issue].time = jReaderReport.date.milissegundos();
            },
            close: function() {

                jReaderReport.reportWebReader[jReaderReport.currentPosition.analytics].issues[jReaderReport.currentPosition.issue].time = jReaderReport.date.milissegundos() - jReaderReport.reportWebReader[jReaderReport.currentPosition.analytics].issues[jReaderReport.currentPosition.issue].time;
            }
        },
        push: function(idIssue, idTitle) {

            jReaderReport.reportWebReader[jReaderReport.currentPosition.analytics].issues.push(new jReaderReport.struct.issue(idIssue, idTitle));
        },
        init: function(idIssue, idTitle) {

            jReaderReport.issue.push(idIssue, idTitle);
            jReaderReport.currentPosition.issue = jReaderReport.reportWebReader[jReaderReport.currentPosition.analytics].issues.length - 1;
        }
    },
    page: {
        current: new Array(),
        reset: {
            view: function() {

                for (var i = 0; i < jReaderReport.page.current.length; ++i)
                    jReaderReport.reportWebReader[jReaderReport.currentPosition.analytics].issues[jReaderReport.currentPosition.issue].pages[jReaderReport.page.current[i]].view = 0;
            },
            time: function() {

                for (var i = 0; i < jReaderReport.page.current.length; ++i)
                    jReaderReport.reportWebReader[jReaderReport.currentPosition.analytics].issues[jReaderReport.currentPosition.issue].pages[jReaderReport.page.current[i]].time = jReaderReport.date.milissegundos();
            }
        },
        /**
         * The "change function" need an array with the numbers pages (like: Array(1,2)) to count views and timestamp from reader. Warning, the sequence pages numbers always start from number page 1.
         * @argument {pages} array An array with numbers (integers) pages (not id) that the leitor is reading.
         */
        change: function(pages) {

            var time = jReaderReport.date.milissegundos();

            if (pages.constructor === Array) {

                for (var i = 0; i < pages.length; ++i)
                    if (pages[i] <= 0 || pages[i] > jReaderReport.reportWebReader[jReaderReport.currentPosition.analytics].issues[jReaderReport.currentPosition.issue].pages.length)
                        return console.log(jReaderReport.error.arrayIndex + pages[i]);

                for (var i = 0; i < pages.length; ++i)
                    pages[i] = pages[i] - 1;

                for (var i = 0; i < jReaderReport.page.current.length; ++i)
                    jReaderReport.reportWebReader[jReaderReport.currentPosition.analytics].issues[jReaderReport.currentPosition.issue].pages[jReaderReport.page.current[i]].time = parseInt(jReaderReport.reportWebReader[jReaderReport.currentPosition.analytics].issues[jReaderReport.currentPosition.issue].pages[jReaderReport.page.current[i]].time + ((time - jReaderReport.reportWebReader[jReaderReport.currentPosition.analytics].issues[jReaderReport.currentPosition.issue].pages[jReaderReport.page.current[i]].timestamp) / jReaderReport.page.current.length));

                for (var i = 0; i < pages.length; ++i) {

                    jReaderReport.reportWebReader[jReaderReport.currentPosition.analytics].issues[jReaderReport.currentPosition.issue].pages[pages[i]].timestamp = time;
                    jReaderReport.reportWebReader[jReaderReport.currentPosition.analytics].issues[jReaderReport.currentPosition.issue].pages[pages[i]].view++;
                }

                jReaderReport.page.current = pages;
            } else
                console.log(jReaderReport.error.array);
        },
        push: function(ids) {

            for (var i = 0; i < ids.length; ++i)
                jReaderReport.reportWebReader[jReaderReport.currentPosition.analytics].issues[jReaderReport.currentPosition.issue].pages.push(new jReaderReport.struct.page(ids[i]));
        },
        init: function(ids) {

            jReaderReport.page.push(ids);
        }
    },
    interactivity: {
        /**
         * This function need two parameters: numberPage is number of interactivity page for count view (click) and idInteractivity is id of interactivity
         * @argument {numberPage} number number of interactivity page
         * @argument {idInteractivity} number key/id of interactivity
         * @argument {filename} string a string with interactivity file name for the editor see which file has viewed
         */
        view: function(numberPage, idInteractivity, filename) {

            if ((typeof numberPage) === 'number') {

                if ((typeof filename) === 'string') {

                    if (filename.length > 0) {

                        if (numberPage <= 0 || numberPage > jReaderReport.reportWebReader[jReaderReport.currentPosition.analytics].issues[jReaderReport.currentPosition.issue].pages.length)
                            return console.log(jReaderReport.error.arrayIndex + numberPage);

                        numberPage = numberPage - 1;

                        for (var i = 0; i < jReaderReport.reportWebReader[jReaderReport.currentPosition.analytics].issues[jReaderReport.currentPosition.issue].pages[numberPage].interactivities.length; ++i)
                            if (jReaderReport.reportWebReader[jReaderReport.currentPosition.analytics].issues[jReaderReport.currentPosition.issue].pages[numberPage].interactivities[i].id === idInteractivity)
                                break;

                        if (i >= jReaderReport.reportWebReader[jReaderReport.currentPosition.analytics].issues[jReaderReport.currentPosition.issue].pages[numberPage].interactivities.length)
                            jReaderReport.reportWebReader[jReaderReport.currentPosition.analytics].issues[jReaderReport.currentPosition.issue].pages[numberPage].interactivities.push(new jReaderReport.struct.interactivity(idInteractivity, 1, filename));
                        else
                            jReaderReport.reportWebReader[jReaderReport.currentPosition.analytics].issues[jReaderReport.currentPosition.issue].pages[numberPage].interactivities[i].view++;

                        jReaderReport.report.recursive.reset();
                    } else
                        console.log(jReaderReport.error.interactivityFilenameNeed);
                } else
                    console.log(jReaderReport.error.interactivityFilenameExist);
            } else
                console.log(jReaderReport.error.interactivity);
        }
    },
    /**
     * The "init function" need four variables to initialize: The first is a array with Analytic's ID, the second is title id from current issue, the third is issue Current ID and the last is the array with sequence pages id in the ascending order. If some variable is miss, the API show an error and it search in the browser storage for report these didn't send to Google Analytics and try to send.
     * @argument {idsAnalytics} array Google Analytics IDs
     * @argument {idTitle} number The Title ID from edition
     * @argument {idIssue} number The Issue Current ID
     * @argument {idsPages} array An array with the sequence pages id at ascending order
     */
    init: function(idsAnalytics, idTitle, idIssue, idsPages) {

        if (idsAnalytics.constructor !== Array || idTitle.toString().search(new RegExp(/^[0-9]+$/)) < 0 || idIssue.toString().search(new RegExp(/^[0-9]+$/)) < 0 || idsPages.constructor !== Array) {

            this.internet.init();
            this.storage.struct.load.webReader();
            this.configuration.init();

            window.setTimeout("jReaderReport.report.fromApiError()", 3000);

            return console.log(this.error.initApi);
        } else {

            if (!this.analytics.validate(idsAnalytics))
                return console.log(this.error.initApi);

            this.internet.init();

            this.storage.struct.load.webReader();

            this.analytics.init(idsAnalytics);
            this.issue.init(idIssue, idTitle);
            this.page.init(idsPages);

            this.configuration.init();
            this.report.recursive.init();
        }
    }
};

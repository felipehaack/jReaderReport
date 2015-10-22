#jReaderReport

##Introducting

There's some projects which help to create a web reader like newspaper, magazine, comic book, etc, for tablets, smartphones and desktop. Moreover, adding effect to each element into page (transition, scale, skew, etc), inserting video and sounds supported by HTML5. Say this, I'm developing an API for report some informations from these web readers to Google Analytics.

##Nomenclatures

1. **Edition:** the magazine, newspaper, comic book, etc.
2. **Issue:** each edition from maganize, newspaper, comic book, etc.
3. **Page:** each page in the issue.
4. **Interactivity:** user is watching a video, listening a song, started an animation, etc.

##What Can It Report?

1. **Page View**: Send a page view when user open the reader.
2. **View Time**: Send view time while user read each page.
3. **Interactivity**: Send custom interactivity like "user open a video", "execute a song", "started an animation", etc, from a page.
4. **Social**: Send a share custom event from supported social network like facebook, twitter, googleplus and pinterest.

##Dependence

- Import the  [Google Analytics Javascript API](https://developers.google.com/analytics/devguides/collection/analyticsjs/) and make sure It was started before the jReaderReport.

##How Use It

###Initializing

```
jReaderReport.init(1º, 2º, 3º, 4º);
```

1. An array with each google analytics ID. (**array**, *ex: [UA-12312-12, UA-31231-23]*)
2. The ID from current edition. (**number**, *ex: 127*)
3. The ID from current issue. (**number**, *ex: 983*)
4. An array with each page id in ascending order. (**array**, *[40, 21, 2, 4, 9]*)

**Result:** It'll send a page view and view time for each 10 seconds to each google analytics ID.
 
### Change Time Interval for View Time

By default, each 10 seconds the API send view time to each google analytics ID. You can to change it from source code or variable:

1. **Source Code:** Search for **"timeInterval: 10"** and change it (seconds).
2. **Javascript:** Execute the follow code before the init API (seconds).

```
jReaderReport.report.recursive.timeInterval = 5;
```

### Report Interactivity View

```
jReaderReport.interactivity.view(1º, 2º, 3º);
```

1. The current page number. (**number**, *ex: 1*)
2. The interactivity ID. (**string**, *ex: video*)
3. A file name to describe the interactivity. (**string**, *ex: star wars trailer*)

### Report Social Network Share

Currently the API only support share event for facebook, twitter, googleplus and pinterest.

```
jReaderReport.social.init(1º, 2º, 3º);
```

1. The social network supported by API: facebook, twitter, googleplus and pinterest. (**string**)
2. The custom event supported: share. (**string**)
3. A describe for the custom event. (**string**, *ex: http://facebook.com.br/user-name-go-to-my-website*);

## Offline Report

When user is offline, but still reading the web reader, the API stores all data from current session (google analytics IDs are linked to it too).

1. If user came back, the API search for offline stored data and send it.
2. If user access other edition or issue, the API search the google analytics IDs linked to the offline data and send it.

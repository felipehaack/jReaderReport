#jReaderReport

##Introducting

There's some projects which help to create a web reader like newspaper, magazine, comic book, etc, for tablets, smartphones and desktop. Moreover, adding effect to each element into page (transition, scale, skew, etc), inserting video and sounds supported by HTML5. Say this, I'm developing an API for report some informations from these web readers to Google Analytics.

##Nomenclatures

1. **Edition:** the magazine, newspaper, comic book, etc.
2. **Issue:** each edition from maganize, newspaper, comic book, etc.
3. **Page:** each page in the issue.
4. **Interactivity:** video, song, animation, etc.

##What Can It Report?

1. **Page View**: Send a page view when user open the reader.
2. **View Time**: Send view time while user read each page.
3. **Interactivity**: Send custom interactivity like "user open a video", "execute a song", "started an animation", etc, from a page.
4. **Social**: Send a share custom event from supported social network like facebook, twitter, google+ and pinterest.

##Dependencies

- Import the  [Google Analytics Javascript API](https://developers.google.com/analytics/devguides/collection/analyticsjs/) and make sure It was started before the jReaderReport.

##How Use It

###Initializing

```
jReaderReport.init(1º, 2º, 3º, 4º);
```

1. An array with each google analytics ID. (array, ex: [UA-12312-12, UA-31231-23])
2. The ID from current edition. (number, ex: 127)
3. The ID from current issue. (number, ex: 983)
4. An array with each page id in ascending order. (array, [40, 21, 2, 4, 9])

**Result:** It'll send a page view and view time for each 10 seconds to each google analytics ID.
 
### Change Time Interval For View Time

By default, each 10 seconds the API send view time to each google analytics ID. You can to change it from source code or variable:

Source Code: Search for **"timeInterval: 10"** and change it (seconds);

Javascript: Execute the follow code before the init API.
```
jReaderReport.report.recursive.timeInterval = 5;
```

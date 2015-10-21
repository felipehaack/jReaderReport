#jReaderReport

##Introducting

How you know, there's a lot of projects that allow you show a newspaper, magazine or comic book edition for tablets, smartphones and desktop. Moreover, with effects to go to the next/previous page and features like video, sounds, animations within of the edition. Say this, I'm developing an API for you report critical information to the Google Analytics.

##What Can It Report?
First, I'll explain to you what's a title, issue, page and interactivity.

1. **Title:** It's a newspaper, magazine or comic book name. 
2. **Issue:** Within a title there's some edition, but, I named "issue".
3. **Page:** The pages from each edition.
4. **Interactivity:** The features like a video, sounds, etc, within page.

##Dependencies

- Import into your project the  [Google Analytics Javascript API](https://developers.google.com/analytics/devguides/collection/analyticsjs/).
- And the jReaderReport.js from this repository.

##How Use It

First, make sure the google analytics API was started before jReaderReport.

###Initializing

```
jReaderReport.init(1º, 2º, 3º, 4º);
```

1. An array with each google analytics ID. (array)
2. The ID from current edition. (number)
3. The ID from current issue. (number)
4. An array with each page id in ascending order. (array)

Result: It'll send a page view and view time for each 10 seconds.
 
### Change Time Interval For View Time

For default, each 10 segundos the API send for all google analytics IDs the view time. You can to change it any time just call:

```

```

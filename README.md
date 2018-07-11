# MBTA Train Tracker App

Currently a front end only application, the MBTA Train Tracker interfaces with the publicly available MBTA API. This API serves data about train lines as well as the vehicles on them. After securing an api key for the service, I set to work in React, first simply displaying the heavy and light rail lines as their own divs. Once that was completed I started to work on finding relevant data. I quickly added the number of trains running on each line as well as any alerts for the different rail lines. Once that was completed, I utilized Leaflet as well as a companion package to adapt it for easier use in react, I created maps for each line that show where trains are on the line and color codes the indicators to a specific direction. Next steps are to allow users to select stops and see roughly how long they can expect to wait to get on a train.

Front end Technologies

* React.js
* Leaflet
* React-leaflet
* JSX
* HTML5
* CSS3

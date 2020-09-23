---
layout: post
title:  "Parse and plot activity data interactively in Jupyter with GPSbabel,  Gpxpy, Geopy and Gmaps"
date:   2020-09-16 10:14:01 +0200
---

There is a Jupyter notebook related to the instructions provided here. Find the notebook and its dependencies [here](https://github.com/watermarkhu/plot_gpx_tcx). Figures will be added to this post sometime in the future.

## Dependancies

Install [GPSbabel](https://www.gpsbabel.org/download.html) , which we use to parse and unzip `.gz` and/or convert`.tcx` files to the same `.gpx` format. On Linux, this can done via  `apt install gpsbabel`. For other systems, please refer to the documentation of GPSbabel.

Most Python dependances can be installed by running `pip install -r requirements.txt` in the notebook repository. However, we'll be using a custom version of `gpxpy`, which parses `.gpx` files. In the package, 'trckpts' points without longitude and latitude fields raise an error for the entire file. The [forked version](https://github.com/watermarkhu/gpxpy) does not raise this error, and deals with such points later. Clone the fork and install with pip in developer mode.

```bash
git clone https://github.com/watermarkhu/gpxpy
pip install -e ./gpxpy
```

From here, we can start the notebook by running the first cell.

```python
import gpxpy
from progiter import ProgIter as prog
from gpxconverter import parse_activities
from plotter import PlotApp
import pandas as pd
from geopy.geocoders import Nominatim
from geopy.extra.rate_limiter import RateLimiter
```

## Unifying activity files

As you may have already noticed, the exported data from Strava is a zip file. If we unzip the file, we find an `activities` folder containing for every tracked activity an individual file. But not all files have the same extension, which is seemingly dependent on the tracker device used during the activity. To parse all activities, we convert all activities to `gpx` files.

```python
folder = "../export_########/"
files = parse_activities(folder, folder + "activities", folder + "activities.csv")
```

Next, we are going to parse all the `gpx` files into a Pandas dataframe. In this dataframe, each row is a tracked location containing a longitude, lattitude and timestamp. We separate the timestamp into columns for simplied data selection using Pandas methods. Also, we use GeoPy to find the starting position of each activity. We limit the number of calls to the Geopy to 1 call per second. Change the value for `user_agent` if neccessary.

```python
data = []
locator = RateLimiter(Nominatim(user_agent="strava_mapper2").reverse, min_delay_seconds=1)
# locator = Nominatim(user_agent="strava").reverse

for filename, activity_type in prog(files.items()):
    with open(folder + filename, "r") as file:
        gpxdata = gpxpy.parse(file)

    mydict = None
    for track in gpxdata.tracks:
        for segment in track.segments:
            for point in segment.points:
                if point.latitude and point.longitude:
                    if not mydict:
                        locdict = locator("{}, {}".format(point.latitude, point.longitude),
                            language='en').raw
                        mydict = {
                            "year"      : point.time.year,
                            "month"     : point.time.month,
                            "weekday"   : point.time.weekday(),
                            "hour"      : point.time.hour
                        }
                        for key in ["country", "state", "city"]:
                            mydict[key] = locdict["address"][key]
                                if key in locdict["address"] else "Unknown"
                    data.append(dict(
                        latitude    = point.latitude,
                        longitude   = point.longitude,
                        time        = point.time,
                        type        = activity_type,
                        file        = filename,
                        **mydict
                    ))

df = pd.DataFrame(data)
print("Dataframe ready")
```

Finally, we plot dynamically on Google Maps via Gmaps. A Google Maps API key is required. The documentation is provided by [Gmaps](https://jupyter-gmaps.readthedocs.io/en/latest/). We can select any of the Pandas column titles for the selectable catagories of the interactive plot.

```python
api_key = "AI....."
categories = ["city", "type"]

map = PlotApp(api_key, df, categories)
map.render()
```

The heatmap gradient can be changed by supplying a list of colors.

```python
map.heatmap.gradient = [
    (0,0,0,0),
    'blue',
    'purple',
    'red'
]
```

If the one wants to customize the style of the background map, we will need to install the version of Gmaps of this [pull request](https://github.com/pbugnion/gmaps/pull/330). The pull request is fully functional, but development on Gmaps is seemingly inactive. First uninstall installed version of gmaps.

```bash
pip uninstall gmaps
```

To install the styled version of Gmaps, we'll need clone the repo and build from source (npm is required).

```bash
git clone https://github.com/krystofcelba/gmaps/
cd gmaps
git switch feature/add-support-for-styles
bash dev-install
```

The map style loaded via a json file. A custom style can be created [here](https://mapstyle.withgoogle.com/). Two styles are included in the styles folder.

```python
with open("./styles/dark.json", "r") as file:
  style = file.read()
map.fig.styles = style
```

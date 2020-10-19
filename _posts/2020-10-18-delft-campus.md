---
layout: post
title: "Should the renovated station be named Delft Campus?"
date: 2020-10-18
---
<head>
    <script src="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js"></script>
    <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
</head>

Just a about a year ago, construction work started on renovating the train station of Delft Zuid. Similarly to what happened to Station Delft, the goal of the renovation project is to improve the connection between Rotterdam and The Hague by adding 2 tracks to the existing rail, such that the Intercity's can overtake the Sprinters. For station Delft, this project took almost 15 years, yikes. (Who remembers that [big blue metal pedestrian bridge](https://indebuurt.nl/delft/wp-content/uploads/2018/04/delft_station_laatste_dagen_vanaf_brug_ii.jpg)?) By also moving large segments of the new rail underground in the city center, space is made available for the construction of ~40.000 new apartments in the new neighborhood of Nieuw Delft by 2040.

![Nieuw Delft](https://nieuwdelft.nl/wp-content/uploads/2018/07/antoooni.jpg "Nieuw Delft")

For Delft Zuid, the city of Delft decided that simply adding two rails wasn't enough. With all the bright minds of the Delft University at walking distance, the new station should reflect the innovation of the next generation. Big solar panels acting as the platform overhead will make the renovated station energy self sufficient, a first of its kind in the Netherlands. Exciting stuff, to be honest. To finish the rebranding, Delft Zuid is renamed to Delft Campus, which has cost €100.000 to €150.000 on its own.

![Delft Campus](https://imgw.rgcdn.nl/4bd7c89479c940718e43e4e6cd09edc2/opener/Het-nieuwe-NS-station-Delft-Campus-Foto-ProRail.jpg "Delft Campus")

So, what is this post all about? A few weeks back, when I was talking to some friends about the facts of the previous paragraphs, we asked ourselves who actually uses the Delft Campus Station. And from a very limited enquiry that we did amongst ourselves, it turns out that almost no one goes to Delft Campus. Station Delft is almost at the same distance from most faculties and has better accessibility and connectivity. So, if no one (or only a very limited group) from the university campus uses the station, should it be named Delft **Campus**? Or should it rather be named for something more representative of its demographics such as Delft Voorhof, Delft Tanthof, or even better: Delft **Zuid**?

## Campus area distribution

The obvious thing is to find the distribution of the actual campus area that is closer to either Station Delft or Delft Campus. I've taken the area for the campus from the [TU Delft interactive map](https://iamap.tudelft.nl/), which consists of 3 blocks; the Science Center and the Botanical garden in the North, the main Mekelpark area including all of X Delft (talking about a stupid rebranding), and the block on the other side of Kruithuisweg.

<div id='map' style='height: 300px;'></div>

*You can rotate and tilt the map using the right mouse button.*

I've added the ground area of the Haagse Hogeschool and InHolland. While they are no part of TU Delft, they are definitely a part of the Delft campus.

To find the distribution, we cannot simply look at the crow-fly distance to either stations. The geometry of roads, canals and rivers requires us to look at the actual travel time. Using the Google Maps API and the `googlemaps` Python module, we populate the campus area polygons with points and look up the travel time to both stations from each point using its longitude `lng` and latitude `lat`. See the [Jupyter notebook](https://github.com/watermarkhu/delft_campus_distance) for the full implementation.

```python
directions = googlemaps_instance.directions(
    (lat, lng),
    (station.lat, station.lng),
    mode="bicycling",
    departure_time=datetime.now()
)
travel_time = sum([
    leg["duration"]["value"]
    for leg in directions[0]["legs"]
])
```

Here, we can also specify the transportation method.  We can assume that most students travel by bike.

<div id='map2' style='height: 300px;'></div>

We find the distribution for other types of transportation using the same method. In all cases except for using transit, the majority of the campus area is closer to the Delft Campus Station.

![distribution]({{site.url}}/data/2020-10-18-delft-campus/mpl_distribution.png "Distribution")

Except for when you're using transit, Delft Campus station is the closest train station. You've won this round, city of Delft.

## Using faculty population

The analysis of the previous paragraph treats all areas on campus equally. But the number of students or employee per square meter - the area occupancy - is not equally divided over the entire campus, as each faculty may house a different number of students. The following table contains the student population [per faculty](https://www.tudelft.nl/en/about-tu-delft/facts-and-figures/education/student-population/), including the [Haagse Hogeschool](https://www.dehaagsehogeschool.nl/docs/default-source/documenten-onderzoek/expertisecentra/governance-of-urban-transitions/jaarverslag-2019-kc-guts.pdf) and [InHolland](https://www.studiekeuze123.nl/onderwijsinstellingen/hogeschool-inholland/delft).

| Faculty/Building                                          | Students |
| --------------------------------------------------------- | -------- |
| Architecture                                              | 2806     |
| Applied Sciences (Chemistry, Bionanoscience)              | 1958     |  
| Applied Sciences (Applied Physics)                        | 1186     |  
| Aerospace Engineering                                     | 2642     |
| Civil Engineering and Geoscience                          | 3644     |
| Electrical Engineering, Mathematic and Computer Science   | 4024     |
| Industrial Design Engineering                             | 1964     |
| Mechanical, Maritime and Materials Engineering            | 4866     |  
| Technology, Policy and Management                         | 1613     |
| Haagse Hogeschool                                         | 2658     |
| Inholland                                                 | 1236     |

Faculty occupation gives us a better estimate for the closest station, but is definitely not precise. For example, do the students from each faculty go to their faculty as often? Do students have lectures in their own faculty, or in the Auditorium or some other faculty in stead? How often do students study in some other building such as the library, Pulse or the Fellowship? Do these things even matter when everyone is sitting in they own rooms anyways due to Covid-19? If we are going to include all these factors, this problem becomes something that is too complex to solve on a Sunday, so let us just assume it is good enough. [The cow is round](https://en.wikipedia.org/wiki/Spherical_cow), right?

Using the same methods in the previous paragraph, we can find the nearest station from each faculty. For bicycling and walking directions, the majority of students are closer to Station Delft, whereas for transit and driving directions the result is the same.

<div id='map3' style='height: 300px;'></div>

![faculties]({{site.url}}/data/2020-10-18-delft-campus/mpl_faculties.png "faculties")

So, as it turns out, for the majority of students on the Delft campus, it takes less time to travel to Station Delft compared to the Delft Campus station. Well, except for the few snobby students that travel to the station by car, if they exist at all. So using this logic, shouldn't Station Delft have been renamed to Delft Campus instead, and the secondary station be named Delft Zuid?

Well, of course not. This article is not some rant on the city of Delft, or some actual proposal to change the name of Delft Campus back to Delft Zuid. It's just for good fun. And another €100.000 to €150.000 wasted would be pretty stupid. Additionally, there are plans for a [new bridge in 2023](https://www.delft.nl/wonen/bouwen/bouwprojecten-de-stad/schieoevers/gelatinebrug) across the Schie canal near Lijm & Cultuur, which probably would make the Delft Campus station the closest station for the majority of the campus. I just wonder how long that will take...

<script>
var base_url = window.location.origin;
mapboxgl.accessToken = 'pk.eyJ1Ijoid2F0ZXJtYXJraHUiLCJhIjoiY2tnZmFtNGQ0MHZuNDJ3cXplOHFjazN4cCJ9.qh1tZmfKnllyahFUz9xJcw';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/watermarkhu/ckgf5td1938fp19qkdjxr4hqi', // stylesheet location
    center: [4.374336, 51.998907],
    zoom: 13.6,
    bearing: 68,
});
map.on('load', function () {
    map.addSource('tud0', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [
                    [
                        [4.371461047266822, 52.0092158086797],
                        [4.371203555201393, 52.0091794868240],
                        [4.371053351496559, 52.0092521305059],
                        [4.370162858103614, 52.0092521305059],
                        [4.369792713259559, 52.0090408031037],
                        [4.369306339837382, 52.0091988974032],
                        [4.368914737321208, 52.0087894491679],
                        [4.368878602981567, 52.0086115159442],
                        [4.369692577935527, 52.0077423391758],
                        [4.367949142075846, 52.0071974903051],
                        [4.368485169186185, 52.0065799868991],
                        [4.371430234684537, 52.0073824094533],
                        [4.371559131452316, 52.0079361049200],
                    ]
                ]
            }
        }
    });
    map.addSource('tud2', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [
                    [
                        [4.371373836019519, 52.00692702678496],
                        [4.369110266272638, 52.00524405881064],
                        [4.368884960715387, 52.00508923149173],
                        [4.367422450397216, 52.00360586726592],
                        [4.368143964622222, 52.00328883579353],
                        [4.368777146099552, 52.00246411937603],
                        [4.367166773427860, 52.00204433719290],
                        [4.367833591203016, 52.00093068281958],
                        [4.368860877255720, 52.00119877409238],
                        [4.369232378168113, 52.00067370537584],
                        [4.368129990262992, 52.00036986368986],
                        [4.369554127571034, 51.99765359355825],
                        [4.370627011176991, 51.99778900973732],
                        [4.371925200340199, 51.99592617562839],
                        [4.370832099597717, 51.99561840003174],
                        [4.371786966007018, 51.99416175828516],
                        [4.372178568523193, 51.99424763870505],
                        [4.372468247096801, 51.99388760045785],
                        [4.372044458072448, 51.99375217247797],
                        [4.372301950137878, 51.99332606713748],
                        [4.374479903857971, 51.99389420669031],
                        [4.375833120098553, 51.99375259082111],
                        [4.377909149876080, 51.99420181376148],
                        [4.378601159801922, 51.99427778484259],
                        [4.381379928341351, 51.99506721583868],
                        [4.379782073868097, 51.99757978141475],
                        [4.377478644078550, 52.00070771102691],
                        [4.376173567365091, 52.00328721421770],
                        [4.372128796170633, 52.00231629132921],
                        [4.370465826581400, 52.00458834996182],
                        [4.372681331227701, 52.00628241164349],
                    ]
                ]
            }
        }
    });
    map.addSource('tud1', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [
                    [
                        [4.383368104557852, 51.99291817085045],
                        [4.385850000404372, 51.98936680416617],
                        [4.380714381232726, 51.98798148495472],
                        [4.380102837577331, 51.98887343515496],
                        [4.377881968513000, 51.98829862483901],
                        [4.377586925521362, 51.98864879751895],
                        [4.376294100776183, 51.98831844600721],
                        [4.374694224865951, 51.99067088969180],
                    ]
                ]
            }
        }
    });
    map.addLayer({
        'id': 'tud0',
        'type': 'fill',
        'source': 'tud0',
        'layout': {},
        'paint': {
            'fill-color': '#b80',
            'fill-opacity': 0.3
        }
    });
    map.addLayer({
        'id': 'tud1',
        'type': 'fill',
        'source': 'tud1',
        'layout': {},
        'paint': {
            'fill-color': '#b80',
            'fill-opacity': 0.3
        }
    });
    map.addLayer({
        'id': 'tud2',
        'type': 'fill',
        'source': 'tud2',
        'layout': {},
        'paint': {
            'fill-color': '#b80',
            'fill-opacity': 0.3
        }
    });
});

var map2 = new mapboxgl.Map({
    container: 'map2',
    style: 'mapbox://styles/watermarkhu/ckgf5td1938fp19qkdjxr4hqi', // stylesheet location
    center: [4.374336, 51.998907],
    zoom: 13.6,
    bearing: 68,
});
map2.on('load', function () {
    map2.addSource('tud0', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [
                    [
                        [4.371461047266822, 52.0092158086797],
                        [4.371203555201393, 52.0091794868240],
                        [4.371053351496559, 52.0092521305059],
                        [4.370162858103614, 52.0092521305059],
                        [4.369792713259559, 52.0090408031037],
                        [4.369306339837382, 52.0091988974032],
                        [4.368914737321208, 52.0087894491679],
                        [4.368878602981567, 52.0086115159442],
                        [4.369692577935527, 52.0077423391758],
                        [4.367949142075846, 52.0071974903051],
                        [4.368485169186185, 52.0065799868991],
                        [4.371430234684537, 52.0073824094533],
                        [4.371559131452316, 52.0079361049200],
                    ]
                ]
            }
        }
    });
    map2.addSource('tud2', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [
                    [
                        [4.371373836019519, 52.00692702678496],
                        [4.369110266272638, 52.00524405881064],
                        [4.368884960715387, 52.00508923149173],
                        [4.367422450397216, 52.00360586726592],
                        [4.368143964622222, 52.00328883579353],
                        [4.368777146099552, 52.00246411937603],
                        [4.367166773427860, 52.00204433719290],
                        [4.367833591203016, 52.00093068281958],
                        [4.368860877255720, 52.00119877409238],
                        [4.369232378168113, 52.00067370537584],
                        [4.368129990262992, 52.00036986368986],
                        [4.369554127571034, 51.99765359355825],
                        [4.370627011176991, 51.99778900973732],
                        [4.371925200340199, 51.99592617562839],
                        [4.370832099597717, 51.99561840003174],
                        [4.371786966007018, 51.99416175828516],
                        [4.372178568523193, 51.99424763870505],
                        [4.372468247096801, 51.99388760045785],
                        [4.372044458072448, 51.99375217247797],
                        [4.372301950137878, 51.99332606713748],
                        [4.374479903857971, 51.99389420669031],
                        [4.375833120098553, 51.99375259082111],
                        [4.377909149876080, 51.99420181376148],
                        [4.378601159801922, 51.99427778484259],
                        [4.381379928341351, 51.99506721583868],
                        [4.379782073868097, 51.99757978141475],
                        [4.377478644078550, 52.00070771102691],
                        [4.376173567365091, 52.00328721421770],
                        [4.372128796170633, 52.00231629132921],
                        [4.370465826581400, 52.00458834996182],
                        [4.372681331227701, 52.00628241164349],
                    ]
                ]
            }
        }
    });
    map2.addSource('tud1', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [
                    [
                        [4.383368104557852, 51.99291817085045],
                        [4.385850000404372, 51.98936680416617],
                        [4.380714381232726, 51.98798148495472],
                        [4.380102837577331, 51.98887343515496],
                        [4.377881968513000, 51.98829862483901],
                        [4.377586925521362, 51.98864879751895],
                        [4.376294100776183, 51.98831844600721],
                        [4.374694224865951, 51.99067088969180],
                    ]
                ]
            }
        }
    });
    map2.addLayer({
        'id': 'tud0',
        'type': 'fill',
        'source': 'tud0',
        'layout': {},
        'paint': {
            'fill-color': '#b80',
            'fill-opacity': 0.3
        }
    });
    map2.addLayer({
        'id': 'tud1',
        'type': 'fill',
        'source': 'tud1',
        'layout': {},
        'paint': {
            'fill-color': '#b80',
            'fill-opacity': 0.3
        }
    });
    map2.addLayer({
        'id': 'tud2',
        'type': 'fill',
        'source': 'tud2',
        'layout': {},
        'paint': {
            'fill-color': '#b80',
            'fill-opacity': 0.3
        }
    });
    map2.addSource('locs', {
        type: 'geojson',
        data: base_url.concat('/data/2020-10-18-delft-campus/points_bicycling.geojson')
    });
    map2.addLayer({
        'id': 'locs',
        'type': 'circle',
        'source': 'locs',
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
                'base': 1.75,
                'stops': [
                    [12, 2],
                    [22, 180]
                ]
            },
            'circle-color': [
                'match',
                ['get', 'station'],
                'Station Delft',
                '#e55e5e',
                'Delft Campus',
                '#3bb2d0',
                /* other */ '#ccc'
            ]
        }
    });
});

var map3 = new mapboxgl.Map({
    container: 'map3',
    style: 'mapbox://styles/watermarkhu/ckgf5td1938fp19qkdjxr4hqi', // stylesheet location
    center: [4.374336, 51.998907],
    zoom: 13.6,
    bearing: 68,
});
map3.on('load', function () {
    map3.addSource('locs', {
        type: 'geojson',
        data: base_url.concat('/data/2020-10-18-delft-campus/faculties_bicycling.geojson')
    });
    map3.addLayer({
        'id': 'locs',
        'type': 'circle',
        'source': 'locs',
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': [
                "interpolate", ["linear"], ["zoom"],
                0, ["/", ['get', 'radius'], 200]
            ],
            'circle-color': [
                'match',
                ['get', 'station'],
                'Station Delft',
                '#e55e5e',
                'Delft Campus Station',
                '#3bb2d0',
                /* other */ '#ccc'
            ],
            'circle-opacity': 0.7
        }
    });
});
</script>

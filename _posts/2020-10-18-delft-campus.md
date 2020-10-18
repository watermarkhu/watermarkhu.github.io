---
layout: post
title: "Delft campus"
date: 2020-10-18
---
<head>
    <script src="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js"></script>
    <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
</head>

# Station Delft Campus versus Station Delft

Just a about a year ago, construction work started on renovating the train station of Delft Zuid. Similarly to what happened to Station Delft, the goal of the renovation project is to improve the connection between Rotterdam and The Hague by adding 2 tracks to the existing rail, such that the Intercity's can overtake the Sprinters. For station Delft, this project took almost 15 years, yikes. (Who remembers that big blue metal pedestrian bridge?) By also moving large segments of the new rail underground in the city center, space is made available for the construction of ~40.000 new apartments in the new neighborhood of Nieuw Delft by 2040.

For Delft Zuid, the city of Delft decided that simply adding two rails wasn't enough. With all the bright minds of the Delft University at walking distance, the new station should reflect the innovation of the next generation. Big solar panels acting as the platform overhead will make the renovated station energy self sufficient, a first of its kind in the Netherlands. Exciting stuff, to be honest. To finish the rebranding, Delft Zuid is renamed to Delft Campus, which has cost €100.000 to €150.000 on its own.

So, what is this post all about? A few weeks back, when I was talking to some friends about the facts of the previous paragraphs, we asked ourselves who actually uses the Delft Campus Station. And from a very limited enquiry that we did amongst ourselves, it turns out that almost no one goes to Delft Campus. Station Delft is almost at the same distance from most faculties and has better accessibility and connectivity. So, if no one (or only a very limited group) from the university campus uses the station, should it be named Delft *Campus*? Or should it rather be named for something more representative of its demographics such as Delft Voorhof, Delft Tanthof, or even better: Delft *Zuid*?

**Disclaimer:** This is not some rant on the city of Delft, or some actual proposal to change the name of Delft Campus back to Delft Zuid. It's just for good fun. And another €100.000 to €150.000 wasted would be pretty stupid.

## Campus area distribution

The obvious thing is to find the distribution of the actual campus area that is closer to either Station Delft or Delft Campus. I've taken the following polygonS for the campus area (from the [TU Delft interactive map](https://iamap.tudelft.nl/)), which includes the Science Center, Duwo and the Botanical garden in the North, all sport fields of X Delft (talking about stupid rebranding), and all blocks up and including Reactor Delft in the South. Note that this area also include the apartments of Michiel de Ruyterweg and Stieltjesweg. While they are no part of TU Delft, they are part of the campus in my opinion.

<div id='map' style='height: 300px;'></div>

To find the distribution, we need to find the boundary line od the closest train station within this polygon. But what defines which station is closer? It would be fair to check for the crow-fly distance to either stations. Due to the Schie canal, we'll need to find the actual commute time. Likily, Google Maps provides us with an API to simplify this. We'll use the `googlemaps` Python module to get the commute time and plot our distribution with the `gmaps` module. Checkout my previous post on [interactively plotting your exported Strava data](https://watermarkhu.nl/2020/09/16/strava-mapper.html).

<div id='map2' style='height: 300px;'></div>

## Using faculty population

The analysis of the previous paragraph treats all areas as equal. But the number of students or employee per square meter - the area occupancy - is of course not equally divided over the entire campus, as each faculty may house a different number of students.

| Faculty/Building                                          | Students |
| --------------------------------------------------------- | -------- |
| Architecture                                              | 2806     |
| Applied Sciences                                          | 1958     |  
| Applied Sciences (old building)                           | 1186     |  
| Aerospace Engineering                                     | 2642     |
| Civil Engineering and Geoscience                          | 3644     |
| Electrical Engineering, Mathematic and Computer Science   | 4024     |
| Industrial Design Engineering                             | 1964     |
| Mechanical, Maritime and Materials Engineering            | 4866     |  
| Technology, Policy and Management                         | 1613     |
| Haagste Hogeschool                                        | 2658     |
| Inholland                                                 | 1236     |

The following table contains the student population per faculty. I've also added the population of students of De Haagse Hogeschool and Inholland.

<div id='map3' style='height: 300px;'></div>

Now, the numerics on the area occupancy using the faculty population is quite problematic. For example, do the students from each faculty go to their faculty as often? Do students have lectures in their own faculty, or in the Aula or some other faculty in stead? How often do students study in some other building such as the library, Pulse or the Fellowship? Do these things even matter when everyone is sitting in they own rooms anyways due to Covid-19?

If we are going to include all these factors, this problem becomes something that is too complex to solve on a Sunday. So, let's for simplicity just assume that the proportion of student population is an estimate of the actual area occupancy. The number of employees per faculty should scale with the number of students. Finally, let's assume that all students enter their buildings via the main entrance.

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
        data: base_url.concat('/data/2020-10-18-delft-campus/points.geojson')
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
        data: base_url.concat('/data/2020-10-18-delft-campus/faculties.geojson')
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

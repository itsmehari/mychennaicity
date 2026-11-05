-- Seed for mybanglore. Run after schema.sql.
-- One city. Twelve editorial area hubs.
-- Pin coordinates are approximate centres for browsing. They are not a legal boundary.
-- No stories, jobs, events, directory rows, or classifieds.

USE mybanglore;

INSERT INTO cities (id, slug, name, country_code)
VALUES (1, 'bengaluru', 'Bengaluru', 'IN');

INSERT INTO areas (city_id, slug, label, blurb, sort_order, pin_lat, pin_lng) VALUES
(1, 'malleswaram-rajajinagar', 'Malleswaram · Rajajinagar',
 'Older north-west neighbourhoods between Malleswaram and Rajajinagar.', 10, 13.003000, 77.555000),
(1, 'majestic-chickpet', 'Majestic · Chickpet · KR Market',
 'The railway station and the wholesale petes around Chickpet and KR Market.', 20, 12.977000, 77.572000),
(1, 'indiranagar-hal-domlur', 'Indiranagar · HAL · Domlur',
 'East-central neighbourhoods around Indiranagar, HAL, and Domlur.', 30, 12.971000, 77.641000),
(1, 'mg-road-shivajinagar', 'MG Road · Shivajinagar',
 'The central business and Shivajinagar belt along MG Road.', 40, 12.976000, 77.603000),
(1, 'basavanagudi-chamarajpet', 'Basavanagudi · Chamarajpet',
 'Old south Bengaluru around Basavanagudi, Gandhi Bazaar, and Chamarajpet.', 50, 12.948000, 77.571000),
(1, 'jayanagar-jp-nagar', 'Jayanagar · JP Nagar · Banashankari',
 'The planned south Bengaluru grid of Jayanagar, JP Nagar, and Banashankari.', 60, 12.925000, 77.585000),
(1, 'koramangala-hsr-btm', 'Koramangala · HSR · BTM',
 'The south-east cluster of Koramangala, HSR Layout, and BTM.', 70, 12.925000, 77.635000),
(1, 'sarjapur-bellandur', 'Sarjapur · Bellandur',
 'The Outer Ring Road belt through Bellandur and Sarjapur Road.', 80, 12.923000, 77.678000),
(1, 'whitefield-marathahalli', 'Whitefield · Marathahalli · KR Puram',
 'The eastern office corridor through Marathahalli, KR Puram, and Whitefield.', 90, 12.969800, 77.749900),
(1, 'electronic-city-bommanahalli', 'Electronic City · Bommanahalli',
 'The southern office belt around Bommanahalli and Electronic City.', 100, 12.845000, 77.660000),
(1, 'hebbal-yelahanka', 'Hebbal · Yelahanka',
 'The northern gate of the city from Hebbal toward Yelahanka.', 110, 13.070000, 77.596000),
(1, 'jalahalli-peenya-yeshwanthpur', 'Jalahalli · Peenya · Yeshwanthpur',
 'North-west industrial and residential belt around Peenya and Yeshwanthpur.', 120, 13.030000, 77.530000);

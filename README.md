Travel Route Read Me

1. Model Schemas have been done through mongoose. There are six models: Country, EventType, Itinerary, Location, Tag, and User. Itineraries contain Days and Events. Country and Location are inside Itineraries and Days. Tags are inside Itineraries. Need minor adjustments.

2. Views are coded in Pug, root template is 'layout.pug'. Source HTML will need to get adapted to Pug. All the new assets have been imported into public folder. All the pages except itinerary details have been ported to Pug and replaced previous Views.

3. Routes have been setup for Admin side: adding and editing new Users, Itineraries, Countries, Locations, and Tags, as well as for end users: login/sign up, home, my itineraries, search for itineraries by country. End users only have access to their own itineraries. Saving new itineraries creates clones of old ones.

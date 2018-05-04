
# Aftership Code Challenge SF movie

#Online Demo
http://13.59.150.70:3000

#Description#

This application provides the function of searching Movies that had been shot in San Francisco and show specific locations on the google map.
 

# Solution #
This is a full-stack solution,but backend focused. On the startup connect to the database and if it is empty, fetch data from remote API and save both movies and locations in to the database,updata the database with Agenda module on a weekly basis.
When typing movies in the panel, automatic suggestions show up, which is achieved from a simple autocomplete search method in the backend. After the user selected a movie the server will send back the geolocations of the movie including name of location as well as Lat and Lng information of the location.
   Backend
  *  node.js
  *  Express MVC structure
  *  MongDB
   FrontEnd 
  *  Angular.js (simple implementation)

#Trade -offs#
* Some location names are of informal sytax, and couldn't get geolocation from google' geocode API.
* Autocomplete search is a simple implementation of searching movies with a substring of its title,    however the time complexity is linear.

#Further improvement#
* Adding security for API endpoints if more time given
* Use a better autocomplete search algorithm
* Do a thorough test of the application, the current testing part only includes several unit tests and not thorough due to time constraint

#Link to other codes proud of 
https://github.com/weihaoranhoran/WPF-Monopoly

#Link to other web application proud of 
http://s58.ierg4210.ie.cuhk.edu.hk 

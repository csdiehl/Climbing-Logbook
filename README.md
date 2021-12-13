# Climbing Logbook
## A tool for tracking indoor and outdoor climbing progress
## Harvard CS50 final project

This simple web app allows users to record and track their climbing progress, either in the gym or outside. Users can track boulder, lead or sport routes, viewing all-time records and graphs of their progress over time through an attractive and enjoyable user interface. 

## tech stack

This project was created using the following languages / tools. 

- Python (Flask)
- Javascript (Chart.js, Moment.js)
- SQLite3
- HTML
- CSS

## Currently deployed version

The latest version of this project is currently deployed on pythonanywhere at csdiehl.pythonanywhere.com. 

## User interface design

Users can toggle between charts showing data aggregated by day, week, or month. This allows the visuals to remain clean as the user logs more data throughout the year. 

Users can easily delete mistaken or old entries, and view their entire indoor climbing history, by visiting the "history" tab. 

The outdoor page allows users to log additional details they might want to save, such as the location and name of routes. 

The charts were implemented using the Chart.js library and stored in the indoor / outdoor js files. The helpers.js file provides common functions for manipulating and aggregating the data for visualization that are used by both charting files. 

## backend / database design

Currently the data are stored in a sqlite3 database. Data are pulled from the DB using sqlite3 syntax and formatted as python dictionaries, transformed into JSON using Jinja's provided filter, and passed to the charting scripts for visualization. 

A users table provides a key so that users only see their own data when they are logged in. User sessions are managed through the Flask_Session extension. 

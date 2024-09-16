# Installation and run instructions

Welcome to my project!! I have developed a web application, this file will help with installation and run instructions to view my web application. 

#Necessities:

- (Visual Studio Code): https://code.visualstudio.com/download
- (Git): https://git-scm.com/downloads
- (MySQL): (version 8.0 or later) https://www.mysql.com/downloads/

#Extensions and packages:
-Node.js (https://nodejs.org/en/download/package-manager)
-LiveServer (download under extensions in VS code)

#Installation:

1. Download VS code
2. Launch VS code
3. NOTE: download the project as a ZIP file and extract it
4. Open MySQL once downloaded and launch
5. Import data to MySQL run - mysql -u <username> -p <database_name> < path/to/database_dump.sql ('username' = your username, 'database_name' = name of database, 'path...' = the path provided for MySQL database)
6. In VS code Go to File > Open folder and select the project directory (ZIP file downloaded and extracted)
7. To make sure the node package is in use do the following:
    - Open a new terminal and run "node -v" (this shows the node version)
    - In the same terminal run "npm -v" (this shows the npm version)
    - Then to use the node packages run "node your-script.js" in the terminal in this case the script.js = "server.js"
    - It should display "connected to the database"
8. In a JSON file in VS code save the following:
  {
  "database": {
    "host": "localhost",
    "user": "user",
    "password": "password",
    "database": "database_name",
    "port": 3001
  }
}
9. To preview the web application use the Live Server - Right click on the HTML file > "Open With Live Server"
10. To end node run "tasklist | findstr node.exe" > "taskkill /PID <PID> /F" (Replace <PID> with the actual process ID you found using the tasklist command)

This is everything you need to know when working with my application. 




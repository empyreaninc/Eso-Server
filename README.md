# Eso-Server

Eso Linker controls browser based Sh*pe header harvesting by spawning in varying chromium builds on each cycle with randomly selected chrome flags & a new VPN IP to alter reported fingerprint(according to previous bypass).
A local server with endpoints for receiving POST requests from the extension & handling GET requests from the main bot module (written in Golang) is started
Browser is spawned in, bezier curves are generated between 0,0 and random point within target element for human-like mouse movement, same with entry of email string. 
Headers are harvested by using blocked "continue" button email check request, headers are received by extension on each blocked request and stored for use by bot. 
Headers are served via response in JSON format from "/" endpoint to bot

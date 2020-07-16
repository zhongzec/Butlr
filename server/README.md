# butlr-qdemo-api

Node.js + express web server for butlr qdemo

## Notes

* runs on http://localhost:3000 by default
* connects to influxdb on :8086
* bucket name should be "demo" (for now)
* CORS is enabled for http://localhost:8080 (default host and port for UI local development)

## TODO

* remove logging
* optimize queries
* input validation
* update CORS whitelist for production domain
* extract env var using <https://www.npmjs.com/package/dotenv>

## Project setup
```
npm install
```

## Runs server in development mode (reloads on file save)
```
npm run dev
```

## Runs server in "production" mode
```
npm run start
```

## Database (For Mac user)
* download influxdb: https://portal.influxdata.com/downloads/
* create a database in influxdb: https://docs.influxdata.com/influxdb/v1.8/introduction/get-started/
```
To have launchd start influxdb now and restart at login:
  brew services start influxdb
Or, if you don't want/need a background service you can just run:
  influxd -config /usr/local/etc/influxdb.conf
```
* make sure to modify the /usr/local/etc/influxdb.conf, search for `flux-enabled` and set it to true
* run `pipenv install` to install python packages, if running into issues, check this post: https://stackoverflow.com/questions/45954528/pip-is-configured-with-locations-that-require-tls-ssl-however-the-ssl-module-in/57240184
* run `pipenv shell` to enter the virtual env created by the above step
* run `python populate-fakedata to-database.py
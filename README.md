# Dicoding-Project-1


### first install the depedency
```
npm install
```
### set the postgres DB and make sure you have the user for the postgres
```
sudo -u postgres psql

CREATE DATABASE music;

GRANT ALL PRIVILEGES ON DATABASE music TO <<username>>;
```

### run the program
```
npm run start-dev
```



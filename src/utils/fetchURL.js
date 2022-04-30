function getURL(hostName) {
    if(process.env.NODE_ENV=== "production")
    return "https://india-cares-server.herokuapp.com";
    else
    return "http://localhost:4000";
}

module.exports = getURL;

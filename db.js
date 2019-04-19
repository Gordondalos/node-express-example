let MongoClient = require( 'mongodb' ).MongoClient;

let state = {
    db: null
};

exports.connect = ( url, done ) => {
    if ( state.db ) {
        return done();
    }
    MongoClient.connect( url, ( err, client ) => {
        if ( err ) {
            return done( err );
        }
        state.db = client.db( 'myapi' );
        done();
    } )
};

exports.get = () => state.db

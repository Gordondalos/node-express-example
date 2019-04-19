let express = require( 'express' );
let parser = require( 'body-parser' );
let ObjectId = require( 'mongodb' ).ObjectID;
let db = require( './db' );

let app = express();
app.use( parser.json() );
app.use( parser.urlencoded( {
    extended: true
} ) );

let artists = [
    { id: 1, name: 'Metallica' },
    { id: 2, name: 'Iron Maiden' },
    { id: 2, name: 'Deep Purple' },
];

app.get( '/', ( req, res ) => {
    res.send( 'Hello API' );
} );


app.get( '/artists', ( req, res ) => {
    db.get().collection( 'artists' ).find().toArray( ( err, docs ) => {
        if ( err ) {
            console.log( err );
            return res.sendStatus( 500 );
        }
        res.send( docs );
    } )

} );

app.get( '/artists/:id', ( req, res ) => {
    db.get().collection( 'artists' ).findOne( { _id: ObjectId( req.params.id ) }, ( err, docs ) => {
        if ( err ) {
            console.log( err );
            return res.sendStatus( 500 );
        }
        res.send( docs );
    } )
} );


app.post( '/artists', ( req, res ) => {
    console.log( req.body );
    let artist = {
        name: req.body.name
    };

    db.get().collection( 'artists' ).insert( artist, ( err, result ) => {
        if ( err ) {
            console.log( err );
            return res.sendStatus( 500 );
        }
        res.send( artist );
    } )


} );


app.put( '/artists/:id', ( req, res ) => {
    db.get().collection( 'artists' ).replaceOne(
        { _id: ObjectId( req.params.id ) },
        { name: req.body.name },
        function ( err, result ) {
            if ( err ) {
                console.log( err );
                return res.sendStatus( 500 );
            }
            res.sendStatus( 200 );
        }
    )
} );

app.delete( '/artists/:id', ( req, res ) => {
    db.get().collection( 'artists' ).deleteOne(
        { _id: ObjectId( req.params.id ) },
        function ( err, result ) {
            if ( err ) {
                console.log( err );
                return res.sendStatus( 500 );
            }
            res.sendStatus( 200 );
        }
    )
} );


db.connect( 'mongodb://localhost:27017/myapi', ( err ) => {
    if ( err ) {
        return console.log( err );
    }

    app.listen( 3012, () => {
        console.log( 'App Start' );
    } );
} );

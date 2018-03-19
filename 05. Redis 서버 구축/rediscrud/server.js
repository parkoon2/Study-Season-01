const express = require( 'express' );
const app = express();
const redis = require( 'redis' );
const JSON = require( 'JSON' );
client = redis.createClient();
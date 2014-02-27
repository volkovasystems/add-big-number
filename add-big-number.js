try{ var base = window; }catch( error ){ base = exports; }
( function module( base ){
	define( "addBigNumber",
		function construct( ){
			var childprocess = require( "child_process" );
			var addBigNumber = function addBigNumber( numbers, callback ){
				var parameters = Array.prototype.slice.apply( arguments );
				callback = parameters.pop( );
				if( typeof callback != "function" ){
					throw new Error( "invalid parameter" );
				}
				numbers = parameters;
				for( var index = 0; index < numbers.length; index++ ){
					var number = numbers[ index ];
					if( typeof number != "string"
						|| typeof number != "number" )
					{
						throw new Error( "invalid parameter" );
					}
				}
				var command = "javac addBigNumber.java && java addBigNumber " + numbers.join( " " );
				var task = childprocess.exec( command );
				var error = "";
				var output = "";
				task.stdout.on( "data",
					function( data ){
						output += data.toString( );
					} );
				task.stderr.on( "data",
					function( data ){
						error += data.toString( ).replace( /^\s+|\s+$/g, "" );
					} );
				task.on( "close",
					function( ){
						if( error ){
							error = new Error( error );
							callback( error );
						}else{
							/*
								TODO: Add validation here that 
								will be returned as second parameter.
							*/
							callback( null, true, output );
						}
					} );
			};
			base.addBigNumber = addBigNumber;
		} );
} )( base );

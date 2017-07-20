/**
 * Created by sasha on 18/07/2017.
 */
if(!findcmd)
    randomSequence.forEach( function ( item )
    {
        findIndex = cmd.indexOf( item[ 0 ] )

        if(findIndex != -1)
        {
            endOfRequest = findIndex + item.length;
            var lenthRandom = item[ 1 ];

            var min = 0;
            var max = 1;
            var stringforRandom = cmd.substring( findIndex += item[ 0 ].length + 1 );
            stringforRandom = stringforRandom.split(" ");

            for( var i = 0 ; i < stringforRandom.length ; i++ )
            {
                if( stringforRandom[ i ] == "от" || stringforRandom[ i ] == "c")
                {
                    min = Math.floor( stringforRandom[ i + 1 ] );
                }
                if( stringforRandom[ i ] == "до" )
                {
                    max = Math.floor( stringforRandom[ i + 1 ] );
                }
                if( stringforRandom[ i ] == "длиной" || stringforRandom[ i ] == "размером")
                {
                    lenthRandom = Math.floor( stringforRandom[ i + 1 ] );
                }
            }

            var buf;

            console.log( "min:" + min + " max:" + max + " lenth:" + lenthRandom) ;

            buf = "answer:";

            for( var i = 0 ; i < lenthRandom-1 ; i++ )
            {
                buf += Random( min , max ) + " ";
            }

            buf += Random( min , max );

            findcmd = buf;
            lastMessage = buf;
        }
    });
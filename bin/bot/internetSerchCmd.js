/**
 * Created by sasha on 18/07/2017.
 */


var Promise = require('bluebird');
var CheckDevice = require("./CheckDevice.js").checkDevice; //func for check divice and cmd

var optionGoogleSerch    =  [ "-----" , "найди в гугле" , "загугли" , "поиск в гугл" , "найди в google" ,"найди мне информацию о" ,"найди в гугле про" ,"кто такой" ,"найди в гугле o" , "что такое" ];
var optionGoogleOpen     =  [ "открой google" , "открой гугл" ];


var optionWikiSerch      =  [ "найди в википедии", "найти в википедии"];
var optionWikiOpen       =  [ "открой википедию" ,"открой wiki" , "открой вики","открой wikipedia"];


var optionGoogleMapSerch =  [ "найди на карте" , "где находится" , "открой на карте" , "покажи на карте" ];
var optionGoogleMapOpen  =  [ "открой карты" , "открой карты google" ];

var answerOk             =  [ "Хорошо" , "Сделано" , "Окей" , "Выполнено" ];


var answerSerch          =  [ "Вот что я нашла" , "Поиск выполнен" , "Вот ответ на ваш запрос" ];

function Random( min , max )
{
    return Math.floor( Math.random( ) * ( max - min + 1 ) ) + min;
};

function  MakeGoogleSerchURL( cmd , index )
{
    return "openPage:google.by/search?q=" + cmd.substring( index );
};

//make wiki url
function  MakeWikiSerchURL(cmd , index ) {
    return "openPage:ru.wikipedia.org/wiki/" + cmd.substring( index );
};

//make google map url
function MakeGoogleMapSerchURL( cmd , index )
{
    return "openPage:google.ru/maps/place/" + cmd.substring( index );
};


exports.internetSerchCmd = function ( cmd ,device )
{
    return new Promise(function (resolve ,reject)
    {
        var result;
        var findIndex;
        //serch google serch command
        optionGoogleSerch.forEach( function ( item )
        {
            findIndex = cmd.indexOf( item );

            if( findIndex != -1 )
            {
                if( CheckDevice( "openPage" , device ) ) //check can device do command
                {
                    result = "answer:" + answerSerch[ Random( 0 , 2 ) ] + "***" + MakeGoogleSerchURL( cmd , findIndex += item.length )
                    resolve(result);
                }
                else
                {
                    resolve("answer:Извините но я немогу выполнить данную команду на этом устройстве");
                }
            }
        });

        //serch google open command
        optionGoogleOpen.forEach( function ( item )
        {
            findIndex = cmd.indexOf( item );

            if( findIndex != -1 )
            {
                if( CheckDevice( "openPage" , device ) )
                {
                    console.log("find cmd");
                    result = "answer:"+answerOk[ Random( 0 , 3 ) ]+"***"+"openPage:google.com";
                    resolve(result);
                }
                else
                {
                    resolve("answer:Извините но я немогу выполнить данную команду на этом устройстве");
                }
            }
        });

        //serch wiki search command
        optionWikiSerch.forEach( function ( item )
        {
            findIndex = cmd.indexOf( item );
            if( findIndex != -1 )
            {
                if( CheckDevice( "openPage" , device ) )
                {
                    resolve("answer:" + answerSerch[ Random( 0 , 2 ) ]+ "***" + MakeWikiSerchURL( cmd , findIndex += item.length ));
                }
                else
                {
                   resolve("answer:Извините но я немогу выполнить данную команду на этом устройстве");
                }
            }
        });

        //serch wiki open command
        optionWikiOpen.forEach(function (item)
        {
            findIndex = cmd.indexOf( item );

            if( findIndex != -1 )
            {
                if( CheckDevice( "openPage" , device ) )
                {
                    resolve("answer:" + answerOk[ Random( 0 , 3 ) ] + "***" + "openPage:ru.wikipedia.org/");
                }
                else
                {
                    resolve("answer:Извините но я немогу выполнить данную команду на этом устройстве");
                }
            }
        });

        //serch google map serch command
        optionGoogleMapSerch.forEach(function (item)
            {
                findIndex = cmd.indexOf( item );

                if( findIndex != -1 )
                {
                    if( CheckDevice( "openPage" , device ) )
                    {
                        resolve("answer:" + answerSerch[ Random( 0 , 2 ) ]+ "***" + MakeGoogleMapSerchURL( cmd , findIndex += item.length));
                    }
                    else
                    {
                        resolve("answer:Извините но я немогу выполнить данную команду на этом устройстве");
                    }
                }
            });

        //serch google map open command
            optionGoogleMapOpen.forEach( function ( item )
            {
                findIndex = cmd.indexOf( item );

                if( findIndex != -1)
                {
                    if( CheckDevice( "openPage" , device ) )
                    {
                        resolve("answer:" + answerOk[ Random( 0 , 3 ) ] + "***" + "openPage:google.ru/maps");
                    }
                    else
                    {
                        resolve("answer:Извините но я немогу выполнить данную команду на этом устройстве");
                    }
                }
            });
            resolve(false);
    });
};

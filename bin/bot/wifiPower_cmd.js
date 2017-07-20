/**
 * Created by sasha on 19/07/2017.
 */


var Promise = require('bluebird');


var On                   =  [ "вкл" , "вруби"];
var Off                  =  [ "вык" , "выруби"];

var led                  =  ["лампочк","свет","розетк"];

var answerOk             =  [ "Хорошо" , "Сделано" , "Окей" , "Выполнено" ];

//TODO:delet this sheet
function NumberOfDevice() {
    return 0 ;
}
function Random( min , max )
{
    return Math.floor( Math.random( ) * ( max - min + 1 ) ) + min;
};

exports.wifiPOwer_cmd = function (cmd) {
    return new Promise(function (resolve ,reject)
    {
        led.forEach(function (item)
        {
            if(cmd.indexOf(item) != -1)
            {
                On.forEach(function ( item_led )
                {
                    if(cmd.indexOf( item ) != -1)
                    {
                        if (NumberOfDevice() != 0) {
                            //setDeviceStatus(0, 1);
                            resolve("answer:" + answerOk[Random(0, 3)]);
                        }
                        else
                        {
                            resolve("answer:Извините,ни одного усройства не подключено к серверу");
                        }
                    }
                });

                Off.forEach( function ( item )
                {
                    if( cmd.indexOf( item ) != -1 )
                    {
                        led.forEach(function ( item_led )
                        {
                            if(cmd.indexOf( item ) != -1)
                            {
                                if (NumberOfDevice() != 0)
                                {
                                    //setDeviceStatus(0, 0);
                                    resolve( "answer:" + answerOk[Random(0, 3)]);
                                }
                                else
                                {
                                    resolve("answer:Извините,ни одного усройства не подключено к серверу");
                                }
                            }
                        });
                    }
                });

                if(NumberOfDevice() != 0)
                {
                    //TODO:getStatus of device here
                    resolve( "answer:" + answerOk[Random(0, 3)]);
                }
                else
                {
                    resolve("answer:Извините,ни одного усройства не подключено к серверу");
                }
            }
        });
        resolve(false);
    });
};

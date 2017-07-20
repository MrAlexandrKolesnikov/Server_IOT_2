/**
 * Created by sasha on 08/08/16.
 */

//require import
var CreateTxtFileByName = require("./WorkWithFile.js").CreateTxtFileByName; //func for worck with txt file
var WriteTxtFile = require("./WorkWithFile.js").WriteTxtFile; //func for write text in txt file
var NumberOfDevice = require("../device/list_wifiPower.js").getNumberOfDevice;
var setDeviceStatus = require("../device/list_wifiPower.js").setStatus;
var weather  = require('./weather.js').weatherTry;
var internetSerchCmd = require('./internetSerchCmd.js').internetSerchCmd;
var wifiPower_cmd = require('./wifiPower_cmd.js').wifiPOwer_cmd;

var Promise = require('bluebird');
/*var openWeatherMapKey = "4b5e93701d19a46c337138750f05322d";
var weather = require('node-openweather')
({
    key: openWeatherMapKey,
    accuracy: "like",
    unit: "metric",
    language: "en"
});*/

//********************* Options For USER Queriess******************************************************

var optionMath           =  [ [ "минус" , "-" ] , [ "и минус" , "-" ] , [ "отнять" , "-" ] , [ "и отнять" , "-" ] , [ "плюс" , "+" ]
                            , [ "и плюс" , "+" ] , [ "и прибавить" , "+" ] , [ "прибавить" , "+" ] , [ "умножить на" , "*" ]
                            , [ "и умножить на" , "*" ] , [ "разделить на" , "/" ] , [ "и разделить на" , "/" ] ];


var randomSequence       =  [ [ "выведи случайное число" , 1 ] , [ "вывести случайное число" , 1 ] , [ "вывести случайное число" , 1 ]
                            , [ "сгенерируй случайное число" , 1 ] , [ "генерируй случайное число" , 1 ]
                            , [ "выведи случайную последовательность" , -1 ] , [ "вывести случайную последовательность" , -1 ]
                            , [ "сгенерируй случайную последовательность" , -1 ] , [ "генерируй случайную последоватьльность" , -1 ] ];


var lenthSequence        =  [ " от " , " c " , " до " ];


var lenths               =  [ "длинной " , "размером " ];


var TestBot              =  [ "начать тестирование" , "запусти тесты" , "проведи тесты" , "запустить тесты" ];


var optionReload         =  [ "перезагрузка" , "перезагрузись" , "рестарт" , "рестартанись" , "перезагрузить" ];


var lastAnswer           =  [ "последнее сообщение" , "повтори" , "что ты сказала" , "еще раз" ];


var lastCmd              =  [ "повтори команду" , "повтори последний запрос" , "еще раз команду" , "заново запрос"
                            , "еще раз послднее действие" , "повторить запрос" ];


var byText               =  [ "с текстом" , "c таким текстом" , "текстом" ];


var make                 =  [ "создай файл" , "запиши" , "новый файл" , "создать файл" ];


var VolumeControlOption  =  [ [ "выключи звук" , "off" ] , [ "off звук" , "off" ] , [ "убери звук" , "off" ] , [ "включи звук" , "on" ]
                            , [ "сделай громче" , "more" ] , [ "оффни звук" , "more" ] , [ "погромче","more" ] , [ "больше звука" , "more" ]
                            , [ "громче" , "more" ] , [ "тише" , "less" ] , [ "слишком громко" , "less" ]
                            , [ "выключить звук" , "off" ] ];


var AppOption            =  [ [ "skype" , "skype" ] , [ "скайп" , "skype" ] , [ "itunes" , "itunes" ] , [ "музык" , "itunes" ]
                            , [ "айтюнс" , "itunes" ] , [ "xcode" , "xcode" ] , [ "twitter" , "twitter" ]
                            , [ "твитер" , "twitter" ] , [ "твиттер" , "twitter" ] , [ "терминал" , "terminal" ]
                            , [ "terminal" , "terminal" ] , [ "календарь" , "celendar" ] , [ "найстройки компьютера" , "prefernces" ]
                            , [ "браузер" , "safari" ] , [ "сафари" , "safari" ] , [ "safari" , "safari" ] ];


var rateMoney            =  [ "покажи курс" , "открой курс" ];


var OpenProgOptins       =  [ "открой " , "запусти " ];
var CloseProgOptins      =  [ "закрой" , "заверши" , "убей процесс" ];

var lastMessage          =    "Это первое сообщение";


//*******************************************************************************************

//********************* Options of BOT Answer******************************************************

var answerOk             =  [ "Хорошо" , "Сделано" , "Окей" , "Выполнено" ];


var answerSerch          =  [ "Вот что я нашла" , "Поиск выполнен" , "Вот ответ на ваш запрос" ];


var weatherReq               =  ["погода"]

//*******************************************************************************************


var ListOfFileTxt        = [ ]; //in future save name of txt file

var flagOfComandContinue = [ false , false , false , false ];//some cmd need to some user answer

var endOfRequest         =  0;

var lastComand           = "";

var findIndex; // global varible for find text in user cmd

var MoneyInformer = '<div id="informerBelarusbank"></div><script type="text/javascript" src="//belarusbank.by/informer?logotyp=1&ColorTextTitle=000000&ColorTextInformer=969696&ColorBackGround=ffffff&ColorTitleBackGround=ffffff&ColorBorder=006030"></script>'

function Random( min , max )
{
    return Math.floor( Math.random( ) * ( max - min + 1 ) ) + min;
};

//func for ContinueComand - need separate file
exports.ContinueComand = function ( cmd )
{
    var result = false;
    var writeLastFile = false;

    flagOfComandContinue.forEach( function ( item , index )
    {
        if( item )
        {
            flagOfComandContinue[ index ] = false;

            switch (index)
            {
                case 0:

                    ListOfFileTxt[ ListOfFileTxt.length ] = cmd;
                    result = CreateTxtFileByName( cmd );

                break;

                case 1:
                    console.log(cmd + " !!");

                    if( cmd.indexOf("да ") !=  -1 )
                    {
                        writeLastFile = true;
                        byText.forEach(function ( item )
                        {
                            console.log( item + "  " + cmd.indexOf( item ) );

                            if( cmd.indexOf( item ) != -1 && !result )
                            {
                                console.log( ListOfFileTxt[ ListOfFileTxt.length ] + "  " + cmd.substring( cmd.indexOf( item ) ) + item.length );
                                writeLastFile = false;
                                WriteTxtFile( ListOfFileTxt[ ListOfFileTxt.length - 1 ] , cmd.substring( cmd.indexOf( item ) + item.length ) );
                                result = "answer:" + answerOk[ Random( 0 , 2 ) ];
                            }
                        });
                    }
                    else if( cmd.indexOf( " нет " ) !=  -1)
                    {
                        result = "answer:" + answerOk[ Random( 0 , 3 ) ];
                    }
                    else
                    {
                        result = "answer:Записать файл?"
                    }
                break;
                case 2:

                break;
                case 3:

                break;
            }
        }
    });
    if( result == "answer:Записать файл?" )
    {
        flagOfComandContinue[ 1 ] = true;
    }
    if( writeLastFile )
    {
        flagOfComandContinue[ 2 ] = true;
    }
    return result;
}


//main func for command understanding
exports.getcmd = function( cmd , device)
{

    return new Promise(function (resolve, reject)
    {

        cmd = cmd.toLowerCase( );

        internetSerchCmd(cmd , device).then(
            result_iternet =>
            {
                if(!result_iternet)
                {
                    wifiPower_cmd(cmd).then(
                        result_wifiPower =>
                        {
                            if(!result_wifiPower)
                            {
                                console.log("return false");
                                resolve(false);
                            }
                            else
                            {
                                resolve(result_wifiPower);
                            }
                        }
                    )
                }
                else
                {
                    resolve(result_iternet);
                }
            });
    });
};

//make google url
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

//find math sign and replase becose sometime speech recognition make them as word
exports.findMath = function( cmd )
{
    optionMath.forEach( function ( item )
    {
        if( cmd.indexOf( item[ 0 ] ) != -1 )
        {
            while( cmd.indexOf( item[ 0 ] ) != -1)
            {
                cmd = cmd.replace( item[ 0 ] , item[ 1 ] );
            }
        }
    });

    return cmd;
};

exports.useLastCmd = function ( cmd )
{
    var flag = false;

    lastCmd.forEach(function ( item )
    {
        if( cmd.indexOf( item ) != -1 )
            flag = true;
    });

    return flag;
};

exports.setLastComand = function ( cmd )
{
  lastComand = cmd;  
};

exports.setLastComandendRequest = function ( index )
{
    endOfRequest = index;
};
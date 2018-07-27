(function () {
    var VERSION = 0.1;
    var MODULE_PATH = "ruler";

    var ruler = Sky.getUtil(MODULE_PATH);
    if( ruler && ruler.version >= VERSION) {
      return;
    };

    //--------------------------
    // start ruler

    ruler = {
      "version" : VERSION
    };

    ruler.set = function (Doc, NewUnits) {
        var OldUnits = { xruler    : Doc.viewPreferences.horizontalMeasurementUnits, 
                         yruler    : Doc.viewPreferences.verticalMeasurementUnits, 
                         origin    : Doc.viewPreferences.rulerOrigin, 
                         zeroPoint : Doc.zeroPoint };

        if (NewUnits.hasOwnProperty('xruler') && NewUnits.hasOwnProperty('yruler')){
            Doc.viewPreferences.horizontalMeasurementUnits = NewUnits.xruler;
            Doc.viewPreferences.verticalMeasurementUnits   = NewUnits.yruler;
        } else if( NewUnits.hasOwnProperty('units')) {
            // Set both rulers to the same unit
            // We will cast everything to string so it can parse a wide variety of input including the MeasurementUnits object
            var stringUnits = String(NewUnits.units).toLowerCase();
            with(Doc.viewPreferences){
                switch(stringUnits) {
                    case "0":
                    case "millimeters":
                    case "mm":
                    case "millimeter":
                    case "zmms":
                    case "2053991795":
                        horizontalMeasurementUnits = MeasurementUnits.MILLIMETERS;
                        verticalMeasurementUnits   = MeasurementUnits.MILLIMETERS;
                        break;
                    case "1":
                    case "inchesDecimal":
                    case "inch": // shorthand to decimal
                    case "zoll":
                    case "pouce":
                    case "zind":
                    case "2053729892":
                        horizontalMeasurementUnits = MeasurementUnits.INCHES_DECIMAL;
                        verticalMeasurementUnits   = MeasurementUnits.INCHES_DECIMAL;
                        break;
                    case "inches":
                    case "zinc":
                    case "2053729891":
                        horizontalMeasurementUnits = MeasurementUnits.INCHES;
                        verticalMeasurementUnits   = MeasurementUnits.INCHES;
                        break;
                    case "2":
                    case "points":
                    case "pt":
                    case "zpoi":
                    case "2054188905":
                        horizontalMeasurementUnits = MeasurementUnits.POINTS;
                        verticalMeasurementUnits   = MeasurementUnits.POINTS;
                        break;
                    case "american_points":
                    case "apt":
                    case "zapt":
                    case "1514238068":
                        horizontalMeasurementUnits = MeasurementUnits.AMERICAN_POINTS;
                        verticalMeasurementUnits   = MeasurementUnits.AMERICAN_POINTS;
                        break;
                    case "agates":
                    case "zagt":
                    case "2051106676":
                        horizontalMeasurementUnits = MeasurementUnits.AGATES;
                        verticalMeasurementUnits   = MeasurementUnits.AGATES;
                        break;
                    case "bai":
                    case "zbai":
                    case "2051170665":
                        horizontalMeasurementUnits = MeasurementUnits.BAI;
                        verticalMeasurementUnits   = MeasurementUnits.BAI;
                        break;
                    case "cm":
                    case "centimeter":
                    case "centimeters":
                    case "zcms":
                    case "2053336435":
                        horizontalMeasurementUnits = MeasurementUnits.CENTIMETERS;
                        verticalMeasurementUnits   = MeasurementUnits.CENTIMETERS;
                        break;
                    case "ciceros":
                    case "c":
                    case "zcic":
                    case "2053335395":
                        horizontalMeasurementUnits = MeasurementUnits.CICEROS;
                        verticalMeasurementUnits   = MeasurementUnits.CICEROS;
                        break;
                    case "custom":
                    case "cstm":
                    case "1131639917":
                        horizontalMeasurementUnits = MeasurementUnits.CUSTOM;
                        verticalMeasurementUnits   = MeasurementUnits.CUSTOM;
                        break;
                    case "ha":
                    case "zha":
                    case "1516790048":
                        horizontalMeasurementUnits = MeasurementUnits.HA;
                        verticalMeasurementUnits   = MeasurementUnits.HA;
                        break;
                    case "mils":
                    case "zmil":
                    case "2051893612":
                        horizontalMeasurementUnits = MeasurementUnits.MILS;
                        verticalMeasurementUnits   = MeasurementUnits.MILS;
                        break;
                    case "picas":
                    case "p":
                    case "zpic":
                    case "2054187363":
                        horizontalMeasurementUnits = MeasurementUnits.PICAS;
                        verticalMeasurementUnits   = MeasurementUnits.PICAS;
                        break;
                    case "pixels":
                    case "pixel":
                    case "px":
                    case "zpix":
                    case "2054187384":
                        horizontalMeasurementUnits = MeasurementUnits.PIXELS;
                        verticalMeasurementUnits   = MeasurementUnits.PIXELS;
                        break;
                    case "q":
                    case "zque":
                    case "2054255973":
                        horizontalMeasurementUnits = MeasurementUnits.Q;
                        verticalMeasurementUnits   = MeasurementUnits.Q;
                        break;
                    case "u":
                    case "zju":
                    case "2051691808":
                        horizontalMeasurementUnits = MeasurementUnits.U;
                        verticalMeasurementUnits   = MeasurementUnits.U;
                        break;
                    default:
                        alert("ExtendScript Modules ind.util.ruler.set:\nCould not parse MeasurementUnits: " + typeof(NewUnits) + " " + NewUnits );
                        break;
                }
            }
        }

        if(NewUnits.hasOwnProperty('origin')){
            Doc.viewPreferences.rulerOrigin = NewUnits.origin;
        } else { // Use page origin if not defined
            Doc.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;
        };

        if(NewUnits.hasOwnProperty('zeroPoint')) {
            Doc.zeroPoint = NewUnits.zeroPoint;
        } else { // Use zero point if not defined
            Doc.zeroPoint = [0,0];
        };

        return OldUnits;
    };
    //--------------------------
    // End ruler

    Sky.setUtil(MODULE_PATH, ruler);

})();

(function () {
    var VERSION = 1.1;
    var MODULE_PATH = "rulers";

    var rulers = Sky.getUtil(MODULE_PATH);
    if( rulers && rulers.version >= VERSION) {
      return;
    };

    //--------------------------
    // start rulers object

    function Rulers() {
        var Rulers = this;

        Rulers.version = VERSION;
        Rulers.description = "InDesign Ruler Tools for getting, setting and converting MeasurementUnits";
        
        Rulers._ppi = 300;
        
        Rulers.setPPI = function ( num ) {
          Rulers._ppi = parseInt( num );
          return Rulers;
        };

        Rulers.getPPI = function() {
          return Rulers._ppi;
        };

        Rulers._setX = function( Doc, indUnits ) {
            if( indUnits ) { // check for undefined (return from indUnitsFrom)
                try {
                    Doc.viewPreferences.horizontalMeasurementUnits = indUnits;
                } catch( err ) {
                    return err;
                };
            };
        };

        Rulers._setY = function( Doc, indUnits ) {
            if( indUnits ) { // check for undefined (return from indUnitsFrom)
                try {
                    Doc.viewPreferences.verticalMeasurementUnits = indUnits;
                } catch( err ) {
                    return err;
                };
            };
        };

        Rulers._set = function( Doc, indUnits ) {
            Rulers._setX( Doc, indUnits );
            Rulers._setY( Doc, indUnits );
        };

        // MEASUREMENT CONVERSION
        //-----------------------

        // Let's use points as an internal conversion step
        // this is the same as InDesign custom

        //  T O / F R O M   P O I N T S
        //  - - - - - - - - - - - - - -

        Rulers.mm2pt = function( num ) {
            // 1 millimeter = 2.83464567 PostScript points
            return num * 2.83464567;
        };

        Rulers.inch2pt = function( num ) {
            //1 inch = 72 postscript points
            return num * 72;
        };

        Rulers.ap2pt = function( num ) {
            // 1 American Point = 0.99626401 points
            return num * 0.99626401;
        };

        Rulers.ag2pt = function( num ) {
            // 1 Agate = 5.142857143 points
            return num * 5.142857143;
        };

        Rulers.bai2pt = function( num ) {
            // Bai means `100` and I believe this is 1 millimeter
            return Rulers.mm2pt( num );
        };

        Rulers.cm2pt = function( num ) {
            // 1 cm = 28.346456693 points
            return num * 28.346456693;
        };

        Rulers.c2pt = function( num ) {
            // 1 ciceros = 12.7889764 points
            return num * 12.7889764;
        };

        Rulers.cstm2pt = function( num ) {
            // Custom values are entered in points
            return num;
        };

        Rulers.h2pt = function( num ) {
            // 1 Q = 1 Ha = 0.25 millimeter
            return Rulers.mm2pt( num * 0.25 );
        };

        Rulers.mil2pt = function( num ) {
            // Thousands of an inch
            // 1 inch = 1000 mils, thou
            // 1 mil = 0.072 points
            return num * 0.072;
        };

        Rulers.p2pt = function( num ) {
            // 1 pica = 12 points
            return num * 12;
        };

        Rulers.px2pt = function( num, ppi ) {
            var ppi = (typeof ppi === 'number') ? ppi : Rulers._ppi;
            return Rulers.inch2pt( num / ppi );
        };

        Rulers.q2pt = function( num ) {
            // 1 Q = 1 Ha = 0.25 millimeter
            return Rulers.mm2pt( num * 0.25 );
        };

        Rulers.u2pt = function( num ) {
            // I assume that U is a micrometer
            // 1 micrometer = 0.00283465 points
            return num * 0.00283465;
        };

        Rulers.pt2mm = function( num ) {
            // 1 millimeter = 2.83464567 PostScript points
            return num / 2.83464567;
        };

        Rulers.pt2inch = function( num ) {
            //1 inch = 72 postscript points
            return num / 72;
        };

        Rulers.pt2ap = function( num ) {
            // 1 American Point = 0.99626401 points
            return num / 0.99626401;
        };

        Rulers.pt2ag = function( num ) {
            // 1 Agate = 5.142857143 points
            return num / 5.142857143;
        };

        Rulers.pt2bai = function( num ) {
            // Bai means `100` I believe this is 1 millimeter
            return Rulers.pt2mm( num );
        };

        Rulers.pt2cm = function( num ) {
            // 1 cm = 28.346456693 points
            return num / 28.346456693;
        };

        Rulers.pt2c = function( num ) {
            // 1 ciceros = 12.7889764 points
            return num / 12.7889764;
        };

        Rulers.pt2cstm = function( num ) {
            // Custom values are entered in points
            return num;
        };

        Rulers.pt2h = function( num ) {
            // 1 Q = 1 Ha = 0.25 millimeter
            return Rulers.pt2mm( num / 0.25 );
        };

        Rulers.pt2mil = function( num ) {
            // Thousands of an inch
            // 1 inch = 1000 mils, thou
            // 1 mil = 0.072 points
            return num / 0.072;
        };

        Rulers.pt2p = function( num ) {
            // 1 pica = 12 points
            return num / 12;
        };

        Rulers.pt2px = function( num, ppi ) {
            var ppi = (typeof ppi === 'number') ? ppi : Rulers._ppi;
            var rounded = Math.round( ( num / 72 ) * ppi );
            return ( rounded > 0 ) ? rounded : 1;
        };

        Rulers.pt2q = function( num ) {
            // 1 Q = 1 Ha = 0.25 millimeter
            return Rulers.pt2mm( num / 0.25 );
        };

        Rulers.pt2u = function( num ) {
            // I assume that U is a micrometer
            // 1 micrometer = 0.00283465 points
            return num / 0.00283465;
        };

        //  M E A S U R E  2  P O I N T S
        //  - - - - - - - - - - - - - - -

        Rulers.measure2pt = function( num, mUnit, roundDec, failCallBack ){
            // Shift args, if no callback is defined return null
            if( typeof failCallBack !== 'function') {
                if( typeof roundDec === 'function' ) {
                    var failCallBack = roundDec, roundDec = undefined;
                } else {
                    var failCallBack = function( err ) {
                        return null;
                    };
                };
            };

            var measure = null;
            var indUnits = Rulers.indUnitsFrom( mUnit );
            var roundDec = (typeof roundDec === "number") ? parseInt(roundDec) : 0;

            switch( indUnits ) {
                case 2053991795: // MeasurementUnits.MILLIMETERS
                    measure = Rulers.mm2pt( num );
                    break;
                case 2053729892: // MeasurementUnits.INCHES_DECIMAL
                    measure = Rulers.inch2pt( num );
                    break;
                case 2053729891: // MeasurementUnits.INCHES
                    measure = Rulers.inch2pt( num );
                    break;
                case 2054188905: // MeasurementUnits.POINTS
                    measure = num;
                    break;
                case 1514238068: // MeasurementUnits.AMERICAN_POINTS
                    measure = Rulers.ap2pt( num );
                    break;
                case 2051106676: // MeasurementUnits.AGATES
                    measure = Rulers.ag2pt( num );
                    break;
                case 2051170665: // MeasurementUnits.BAI
                    measure = Rulers.bai2pt( num );
                    break;
                case 2053336435: // MeasurementUnits.CENTIMETERS
                    measure = Rulers.cm2pt( num );
                    break;
                case 2053335395: // MeasurementUnits.CICEROS
                    measure = Rulers.c2pt( num );
                    break;
                case 1131639917: // MeasurementUnits.CUSTOM
                    measure = Rulers.cstm2pt( num );
                    break;
                case 1516790048: // MeasurementUnits.HA
                    measure = Rulers.h2pt( num );
                    break;
                case 2051893612: // MeasurementUnits.MILS
                    measure = Rulers.mil2pt( num );
                    break;
                case 2054187363: // MeasurementUnits.PICAS
                    measure = Rulers.p2pt( num );
                    break;
                case 2054187384: // MeasurementUnits.PIXELS
                    measure = Rulers.px2pt( num );
                    break;
                case 2054255973: // MeasurementUnits.Q
                    measure = Rulers.q2pt( num );
                    break;
                case 2051691808: // MeasurementUnits.U
                    measure = Rulers.u2pt( num );
                    break;
                default:
                    return failCallBack( new Error("Could not parse MeasurementUnits: " + typeof(measureUnit) + " " + stringUnits) );
                    measure = null;
                    break;
            };

            if( typeof(measure) !== 'number' ) {
                return measure;
            };

            if(roundDec > 0) {
              return Rulers.roundNum(measure, roundDec);
            } else {
              return measure; 
            };
        };

        // C O N V E R T  V I A  P O I N T S
        // - - - - - - - - - - - - - - - - -

        Rulers._resolveConvert = function ( toUnit, convertFromPoints, num, fromUnit, roundDec, failCallBack ) {
            // Shift arguments, if no callback is defined return null
            if( typeof failCallBack !== 'function') {
                if( typeof roundDec === 'function' ) {
                    var failCallBack = roundDec, roundDec = undefined;
                } else {
                    var failCallBack = function( err ) {
                        return null;
                    };
                };
            };

            var fromIndUnits = Rulers.indUnitsFrom( fromUnit );
            var toIndUnits   = Rulers.indUnitsFrom( toUnit   );
            var roundDec = (typeof roundDec === "number") ? parseInt(roundDec) : 0;

            // If already in the same units
            if( fromIndUnits === toIndUnits ) {
                if(roundDec > 0) {
                    return Rulers.roundNum(num, roundDec);
                } else {
                    return num; 
                };
            };

            var pointMeasure = Rulers.measure2pt( num, fromIndUnits);
            if( typeof(pointMeasure) !== 'number' ) {
                return pointMeasure;
            };

            var measure = convertFromPoints( pointMeasure );

            if(roundDec > 0) {
              return Rulers.roundNum(measure, roundDec);
            } else {
              return measure; 
            };
        };

        Rulers.measure2mm = function( num, mUnit, roundDec, failCallBack ){
            return Rulers._resolveConvert("mm", Rulers.pt2mm, num, mUnit, roundDec, failCallBack );
        };

        Rulers.measure2inch = function( num, mUnit, roundDec, failCallBack ){
            return Rulers._resolveConvert("inch", Rulers.pt2inch, num, mUnit, roundDec, failCallBack );
        };

        Rulers.measure2ap = function( num, mUnit, roundDec, failCallBack ){
            return Rulers._resolveConvert("ap", Rulers.pt2ap, num, mUnit, roundDec, failCallBack );
        };

        Rulers.measure2ag = function( num, mUnit, roundDec, failCallBack ){
            return Rulers._resolveConvert("ag", Rulers.pt2ag, num, mUnit, roundDec, failCallBack );
        };

        Rulers.measure2bai = function( num, mUnit, roundDec, failCallBack ){
            return Rulers._resolveConvert("bai", Rulers.pt2bai, num, mUnit, roundDec, failCallBack );
        };

        Rulers.measure2cm = function( num, mUnit, roundDec, failCallBack ){
            return Rulers._resolveConvert("cm", Rulers.pt2cm, num, mUnit, roundDec, failCallBack );
        };

        Rulers.measure2c = function( num, mUnit, roundDec, failCallBack ){
            return Rulers._resolveConvert("c", Rulers.pt2c, num, mUnit, roundDec, failCallBack );
        };

        Rulers.measure2h = function( num, mUnit, roundDec, failCallBack ){
            return Rulers._resolveConvert("h", Rulers.pt2h, num, mUnit, roundDec, failCallBack );
        };

        Rulers.measure2mil = function( num, mUnit, roundDec, failCallBack ){
            return Rulers._resolveConvert("mil", Rulers.pt2mil, num, mUnit, roundDec, failCallBack );
        };

        Rulers.measure2p = function( num, mUnit, roundDec, failCallBack ){
            return Rulers._resolveConvert("p", Rulers.pt2p, num, mUnit, roundDec, failCallBack );
        };

        Rulers.measure2px = function( num, mUnit, roundDec, failCallBack ){
            return Rulers._resolveConvert("px", Rulers.pt2px, num, mUnit, roundDec, failCallBack );
        };

        Rulers.measure2q = function( num, mUnit, roundDec, failCallBack ){
            return Rulers._resolveConvert("q", Rulers.pt2q, num, mUnit, roundDec, failCallBack );
        };

        Rulers.measure2u = function( num, mUnit, roundDec, failCallBack ){
        	return Rulers._resolveConvert("u", Rulers.pt2u, num, mUnit, roundDec, failCallBack );
        };

        // C O N V E R T 
        // - - - - - - - 

        Rulers.convert = function( num, fromUnit, toUnit, roundDec, failCallBack ) {
            var fromIndUnits = Rulers.indUnitsFrom( fromUnit );
            var toIndUnits   = Rulers.indUnitsFrom( toUnit   );
            
            // Shift args, if no callback is defined return null
            if( typeof failCallBack !== 'function') {
                if( typeof roundDec === 'function' ) {
                    var failCallBack = roundDec, roundDec = undefined;
                } else {
                    var failCallBack = function( err ) {
                        return null;
                    };
                };
            };
            
            if( fromIndUnits === null ) {
                return failCallBack( new Error("Could not parse fromUnit: " + typeof(fromUnit) + " " + String(fromUnit) ));
            };
            
            if( toIndUnits === null ) {
                return failCallBack( new Error("Could not parse toUnit: " + typeof(fromUnit) + " " + String(fromUnit) ));
            };

            switch( toIndUnits ) {
                case 2053991795: // MeasurementUnits.MILLIMETERS
                    return Rulers.measure2mm( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 2053729892: // MeasurementUnits.INCHES_DECIMAL
                    return Rulers.measure2inch( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 2053729891: // MeasurementUnits.INCHES
                    return Rulers.measure2inch( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 2054188905: // MeasurementUnits.POINTS
                    return Rulers.measure2pt( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 1514238068: // MeasurementUnits.AMERICAN_POINTS
                    return Rulers.measure2ap( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 2051106676: // MeasurementUnits.AGATES
                    return Rulers.measure2ag( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 2051170665: // MeasurementUnits.BAI
                    return Rulers.measure2bai( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 2053336435: // MeasurementUnits.CENTIMETERS
                    return Rulers.measure2cm( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 2053335395: // MeasurementUnits.CICEROS
                    return Rulers.measure2c( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 1131639917: // MeasurementUnits.CUSTOM
                    return Rulers.measure2pt( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 1516790048: // MeasurementUnits.HA
                    return Rulers.measure2h( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 2051893612: // MeasurementUnits.MILS
                    return Rulers.measure2mil( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 2054187363: // MeasurementUnits.PICAS
                    return Rulers.measure2p( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 2054187384: // MeasurementUnits.PIXELS
                    return Rulers.measure2px( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 2054255973: // MeasurementUnits.Q
                    return Rulers.measure2q( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 2051691808: // MeasurementUnits.U
                    return Rulers.measure2u( num, fromIndUnits, roundDec, failCallBack );
                    break;
                default:
                    return failCallBack( new Error("Could not parse MeasurementUnits: " + typeof(measureUnit) + " " + stringUnits) );
                    break;
            };
        };

        Rulers.NaN20 = function( num ){
            if(isNaN(num)){
                return 0;
            } else {
                return num;
            };
        };

        Rulers.roundNum = function ( num, roundDec ){
            if( typeof num !== 'number') {
                return NaN;
            };
            var roundMulit = Math.pow( 10, parseInt(roundDec) );
            return Math.round(num*roundMulit)/roundMulit;
        };

        Rulers.constrainNum = function( number, min, max, clippedCallBack){
            var clipped = Math.max(Math.min( number, max), min);
            if( (typeof clippedCallBack === 'function') && (clipped != number) ){
                clippedCallBack();
            };
            return clipped;
        };

        Rulers.numToGridStep = function( num, gridStep, roundDec ){
            var result = Math.round(num/gridStep)*gridStep;
            if( typeof roundDec === 'number' ) {
                return Rulers.roundNum(result, roundDec);
            } else {
                return result;
            };
        };

        Rulers.niceNameFor = function( measureUnit, abbreviate ) {
            var abbreviate = (abbreviate === true);
            
            // If no callback is defined return null
            if( typeof failCallBack !== 'function') {
                failCallBack = function( err ) {
                    return null;
                };
            };

            // Cast to string to parse a wide variety of input
            // including the MeasurementUnits object itself
            var stringUnits = String(measureUnit).toLowerCase();
            switch(stringUnits) {
                case "0":
                case "millimeters":
                case "mm":
                case "millimeter":
                case "zmms":
                case "2053991795":
                    return abbreviate ? "mm" : "millimeters";
                    break;
                case "1":
                case "inches decimal":
                case "inches_decimal":
                case "inch": // shorthand to decimal
                case "in":
                case "i":
                case "zoll":
                case "pouce":
                case "zind":
                case "2053729892":
                    return abbreviate ? "inch" : "inches";
                    break;
                case "inches":
                case "zinc":
                case "2053729891":
                    return abbreviate ? "inch" : "inches";
                    break;
                case "2":
                case "points":
                case "pt":
                case "zpoi":
                case "2054188905":
                    return abbreviate ? "pt" : "points";
                    break;
                case "american_points":
                case "american points":
                case "ap":
                case "apt":
                case "zapt":
                case "1514238068":
                    return abbreviate ? "ap" : "American points";
                    break;
                case "agates":
                case "zagt":
                case "ag":
                case "2051106676":
                    return abbreviate ? "ag" : "agates";
                    break;
                case "bai":
                case "zbai":
                case "2051170665":
                    return abbreviate ? "bai" : "bai";
                    break;
                case "cm":
                case "centimeter":
                case "centimeters":
                case "zcms":
                case "2053336435":
                    return abbreviate ? "cm" : "centimeters";
                    break;
                case "ciceros":
                case "c":
                case "zcic":
                case "2053335395":
                    return abbreviate ? "c" : "ciceros";
                    break;
                case "custom":
                case "cstm":
                case "1131639917":
                    return abbreviate ? "cstm" : "custom";
                    break;
                case "ha":
                case "h":
                case "zha":
                case "1516790048":
                    return abbreviate ? "h" : "Ha";
                    break;
                case "mils":
                case "mil":
                case "thou":
                case "zmil":
                case "2051893612":
                    return abbreviate ? "mil" : "mils";
                    break;
                case "picas":
                case "pica":
                case "p":
                case "zpic":
                case "2054187363":
                    return abbreviate ? "p" : "picas";
                    break;
                case "pixels":
                case "pixel":
                case "px":
                case "zpix":
                case "2054187384":
                    return abbreviate ? "px" : "pixels";
                    break;
                case "q":
                case "zque":
                case "2054255973":
                    return abbreviate ? "q" : "Q";
                    break;
                case "u":
                case "zju":
                case "2051691808":
                    return abbreviate ? "u" : "U";
                    break;
                default:
                    return failCallBack( new Error("Could not parse MeasurementUnits: " + typeof(measureUnit) + " " + stringUnits) );
                    break;
            };

        };

        // This function returns InDesign MeasurementUnits or null if not valid
        Rulers.indUnitsFrom = function( measureUnit, failCallBack ) {
            
            // TODO: Add international string values (translations)

            // If no callback is defined return null
            if( typeof failCallBack !== 'function') {
                failCallBack = function( err ) {
                    return null;
                };
            };

            // Cast to string to parse a wide variety of input
            // including the MeasurementUnits object itself
            var stringUnits = String(measureUnit).toLowerCase();
            switch( stringUnits ) {
                case "0":
                case "millimeters":
                case "mm":
                case "millimeter":
                case "zmms":
                case "2053991795":
                    return 2053991795; // MeasurementUnits.MILLIMETERS;
                    break;
                case "1":
                case "inches decimal":
                case "inches_decimal":
                case "inch": // shorthand to decimal
                case "in":
                case "i":
                case "zoll":
                case "pouce":
                case "zind":
                case "2053729892":
                    return 2053729892; // MeasurementUnits.INCHES_DECIMAL;
                    break;
                case "inches":
                case "zinc":
                case "2053729891":
                    return 2053729891; // MeasurementUnits.INCHES;
                    break;
                case "2":
                case "points":
                case "pt":
                case "zpoi":
                case "2054188905":
                    return 2054188905; // MeasurementUnits.POINTS;
                    break;
                case "american_points":
                case "american points":
                case "ap":
                case "apt":
                case "zapt":
                case "1514238068":
                    return 1514238068; // MeasurementUnits.AMERICAN_POINTS;
                    break;
                case "agates":
                case "zagt":
                case "ag":
                case "2051106676":
                    return 2051106676; // MeasurementUnits.AGATES;
                    break;
                case "bai":
                case "zbai":
                case "2051170665":
                    return 2051170665; // MeasurementUnits.BAI;
                    break;
                case "cm":
                case "centimeter":
                case "centimeters":
                case "zcms":
                case "2053336435":
                    return 2053336435; // MeasurementUnits.CENTIMETERS;
                    break;
                case "ciceros":
                case "c":
                case "zcic":
                case "2053335395":
                    return 2053335395; // MeasurementUnits.CICEROS;
                    break;
                case "custom":
                case "cstm":
                case "1131639917":
                    return 1131639917; // MeasurementUnits.CUSTOM;
                    break;
                case "ha":
                case "h":
                case "zha":
                case "1516790048":
                    return 1516790048; // MeasurementUnits.HA;
                    break;
                case "mils":
                case "mil":
                case "thou":
                case "zmil":
                case "2051893612":
                    return 2051893612; // MeasurementUnits.MILS;
                    break;
                case "picas":
                case "pica":
                case "p":
                case "zpic":
                case "2054187363":
                    return 2054187363; // MeasurementUnits.PICAS;
                    break;
                case "pixels":
                case "pixel":
                case "px":
                case "zpix":
                case "2054187384":
                    return 2054187384; // MeasurementUnits.PIXELS;
                    break;
                case "q":
                case "zque":
                case "2054255973":
                    return 2054255973; // MeasurementUnits.Q;
                    break;
                case "u":
                case "zju":
                case "2051691808":
                    return 2051691808; // MeasurementUnits.U;
                    break;
                default:
                    return failCallBack( new Error("Could not parse MeasurementUnits: " + typeof(measureUnit) + " " + stringUnits) );
                    break;
            };
        };

        Rulers.get = function( Doc ) {
            return { xruler    : Doc.viewPreferences.horizontalMeasurementUnits, 
                     yruler    : Doc.viewPreferences.verticalMeasurementUnits, 
                     origin    : Doc.viewPreferences.rulerOrigin, 
                     zeroPoint : Doc.zeroPoint };
        };

        Rulers.set = function( Doc, UnitObj ) {
            var Original_Units = Rulers.get( Doc );
            // Parse Strings...
            var UnitObj = (typeof UnitObj === "object") ? UnitObj :  {'units' : UnitObj};

            if (UnitObj.hasOwnProperty('units')) {
                // Set both rulers to the same unit
                Rulers._set( Doc, Rulers.indUnitsFrom(UnitObj.units) );
            };

            if (UnitObj.hasOwnProperty('xruler')){
                Rulers._setX( Doc, Rulers.indUnitsFrom(UnitObj.xruler) );
            };

            if (UnitObj.hasOwnProperty('yruler')){
                Rulers._setY( Doc, Rulers.indUnitsFrom(UnitObj.yruler) );
            };

            if(UnitObj.hasOwnProperty('origin')){
                Doc.viewPreferences.rulerOrigin = UnitObj.origin;
            } else { // Use page origin if not defined
                Doc.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;
            };

            if(UnitObj.hasOwnProperty('zeroPoint')) {
                Doc.zeroPoint = UnitObj.zeroPoint;
            } else { // Use zero point if not defined
                Doc.zeroPoint = [0,0];
            };

            return Original_Units;
        };
    };

    //--------------------------
    // End rulers

    Sky.setUtil(MODULE_PATH, new Rulers() );

})();

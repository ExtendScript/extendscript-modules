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

        Rulers.q2mm = function( num ) {
            // Each unit has a value of 0.25mm
            return num * 0.25;
        };

        Rulers.q2inch = function( num ) {
            // Each unit has a value of 0.25mm
            return (num * 0.25) / 25.4;
        };

        Rulers.inch2q = function( num ) {
            // Each unit has a value of 0.25mm
            return (num * 25.4)*0.25;
        };

        Rulers.ha2mm = function( num ) {
            // Each unit has a value of 0.25mm
            return num * 0.25;
        };

        Rulers.apt2mm = function( num ) {
            // One American point is 0.35146 millimeters
            return num * 0.35146;
        };

        Rulers.mm2pt = function( num ) {
            // 1 millimetre = 2.83464567 PostScript points
            return num * 2.83464567;
        };

        Rulers.mil2inch = function( num ) {
            // Thousands of an inch
            // 1 inch = 1000 mils, thou
            return num / 1000;
        };

        Rulers.inch2mil = function( num ) {
            // 1 inch = 1000 mil
            return num * 1000;
        };

        Rulers.mm2inch = function( num ) {
            //1 inch = 25.4 millimetres
            return num / 25.4;
        };

        Rulers.inch2mm = function( num ) {
            //1 inch = 25.4 millimetres
            return num * 25.4;
        };

        Rulers.inch2u = function( num ) {
            //1 inch = 1.75 u
            return num * 1.75;
        };

        Rulers.u2inch = function( num ) {
            //1 inch = 1.75 u
            return num / 1.75;
        };

        Rulers.inch2cm = function( num ) {
            //1 inch = 2.54 millimetres
            return num * 2.54;
        };

        Rulers.cm2inch = function( num ) {
            //1 inch = 2.54 millimetres
            return num / 2.54;
        };

        Rulers.inch2pt = function( num ) {
            //1 inch = 72 postscript points
            return num * 72;
        };

        Rulers.inch2ag = function( num ) {
            //1 inch = 14 agate
            return num * 14;
        };

        Rulers.ag2inch = function( num ) {
            return num / 14;
        };

        Rulers.pt2inch = function( num ) {
            // 1 inch = 72 postscript points
            return num / 72;
        };

        Rulers.c2inch = function( num ) {
            // 1 inch = 5.62985 cicero
            return num / 5.62985;
        };

        Rulers.p2inch = function( num ) {
            // 1 inch = 6.00005 pica
            return num / 6.00005;
        };

        Rulers.inch2p = function( num ) {
            // 1 inch = 6.00005 pica
            return num * 6.00005;
        };

        Rulers.p2pt = function( num ) {
            // 1 pica = 12 points
            return num * 12;
        };

        Rulers.pt2p = function( num ) {
            // 1 pica = 12 points
            return num / 12;
        };

        Rulers.inch2c = function( num ) {
            // 1 inch = 5.62985 cicero
            return num * 5.62985;
        };

        Rulers.pt2apt = function( num ) {
            // 1 inch = 72.27 American points
            return num / 72.27;
        };

        Rulers.pt2mm = function( num ) {
            // 1 millimetre = 2.83464567 PostScript points
            return num / 2.83464567;
        };

        Rulers.inch2px = function( num, ppi ) {
            var ppi = (typeof ppi === 'number') ? ppi : Rulers._ppi;
            return num * ppi;
        };

        Rulers.mm2px = function( num, ppi ) {
            var ppi = (typeof ppi === 'number') ? ppi : Rulers._ppi;
            //convert mm to inch, then gets multiplied by PPI to get pixels.
            return (num / 25.4) * ppi;
        };

        Rulers.cm2px = function( num, ppi ) {
            var ppi = (typeof ppi === 'number') ? ppi : Rulers._ppi;
            //convert cm to inch, then gets multiplied by PPI to get pixels.
            return (num / 2.54) * ppi;
        };

        Rulers.pt2px = function( num, ppi ) {
            var ppi = (typeof ppi === 'number') ? ppi : Rulers._ppi;
            return (num / 72) * ppi;
        };

        Rulers.apt2px = function( num, ppi ) {
            var ppi = (typeof ppi === 'number') ? ppi : Rulers._ppi;
            return (num / 72.27) * ppi;
        };

        Rulers.ag2px = function( num, ppi ) {
            var ppi = (typeof ppi === 'number') ? ppi : Rulers._ppi;
            return (num / 14) * ppi;
        };

        Rulers.c2px = function( num, ppi ) {
            var ppi = (typeof ppi === 'number') ? ppi : Rulers._ppi;
            return (num / 5.62985) * ppi;
        };

        Rulers.mil2px = function( num, ppi ) {
            var ppi = (typeof ppi === 'number') ? ppi : Rulers._ppi;
            return (num / 1000) * ppi;
        };

        Rulers.p2px = function( num, ppi ) {
            var ppi = (typeof ppi === 'number') ? ppi : Rulers._ppi;
            return (num / 6.00005) * ppi;
        };

        Rulers.ha2px = function( num, ppi ) {
            var ppi = (typeof ppi === 'number') ? ppi : Rulers._ppi;
            return ((num / 25.4)*0.25) * ppi;
        };

        Rulers.q2px = function( num, ppi ) {
            var ppi = (typeof ppi === 'number') ? ppi : Rulers._ppi;
            return ((num / 25.4)*0.25) * ppi;
        };

        Rulers.u2px = function( num, ppi ) {
            var ppi = (typeof ppi === 'number') ? ppi : Rulers._ppi;
            return (num / 1.75) * ppi;
        };
        
        Rulers.bai2px = function( num, ppi ) {
            var ppi = (typeof ppi === 'number') ? ppi : Rulers._ppi;
            throw new Error("Bai is not supported. If you happen to know the size of Bai, please submit a ticket on GitHub: https://github.com/ExtendScript/extendscript-modules/issues");
            return null;
        };
        
        Rulers.measure2mm = function( num, mUnit, roundDec, failCallBack ){
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
                case 2053991795: //MeasurementUnits.MILLIMETERS
                    measure = null;
                    break;
                case 2053729892: //MeasurementUnits.INCHES_DECIMAL
                    measure = null;
                    break;
                case 2053729891: //MeasurementUnits.INCHES
                    measure = null;
                    break;
                case 2054188905: //MeasurementUnits.POINTS
                    measure = null;
                    break;
                case 1514238068: //MeasurementUnits.AMERICAN_POINTS
                    measure = null;
                    break;
                case 2051106676: //MeasurementUnits.AGATES
                    measure = null;
                    break;
                case 2051170665: //MeasurementUnits.BAI
                    measure = null;
                    break;
                case 2053336435: //MeasurementUnits.CENTIMETERS
                    measure = null;
                    break;
                case 2053335395: //MeasurementUnits.CICEROS
                    measure = null;
                    break;
                case 1131639917: //MeasurementUnits.CUSTOM
                    measure = null;
                    break;
                case 1516790048: //MeasurementUnits.HA
                    measure = null;
                    break;
                case 2051893612: //MeasurementUnits.MILS
                    measure = null;
                    break;
                case 2054187363: //MeasurementUnits.PICAS
                    measure = null;
                    break;
                case 2054187384: //MeasurementUnits.PIXELS
                    measure = null;
                    break;
                case 2054255973: //MeasurementUnits.Q
                    measure = null;
                    break;
                case 2051691808: //MeasurementUnits.U
                    measure = null;
                    break;
                default:
                    return failCallBack( new Error("Could not parse MeasurementUnits: " + typeof(measureUnit) + " " + stringUnits) );
                    measure = null;
                    break;
            };
            if(roundDec > 0) {
              return Rulers.roundNum(measure, roundDec);
            } else {
              return measure; 
            };
        };

        Rulers.measure2inch = function( num, mUnit, roundDec, failCallBack ){
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
                case 2053991795: //MeasurementUnits.MILLIMETERS
                    measure = null;
                    break;
                case 2053729892: //MeasurementUnits.INCHES_DECIMAL
                    measure = null;
                    break;
                case 2053729891: //MeasurementUnits.INCHES
                    measure = null;
                    break;
                case 2054188905: //MeasurementUnits.POINTS
                    measure = null;
                    break;
                case 1514238068: //MeasurementUnits.AMERICAN_POINTS
                    measure = null;
                    break;
                case 2051106676: //MeasurementUnits.AGATES
                    measure = null;
                    break;
                case 2051170665: //MeasurementUnits.BAI
                    measure = null;
                    break;
                case 2053336435: //MeasurementUnits.CENTIMETERS
                    measure = null;
                    break;
                case 2053335395: //MeasurementUnits.CICEROS
                    measure = null;
                    break;
                case 1131639917: //MeasurementUnits.CUSTOM
                    measure = null;
                    break;
                case 1516790048: //MeasurementUnits.HA
                    measure = null;
                    break;
                case 2051893612: //MeasurementUnits.MILS
                    measure = null;
                    break;
                case 2054187363: //MeasurementUnits.PICAS
                    measure = null;
                    break;
                case 2054187384: //MeasurementUnits.PIXELS
                    measure = null;
                    break;
                case 2054255973: //MeasurementUnits.Q
                    measure = null;
                    break;
                case 2051691808: //MeasurementUnits.U
                    measure = null;
                    break;
                default:
                    return failCallBack( new Error("Could not parse MeasurementUnits: " + typeof(measureUnit) + " " + stringUnits) );
                    measure = null;
                    break;
            };
            if(roundDec > 0) {
              return Rulers.roundNum(measure, roundDec);
            } else {
              return measure; 
            };
        };

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
                case 2053991795: //MeasurementUnits.MILLIMETERS
                    measure = null;
                    break;
                case 2053729892: //MeasurementUnits.INCHES_DECIMAL
                    measure = null;
                    break;
                case 2053729891: //MeasurementUnits.INCHES
                    measure = null;
                    break;
                case 2054188905: //MeasurementUnits.POINTS
                    measure = null;
                    break;
                case 1514238068: //MeasurementUnits.AMERICAN_POINTS
                    measure = null;
                    break;
                case 2051106676: //MeasurementUnits.AGATES
                    measure = null;
                    break;
                case 2051170665: //MeasurementUnits.BAI
                    measure = null;
                    break;
                case 2053336435: //MeasurementUnits.CENTIMETERS
                    measure = null;
                    break;
                case 2053335395: //MeasurementUnits.CICEROS
                    measure = null;
                    break;
                case 1131639917: //MeasurementUnits.CUSTOM
                    measure = null;
                    break;
                case 1516790048: //MeasurementUnits.HA
                    measure = null;
                    break;
                case 2051893612: //MeasurementUnits.MILS
                    measure = null;
                    break;
                case 2054187363: //MeasurementUnits.PICAS
                    measure = null;
                    break;
                case 2054187384: //MeasurementUnits.PIXELS
                    measure = null;
                    break;
                case 2054255973: //MeasurementUnits.Q
                    measure = null;
                    break;
                case 2051691808: //MeasurementUnits.U
                    measure = null;
                    break;
                default:
                    return failCallBack( new Error("Could not parse MeasurementUnits: " + typeof(measureUnit) + " " + stringUnits) );
                    measure = null;
                    break;
            };
            if(roundDec > 0) {
              return Rulers.roundNum(measure, roundDec);
            } else {
              return measure; 
            };
        };

        Rulers.measure2ap = function( num, mUnit, roundDec, failCallBack ){
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
                case 2053991795: //MeasurementUnits.MILLIMETERS
                    measure = null;
                    break;
                case 2053729892: //MeasurementUnits.INCHES_DECIMAL
                    measure = null;
                    break;
                case 2053729891: //MeasurementUnits.INCHES
                    measure = null;
                    break;
                case 2054188905: //MeasurementUnits.POINTS
                    measure = null;
                    break;
                case 1514238068: //MeasurementUnits.AMERICAN_POINTS
                    measure = null;
                    break;
                case 2051106676: //MeasurementUnits.AGATES
                    measure = null;
                    break;
                case 2051170665: //MeasurementUnits.BAI
                    measure = null;
                    break;
                case 2053336435: //MeasurementUnits.CENTIMETERS
                    measure = null;
                    break;
                case 2053335395: //MeasurementUnits.CICEROS
                    measure = null;
                    break;
                case 1131639917: //MeasurementUnits.CUSTOM
                    measure = null;
                    break;
                case 1516790048: //MeasurementUnits.HA
                    measure = null;
                    break;
                case 2051893612: //MeasurementUnits.MILS
                    measure = null;
                    break;
                case 2054187363: //MeasurementUnits.PICAS
                    measure = null;
                    break;
                case 2054187384: //MeasurementUnits.PIXELS
                    measure = null;
                    break;
                case 2054255973: //MeasurementUnits.Q
                    measure = null;
                    break;
                case 2051691808: //MeasurementUnits.U
                    measure = null;
                    break;
                default:
                    return failCallBack( new Error("Could not parse MeasurementUnits: " + typeof(measureUnit) + " " + stringUnits) );
                    measure = null;
                    break;
            };
            if(roundDec > 0) {
              return Rulers.roundNum(measure, roundDec);
            } else {
              return measure; 
            };
        };

        Rulers.measure2ag = function( num, mUnit, roundDec, failCallBack ){
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
                case 2053991795: //MeasurementUnits.MILLIMETERS
                    measure = null;
                    break;
                case 2053729892: //MeasurementUnits.INCHES_DECIMAL
                    measure = null;
                    break;
                case 2053729891: //MeasurementUnits.INCHES
                    measure = null;
                    break;
                case 2054188905: //MeasurementUnits.POINTS
                    measure = null;
                    break;
                case 1514238068: //MeasurementUnits.AMERICAN_POINTS
                    measure = null;
                    break;
                case 2051106676: //MeasurementUnits.AGATES
                    measure = null;
                    break;
                case 2051170665: //MeasurementUnits.BAI
                    measure = null;
                    break;
                case 2053336435: //MeasurementUnits.CENTIMETERS
                    measure = null;
                    break;
                case 2053335395: //MeasurementUnits.CICEROS
                    measure = null;
                    break;
                case 1131639917: //MeasurementUnits.CUSTOM
                    measure = null;
                    break;
                case 1516790048: //MeasurementUnits.HA
                    measure = null;
                    break;
                case 2051893612: //MeasurementUnits.MILS
                    measure = null;
                    break;
                case 2054187363: //MeasurementUnits.PICAS
                    measure = null;
                    break;
                case 2054187384: //MeasurementUnits.PIXELS
                    measure = null;
                    break;
                case 2054255973: //MeasurementUnits.Q
                    measure = null;
                    break;
                case 2051691808: //MeasurementUnits.U
                    measure = null;
                    break;
                default:
                    return failCallBack( new Error("Could not parse MeasurementUnits: " + typeof(measureUnit) + " " + stringUnits) );
                    measure = null;
                    break;
            };
            if(roundDec > 0) {
              return Rulers.roundNum(measure, roundDec);
            } else {
              return measure; 
            };
        };

        Rulers.measure2bai = function( num, mUnit, roundDec, failCallBack ){
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
                case 2053991795: //MeasurementUnits.MILLIMETERS
                    measure = null;
                    break;
                case 2053729892: //MeasurementUnits.INCHES_DECIMAL
                    measure = null;
                    break;
                case 2053729891: //MeasurementUnits.INCHES
                    measure = null;
                    break;
                case 2054188905: //MeasurementUnits.POINTS
                    measure = null;
                    break;
                case 1514238068: //MeasurementUnits.AMERICAN_POINTS
                    measure = null;
                    break;
                case 2051106676: //MeasurementUnits.AGATES
                    measure = null;
                    break;
                case 2051170665: //MeasurementUnits.BAI
                    measure = null;
                    break;
                case 2053336435: //MeasurementUnits.CENTIMETERS
                    measure = null;
                    break;
                case 2053335395: //MeasurementUnits.CICEROS
                    measure = null;
                    break;
                case 1131639917: //MeasurementUnits.CUSTOM
                    measure = null;
                    break;
                case 1516790048: //MeasurementUnits.HA
                    measure = null;
                    break;
                case 2051893612: //MeasurementUnits.MILS
                    measure = null;
                    break;
                case 2054187363: //MeasurementUnits.PICAS
                    measure = null;
                    break;
                case 2054187384: //MeasurementUnits.PIXELS
                    measure = null;
                    break;
                case 2054255973: //MeasurementUnits.Q
                    measure = null;
                    break;
                case 2051691808: //MeasurementUnits.U
                    measure = null;
                    break;
                default:
                    return failCallBack( new Error("Could not parse MeasurementUnits: " + typeof(measureUnit) + " " + stringUnits) );
                    measure = null;
                    break;
            };
            if(roundDec > 0) {
              return Rulers.roundNum(measure, roundDec);
            } else {
              return measure; 
            };
        };

        Rulers.measure2cm = function( num, mUnit, roundDec, failCallBack ){
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
                case 2053991795: //MeasurementUnits.MILLIMETERS
                    measure = null;
                    break;
                case 2053729892: //MeasurementUnits.INCHES_DECIMAL
                    measure = null;
                    break;
                case 2053729891: //MeasurementUnits.INCHES
                    measure = null;
                    break;
                case 2054188905: //MeasurementUnits.POINTS
                    measure = null;
                    break;
                case 1514238068: //MeasurementUnits.AMERICAN_POINTS
                    measure = null;
                    break;
                case 2051106676: //MeasurementUnits.AGATES
                    measure = null;
                    break;
                case 2051170665: //MeasurementUnits.BAI
                    measure = null;
                    break;
                case 2053336435: //MeasurementUnits.CENTIMETERS
                    measure = null;
                    break;
                case 2053335395: //MeasurementUnits.CICEROS
                    measure = null;
                    break;
                case 1131639917: //MeasurementUnits.CUSTOM
                    measure = null;
                    break;
                case 1516790048: //MeasurementUnits.HA
                    measure = null;
                    break;
                case 2051893612: //MeasurementUnits.MILS
                    measure = null;
                    break;
                case 2054187363: //MeasurementUnits.PICAS
                    measure = null;
                    break;
                case 2054187384: //MeasurementUnits.PIXELS
                    measure = null;
                    break;
                case 2054255973: //MeasurementUnits.Q
                    measure = null;
                    break;
                case 2051691808: //MeasurementUnits.U
                    measure = null;
                    break;
                default:
                    return failCallBack( new Error("Could not parse MeasurementUnits: " + typeof(measureUnit) + " " + stringUnits) );
                    measure = null;
                    break;
            };
            if(roundDec > 0) {
              return Rulers.roundNum(measure, roundDec);
            } else {
              return measure; 
            };
        };

        Rulers.measure2c = function( num, mUnit, roundDec, failCallBack ){
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
                case 2053991795: //MeasurementUnits.MILLIMETERS
                    measure = null;
                    break;
                case 2053729892: //MeasurementUnits.INCHES_DECIMAL
                    measure = null;
                    break;
                case 2053729891: //MeasurementUnits.INCHES
                    measure = null;
                    break;
                case 2054188905: //MeasurementUnits.POINTS
                    measure = null;
                    break;
                case 1514238068: //MeasurementUnits.AMERICAN_POINTS
                    measure = null;
                    break;
                case 2051106676: //MeasurementUnits.AGATES
                    measure = null;
                    break;
                case 2051170665: //MeasurementUnits.BAI
                    measure = null;
                    break;
                case 2053336435: //MeasurementUnits.CENTIMETERS
                    measure = null;
                    break;
                case 2053335395: //MeasurementUnits.CICEROS
                    measure = null;
                    break;
                case 1131639917: //MeasurementUnits.CUSTOM
                    measure = null;
                    break;
                case 1516790048: //MeasurementUnits.HA
                    measure = null;
                    break;
                case 2051893612: //MeasurementUnits.MILS
                    measure = null;
                    break;
                case 2054187363: //MeasurementUnits.PICAS
                    measure = null;
                    break;
                case 2054187384: //MeasurementUnits.PIXELS
                    measure = null;
                    break;
                case 2054255973: //MeasurementUnits.Q
                    measure = null;
                    break;
                case 2051691808: //MeasurementUnits.U
                    measure = null;
                    break;
                default:
                    return failCallBack( new Error("Could not parse MeasurementUnits: " + typeof(measureUnit) + " " + stringUnits) );
                    measure = null;
                    break;
            };
            if(roundDec > 0) {
              return Rulers.roundNum(measure, roundDec);
            } else {
              return measure; 
            };
        };

        Rulers.measure2h = function( num, mUnit, roundDec, failCallBack ){
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
                case 2053991795: //MeasurementUnits.MILLIMETERS
                    measure = null;
                    break;
                case 2053729892: //MeasurementUnits.INCHES_DECIMAL
                    measure = null;
                    break;
                case 2053729891: //MeasurementUnits.INCHES
                    measure = null;
                    break;
                case 2054188905: //MeasurementUnits.POINTS
                    measure = null;
                    break;
                case 1514238068: //MeasurementUnits.AMERICAN_POINTS
                    measure = null;
                    break;
                case 2051106676: //MeasurementUnits.AGATES
                    measure = null;
                    break;
                case 2051170665: //MeasurementUnits.BAI
                    measure = null;
                    break;
                case 2053336435: //MeasurementUnits.CENTIMETERS
                    measure = null;
                    break;
                case 2053335395: //MeasurementUnits.CICEROS
                    measure = null;
                    break;
                case 1131639917: //MeasurementUnits.CUSTOM
                    measure = null;
                    break;
                case 1516790048: //MeasurementUnits.HA
                    measure = null;
                    break;
                case 2051893612: //MeasurementUnits.MILS
                    measure = null;
                    break;
                case 2054187363: //MeasurementUnits.PICAS
                    measure = null;
                    break;
                case 2054187384: //MeasurementUnits.PIXELS
                    measure = null;
                    break;
                case 2054255973: //MeasurementUnits.Q
                    measure = null;
                    break;
                case 2051691808: //MeasurementUnits.U
                    measure = null;
                    break;
                default:
                    return failCallBack( new Error("Could not parse MeasurementUnits: " + typeof(measureUnit) + " " + stringUnits) );
                    measure = null;
                    break;
            };
            if(roundDec > 0) {
              return Rulers.roundNum(measure, roundDec);
            } else {
              return measure; 
            };
        };

        Rulers.measure2mil = function( num, mUnit, roundDec, failCallBack ){
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
                case 2053991795: //MeasurementUnits.MILLIMETERS
                    measure = null;
                    break;
                case 2053729892: //MeasurementUnits.INCHES_DECIMAL
                    measure = null;
                    break;
                case 2053729891: //MeasurementUnits.INCHES
                    measure = null;
                    break;
                case 2054188905: //MeasurementUnits.POINTS
                    measure = null;
                    break;
                case 1514238068: //MeasurementUnits.AMERICAN_POINTS
                    measure = null;
                    break;
                case 2051106676: //MeasurementUnits.AGATES
                    measure = null;
                    break;
                case 2051170665: //MeasurementUnits.BAI
                    measure = null;
                    break;
                case 2053336435: //MeasurementUnits.CENTIMETERS
                    measure = null;
                    break;
                case 2053335395: //MeasurementUnits.CICEROS
                    measure = null;
                    break;
                case 1131639917: //MeasurementUnits.CUSTOM
                    measure = null;
                    break;
                case 1516790048: //MeasurementUnits.HA
                    measure = null;
                    break;
                case 2051893612: //MeasurementUnits.MILS
                    measure = null;
                    break;
                case 2054187363: //MeasurementUnits.PICAS
                    measure = null;
                    break;
                case 2054187384: //MeasurementUnits.PIXELS
                    measure = null;
                    break;
                case 2054255973: //MeasurementUnits.Q
                    measure = null;
                    break;
                case 2051691808: //MeasurementUnits.U
                    measure = null;
                    break;
                default:
                    return failCallBack( new Error("Could not parse MeasurementUnits: " + typeof(measureUnit) + " " + stringUnits) );
                    measure = null;
                    break;
            };
            if(roundDec > 0) {
              return Rulers.roundNum(measure, roundDec);
            } else {
              return measure; 
            };
        };

        Rulers.measure2p = function( num, mUnit, roundDec, failCallBack ){
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
                case 2053991795: //MeasurementUnits.MILLIMETERS
                    measure = null;
                    break;
                case 2053729892: //MeasurementUnits.INCHES_DECIMAL
                    measure = null;
                    break;
                case 2053729891: //MeasurementUnits.INCHES
                    measure = null;
                    break;
                case 2054188905: //MeasurementUnits.POINTS
                    measure = null;
                    break;
                case 1514238068: //MeasurementUnits.AMERICAN_POINTS
                    measure = null;
                    break;
                case 2051106676: //MeasurementUnits.AGATES
                    measure = null;
                    break;
                case 2051170665: //MeasurementUnits.BAI
                    measure = null;
                    break;
                case 2053336435: //MeasurementUnits.CENTIMETERS
                    measure = null;
                    break;
                case 2053335395: //MeasurementUnits.CICEROS
                    measure = null;
                    break;
                case 1131639917: //MeasurementUnits.CUSTOM
                    measure = null;
                    break;
                case 1516790048: //MeasurementUnits.HA
                    measure = null;
                    break;
                case 2051893612: //MeasurementUnits.MILS
                    measure = null;
                    break;
                case 2054187363: //MeasurementUnits.PICAS
                    measure = null;
                    break;
                case 2054187384: //MeasurementUnits.PIXELS
                    measure = null;
                    break;
                case 2054255973: //MeasurementUnits.Q
                    measure = null;
                    break;
                case 2051691808: //MeasurementUnits.U
                    measure = null;
                    break;
                default:
                    return failCallBack( new Error("Could not parse MeasurementUnits: " + typeof(measureUnit) + " " + stringUnits) );
                    measure = null;
                    break;
            };
            if(roundDec > 0) {
              return Rulers.roundNum(measure, roundDec);
            } else {
              return measure; 
            };
        };

        Rulers.measure2px = function( num, mUnit, roundDec, failCallBack ){
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
                case 2053991795: //MeasurementUnits.MILLIMETERS
                    measure = Rulers.mm2px( num );
                    break;
                case 2053729892: //MeasurementUnits.INCHES_DECIMAL
                    measure = Rulers.inch2px( num );
                    break;
                case 2053729891: //MeasurementUnits.INCHES
                    measure = Rulers.inch2px( num );
                    break;
                case 2054188905: //MeasurementUnits.POINTS
                    measure = Rulers.pt2px( num );
                    break;
                case 1514238068: //MeasurementUnits.AMERICAN_POINTS
                    measure = Rulers.apt2px( num ); 
                    break;
                case 2051106676: //MeasurementUnits.AGATES
                    measure = Rulers.ag2px( num );
                    break;
                case 2051170665: //MeasurementUnits.BAI
                    measure = Rulers.bai2px( num );
                    break;
                case 2053336435: //MeasurementUnits.CENTIMETERS
                    measure = Rulers.cm2px( num );
                    break;
                case 2053335395: //MeasurementUnits.CICEROS
                    measure = Rulers.c2px( num );
                    break;
                case 1131639917: //MeasurementUnits.CUSTOM
                    measure = Rulers.pt2px( num );
                    break;
                case 1516790048: //MeasurementUnits.HA
                    measure = Rulers.ha2px( num ); 
                    break;
                case 2051893612: //MeasurementUnits.MILS
                    measure = Rulers.mil2px( num ); 
                    break;
                case 2054187363: //MeasurementUnits.PICAS
                    measure = Rulers.p2px( num );
                    break;
                case 2054187384: //MeasurementUnits.PIXELS
                    measure = num;
                    break;
                case 2054255973: //MeasurementUnits.Q
                    measure = Rulers.q2px( num );
                    break;
                case 2051691808: //MeasurementUnits.U
                    measure = Rulers.u2px( num );
                    break;
                default:
                    return failCallBack( new Error("Could not parse MeasurementUnits: " + typeof(measureUnit) + " " + stringUnits) );
                    measure = null;
                    break;
            };
            if(roundDec > 0) {
              return Rulers.roundNum(measure, roundDec);
            } else {
              return measure; 
            };
        };

        Rulers.measure2q = function( num, mUnit, roundDec, failCallBack ){
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
                case 2053991795: //MeasurementUnits.MILLIMETERS
                    measure = null;
                    break;
                case 2053729892: //MeasurementUnits.INCHES_DECIMAL
                    measure = null;
                    break;
                case 2053729891: //MeasurementUnits.INCHES
                    measure = null;
                    break;
                case 2054188905: //MeasurementUnits.POINTS
                    measure = null;
                    break;
                case 1514238068: //MeasurementUnits.AMERICAN_POINTS
                    measure = null;
                    break;
                case 2051106676: //MeasurementUnits.AGATES
                    measure = null;
                    break;
                case 2051170665: //MeasurementUnits.BAI
                    measure = null;
                    break;
                case 2053336435: //MeasurementUnits.CENTIMETERS
                    measure = null;
                    break;
                case 2053335395: //MeasurementUnits.CICEROS
                    measure = null;
                    break;
                case 1131639917: //MeasurementUnits.CUSTOM
                    measure = null;
                    break;
                case 1516790048: //MeasurementUnits.HA
                    measure = null;
                    break;
                case 2051893612: //MeasurementUnits.MILS
                    measure = null;
                    break;
                case 2054187363: //MeasurementUnits.PICAS
                    measure = null;
                    break;
                case 2054187384: //MeasurementUnits.PIXELS
                    measure = null;
                    break;
                case 2054255973: //MeasurementUnits.Q
                    measure = null;
                    break;
                case 2051691808: //MeasurementUnits.U
                    measure = null;
                    break;
                default:
                    return failCallBack( new Error("Could not parse MeasurementUnits: " + typeof(measureUnit) + " " + stringUnits) );
                    measure = null;
                    break;
            };
            if(roundDec > 0) {
              return Rulers.roundNum(measure, roundDec);
            } else {
              return measure; 
            };
        };

        Rulers.measure2u = function( num, mUnit, roundDec, failCallBack ){
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
                case 2053991795: //MeasurementUnits.MILLIMETERS
                    measure = null;
                    break;
                case 2053729892: //MeasurementUnits.INCHES_DECIMAL
                    measure = null;
                    break;
                case 2053729891: //MeasurementUnits.INCHES
                    measure = null;
                    break;
                case 2054188905: //MeasurementUnits.POINTS
                    measure = null;
                    break;
                case 1514238068: //MeasurementUnits.AMERICAN_POINTS
                    measure = null;
                    break;
                case 2051106676: //MeasurementUnits.AGATES
                    measure = null;
                    break;
                case 2051170665: //MeasurementUnits.BAI
                    measure = null;
                    break;
                case 2053336435: //MeasurementUnits.CENTIMETERS
                    measure = null;
                    break;
                case 2053335395: //MeasurementUnits.CICEROS
                    measure = null;
                    break;
                case 1131639917: //MeasurementUnits.CUSTOM
                    measure = null;
                    break;
                case 1516790048: //MeasurementUnits.HA
                    measure = null;
                    break;
                case 2051893612: //MeasurementUnits.MILS
                    measure = null;
                    break;
                case 2054187363: //MeasurementUnits.PICAS
                    measure = null;
                    break;
                case 2054187384: //MeasurementUnits.PIXELS
                    measure = null;
                    break;
                case 2054255973: //MeasurementUnits.Q
                    measure = null;
                    break;
                case 2051691808: //MeasurementUnits.U
                    measure = null;
                    break;
                default:
                    return failCallBack( new Error("Could not parse MeasurementUnits: " + typeof(measureUnit) + " " + stringUnits) );
                    measure = null;
                    break;
            };
            if(roundDec > 0) {
              return Rulers.roundNum(measure, roundDec);
            } else {
              return measure; 
            };
        };
        
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
            
            /*
            if( fromIndUnits === null ) {
                return failCallBack( new Error("Could not parse fromUnit: " + typeof(fromUnit) + " " + String(fromUnit) );
            };
            
            if( toIndUnits === null ) {
                return failCallBack( new Error("Could not parse toUnit: " + typeof(fromUnit) + " " + String(fromUnit) );
            };
            */
            
            switch( toIndUnits ) {
                case 2053991795: //MeasurementUnits.MILLIMETERS
                    return Rulers.measure2mm( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 2053729892: //MeasurementUnits.INCHES_DECIMAL
                    return Rulers.measure2inch( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 2053729891: //MeasurementUnits.INCHES
                    return Rulers.measure2inch( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 2054188905: //MeasurementUnits.POINTS
                    return Rulers.measure2pt( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 1514238068: //MeasurementUnits.AMERICAN_POINTS
                    return Rulers.measure2ap( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 2051106676: //MeasurementUnits.AGATES
                    return Rulers.measure2ag( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 2051170665: //MeasurementUnits.BAI
                    return Rulers.measure2bai( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 2053336435: //MeasurementUnits.CENTIMETERS
                    return Rulers.measure2cm( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 2053335395: //MeasurementUnits.CICEROS
                    return Rulers.measure2c( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 1131639917: //MeasurementUnits.CUSTOM
                    return Rulers.measure2pt( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 1516790048: //MeasurementUnits.HA
                    return Rulers.measure2h( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 2051893612: //MeasurementUnits.MILS
                    return Rulers.measure2mil( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 2054187363: //MeasurementUnits.PICAS
                    return Rulers.measure2p( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 2054187384: //MeasurementUnits.PIXELS
                    return Rulers.measure2px( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 2054255973: //MeasurementUnits.Q
                    return Rulers.measure2q( num, fromIndUnits, roundDec, failCallBack );
                    break;
                case 2051691808: //MeasurementUnits.U
                    return Rulers.measure2u( num, fromIndUnits, roundDec, failCallBack );
                    break;
                default:
                    return failCallBack( new Error("Could not parse MeasurementUnits: " + typeof(measureUnit) + " " + stringUnits) );
                    break;
            };
        }; // End Rulers.convert()

        Rulers.NaN20 = function( num ){
            if(isNaN(num)){
                return 0;
            } else {
                return num;
            };
        };

        Rulers.roundNum = function ( num, roundDec ){
            var roundMulit = Math.pow(10,roundDec);
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
                case "inchesdecimal":
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
                    return 2053991795; //MeasurementUnits.MILLIMETERS;
                    break;
                case "1":
                case "inchesdecimal":
                case "inch": // shorthand to decimal
                case "in":
                case "i":
                case "zoll":
                case "pouce":
                case "zind":
                case "2053729892":
                    return 2053729892; //MeasurementUnits.INCHES_DECIMAL;
                    break;
                case "inches":
                case "zinc":
                case "2053729891":
                    return 2053729891; //MeasurementUnits.INCHES;
                    break;
                case "2":
                case "points":
                case "pt":
                case "zpoi":
                case "2054188905":
                    return 2054188905; //MeasurementUnits.POINTS;
                    break;
                case "american_points":
                case "apt":
                case "zapt":
                case "1514238068":
                    return 1514238068; //MeasurementUnits.AMERICAN_POINTS;
                    break;
                case "agates":
                case "zagt":
                case "ag":
                case "2051106676":
                    return 2051106676; //MeasurementUnits.AGATES;
                    break;
                case "bai":
                case "zbai":
                case "2051170665":
                    return 2051170665; //MeasurementUnits.BAI;
                    break;
                case "cm":
                case "centimeter":
                case "centimeters":
                case "zcms":
                case "2053336435":
                    return 2053336435; //MeasurementUnits.CENTIMETERS;
                    break;
                case "ciceros":
                case "c":
                case "zcic":
                case "2053335395":
                    return 2053335395; //MeasurementUnits.CICEROS;
                    break;
                case "custom":
                case "cstm":
                case "1131639917":
                    return 1131639917; //MeasurementUnits.CUSTOM;
                    break;
                case "ha":
                case "h":
                case "zha":
                case "1516790048":
                    return 1516790048; //MeasurementUnits.HA;
                    break;
                case "mils":
                case "mil":
                case "thou":
                case "zmil":
                case "2051893612":
                    return 2051893612; //MeasurementUnits.MILS;
                    break;
                case "picas":
                case "pica":
                case "p":
                case "zpic":
                case "2054187363":
                    return 2054187363; //MeasurementUnits.PICAS;
                    break;
                case "pixels":
                case "pixel":
                case "px":
                case "zpix":
                case "2054187384":
                    return 2054187384; //MeasurementUnits.PIXELS;
                    break;
                case "q":
                case "zque":
                case "2054255973":
                    return 2054255973; //MeasurementUnits.Q;
                    break;
                case "u":
                case "zju":
                case "2051691808":
                    return 2051691808; //MeasurementUnits.U;
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

if (!myApp) { // Check if myApp is loaded
    var myApp = new Object();
};
if (!myApp.hasOwnProperty("schema")) {
    myApp.schema = new Object();
};

// Now we can load the schema

myApp.schema.document = {
  "$schema": "http://coverbuilder.brunoherfst.com/schemas/document#",

  // S T A R T   D E F I N I N I T I O N S
  // -------------------------------------

  "definitions": {
    
    "positiveNumber": {
      "description" : "A positive number",
      "type"        : "number",
      "minimum"     : 0,
      "default"     : 0
    },

    "units": {
      "description" : "Measurement unit",
      "type"        : ["string","integer"]
    },

    "measurement": {
      "description" : "An InDesign measurement value",
      "type"        : "object",
      "properties"  : {
        "value"     : { "type" : "number" },
        "units"     : { "$ref": "#/definitions/units" }
      },
      "required" : ["value", "units"]
    },

    "positive_measurement": {
      "description" : "An InDesign measurement value",
      "type"        : "object",
      "properties"  : {
        "value"     : { "$ref": "#/definitions/positiveNumber" },
        "units"     : { "$ref": "#/definitions/units" }
      },
      "required" : ["value", "units"]
    },

    "label": {
      "description" : "A label object",
      "type": "object",
      "properties": {
        "label"  : { "type": "string" },
        "value"  : { "type": "string" }
      }
    },

    "labels": {
      "description" : "A collection of label objects",
      "type" : "array",
      "items": { "$ref": "#/definitions/label" }
    },

    "bounds": {
      "description" : "Bounds in format [y1, x1, y2, x2]",
      "type" : "array" , "minItems": 4, "maxItems": 4,
      "items": { "type" : "number"}
    },
    
    "guide": {
      "description" : "Guide",
      "type"        : "object",
      "properties"  : {
          "horizontal"   : { "type" : "boolean" , "description" : "Is the guide horzontal, if false it is vertical" },
          "location"     : { "$ref": "#/definitions/measurement" },
          "scriptLabel"  : { "type" : "string" },
          "labels"       : { "$ref": "#/definitions/labels" }
      },
      "required" : ["horizontal", "location"]
    },

    "page": {
      "description" : "Single page (child of spread)",
      "type"        : "object",
      "properties"  : {
          "name"        : { "type" : "st ring"  , "description" : "Name of page"  },
          "scriptLabel" : { "type" : "string" },
          "labels"      : { "$ref": "#/definitions/labels" },
          "width"       : { "$ref": "#/definitions/positive_measurement" },
          "height"      : { "$ref": "#/definitions/positive_measurement" },
          "bounds"      : { "$ref": "#/definitions/bounds" },
          "margins"     : {
              "description" : "Margins",
              "type"        : "object",
              "properties"  : {
                  "top"     : { "$ref": "#/definitions/positive_measurement" },
                  "bottom"  : { "$ref": "#/definitions/positive_measurement" },
                  "left"    : { "$ref": "#/definitions/positive_measurement" },
                  "right"   : { "$ref": "#/definitions/positive_measurement" }
              },
              "required" : ["top","bottom","left","right"]
          },
          "columnCount"  : { "type" : "integer" , "minimum" :  1, "default"   : 1},
          "columnGutter" : { "$ref": "#/definitions/positive_measurement" },
          "guides"       : { "type" : "array", "items": { "$ref": "#/definitions/guide" }, "description" : "Guides relative to page" }
      },
      "required" : ["width","height"]
    },

    "spread": {
      "description" : "Spread description",
      "type"        : "object",
      "properties"  : {
          "name"        : { "type" : "string"  , "description" : "Name of spread"  },
          "namePrefix"  : { "type" : "string"  , "description" : "namePrefix of spread"  },
          "baseName"    : { "type" : "string"  , "description" : "baseName of spread"  },
          "scriptLabel" : { "type" : "string" },
          "labels"      : { "$ref": "#/definitions/labels" },
          "bounds"      : { "$ref": "#/definitions/bounds" },
          "pages"       : { "type" : "array", "items": { "$ref": "#/definitions/page" }  , "description" : "All the pages in this spread" },
          "guides"      : { "type" : "array", "items": { "$ref": "#/definitions/guide" } , "description" : "Guides relative to spread" }
      },
      "required" : ["name","pages"]
    },

    "layer": {
      "description" : "Document Layer",
      "type" : "object",
      "properties": {
        "name"        : { "type": "string"  },
        "scriptLabel" : { "type" : "string" },
        "labels"      : { "$ref": "#/definitions/labels" },
        "locked"      : { "type": "boolean", "default" : false }
      }
    }

  },


  // E N D   D E F I N I N I T I O N S
  // ---------------------------------

    "type": "object",

    "properties" : {
        "version"       : { "type" : "float", "default" : "0.1.0" },
        "name"          : { "type" : "string" , "description" : "Name of blueprint", "default" : "New Document" },
        "scriptLabel"   : { "type" : "string" },
        "labels"        : { "$ref": "#/definitions/labels" },
        "title"         : { "type" : "string" , "description" : "Name of document", "default" : "Untitled" },
        "colorProfile"  : { "type" : "string" , "description" : "Name of color profile", "default" : "undefined" },
        "width"         : { "type" : "number" , "minimum" :  0, "description" : "The width of the document"  },
        "height"        : { "type" : "number" , "minimum" :  0, "description" : "The height of the document" },
        "bleed"         : {
            "description" : "Bleed",
            "type"        : "object",
            "properties"  : {
                "top"     : { "$ref": "#/definitions/positive_measurement" },
                "bottom"  : { "$ref": "#/definitions/positive_measurement" },
                "left"    : { "$ref": "#/definitions/positive_measurement" },
                "right"   : { "$ref": "#/definitions/positive_measurement" }
            },
            "required" : ["top","bottom","left","right"]
        },
        "slugs"         : {
            "description" : "Slugs",
            "type"        : "object",
            "properties"  : {
                "top"     : { "$ref": "#/definitions/positive_measurement" },
                "bottom"  : { "$ref": "#/definitions/positive_measurement" },
                "left"    : { "$ref": "#/definitions/positive_measurement" },
                "right"   : { "$ref": "#/definitions/positive_measurement" }
            },
            "required" : ["top","bottom","left","right"]
        },
        "masterSpreads"   : { "type" : "array", "items": { "$ref": "#/definitions/spread" } , "description" : "Master spreads in document" },
        "spreads"         : { "type" : "array", "items": { "$ref": "#/definitions/spread" } , "description" : "Spreads in document"        },
        "layers"          : { "type" : "array", "items": { "$ref": "#/definitions/layer"  } , "description" : "Collection of layers"       },
        "buildSource"     : { "type": "string", "description" : "A JSON object with source info used to build this BluePrint" },
      },

      "required" : ["name"]
};

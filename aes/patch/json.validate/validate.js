
/*
 * Jassi v0.1.2
 * https://github.com/iclanzan/jassi
 *
 * Copyright 2012 Sorin Iclanzan  (email : sorin@iclanzan.com)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/gpl.html.
 *
 */

JSON.validate = function(instance, schema, path) {
/**
 * Validate a JSON instance against a schema.
 *
 * The function returns an empty array if validation is successful.
 *
 * @param  {any}    instance   An instance of a JSON data that needs to be validated
 * @param  {Object} schema     The schema to validate the instance against
 * @param  {String} path       Optional. The path to the property that is being validated.
 * @return {Array}             An array of objects describing validation errors.
 */

    'use strict';

    var isArray = Array.isArray;
    var keys = Object.keys;

    /**
     * Check if a given value is an instance of a JSON object.
     * This means that arrays and null object are not considered objects.
     *
     * @param  {any}      value  Any value to be checked
     * @return {Boolean}         Returns true if the value is an instance of a JSON object, false otherwise.
     */
    function isObject(value) {
        return null !== value && typeof value == 'object' && !isArray(value);
    };

    /**
     * Get the type of a value.
     *
     * JSON primitive types:
     * Array, Boolean, Number, null, Object, String
     *
     * @param  {any}    value  Any value
     * @return {String}        One of the JSON primitive types.
     */
    function getType(value) {
        if( isObject(value) ) return 'object';
        if( isArray (value) ) return 'array';
        if( null === value    ) return 'null';
        return typeof value;         
    };

    /**
     * Check if two items are equal as per the JSON Schema spec.
     *
     * @param  {any}     item1  The first item
     * @param  {any}     item2  The second item
     * @return {Boolean}        Returns true if the items are equal.
     */
    function areEqual(item1, item2) {
        var type1 = getType(item1);
        var type2 = getType(item2);
        var i, l, keys1, keys2, key;

        if (type1 != type2) return false;

        if ('array' == type1) {
            if (item1.length !== item2.length) return false;

            for (i = 0, l = item1.length; i < l; i ++)
                if (!areEqual(item1[i], item2[i])) return false;

            return true;
        }

        if ('object' == type1) {
            keys1 = keys(item1);
            keys2 = keys(item2);

            if (keys1.length !== keys2.length) return false;

            for (i = 0, l = keys1.length; i < l; i ++) {
                key = keys1[i];
                if (!item2.hasOwnProperty(key) || !areEqual(item1[key], item2[key])) return false;
            }

            return true;
        }

        return item1 === item2;
    };

    function or(item1, item2) {
        return undefined !== item1 ? item1 : item2;
    };

    var errors = [], type, l, i, j, items, itemsIsArray, additional, additionalIsObject, found, properties, pattern, pp;

    function addError(message) {
        errors.push({property:path, message: message});
        return errors;
    };

    if (undefined === path) path = '';

    if (!isObject(schema)) return addError('Invalid schema.');

    type = getType(instance);

    if (schema.type) {
        items = isArray(schema.type) ? schema.type : [schema.type];
        if (!~items.indexOf(type) && (type != 'number' || !~items.indexOf('integer') || instance % 1 != 0)) {
            addError('Invalid type. Was expecting ' + schema.type + ' but found ' + type + '.');
        };
    };

    if ('array' == type) {
        l = instance.length;

        if (schema.items || schema.additionalItems) {
            items = schema.items || {};
            itemsIsArray = isArray(schema.items);

            additional = schema.additionalItems;
            additionalIsObject = isObject(schema.additionalItems);

            if (itemsIsArray && false === additional && l > (j = items.length))
                addError('The instance can only have up to ' + j + ' items.');

            else for (i = 0; i < l; i ++)
                errors = errors.concat(validate(
                    instance[i],
                    itemsIsArray ? items[i] || additionalIsObject && additional || {} : items,
                    path + '[' + i + ']'
                ));
        };

        if (schema.maxItems && l > schema.maxItems)
            addError('There must be a maximum of ' + schema.maxItems + ' item(s) in the array.');

        if (schema.minItems && l < schema.minItems)
            addError('There must be a minimum of ' + schema.minItems + ' item(s) in the array.');

        if (schema.uniqueItems) {
            dance: for (i = 0; i < l; i ++) {
                for (j = i + 1; j < l; j ++) {
                    if (areEqual(instance[i], instance[j])) {
                        addError("The items in the array must be unique.");
                        break dance;
                    };
                };
            };
        };
    };

    if ('object' == type) {
        if (schema.maxProperties && keys(instance).length > schema.maxProperties)
            addError('The instance must have at most ' + schema.maxProperties + ' members.');

        if (schema.minProperties && keys(instance).length < schema.minProperties)
            addError('The instance must have at least ' + schema.minProperties + ' members.');

        if (schema.required)
            schema.required.forEach(function(requiredProperty) {
                if (!instance.hasOwnProperty(requiredProperty))
                    addError('Required property "' + requiredProperty + '" is missing.');
            });

        if (schema.properties || schema.additionalProperties || schema.patternProperties) {
            properties = or(schema.properties, {});
            pattern = or(schema.patternProperties, {});
            additional = or(schema.additionalProperties, {});
            pp = keys(pattern);
        };

        keys(instance).forEach(function(key) {
            var schemas, dependency;

            if (schema.dependencies && (dependency = schema.dependencies[key])) {
                if (isArray(dependency)) {
                    dependency.forEach(function (prop) {
                        if (!instance.hasOwnProperty(prop)) {
                            addError('Property "' + key + '" requires "' + prop + '" to also be present.');
                        }
                    });
                } else {
                    errors = errors.concat(validate(instance, dependency, path));
                };
            };

            if (
                properties &&
                false === additional &&
                !properties.hasOwnProperty(key) &&
                !(pp && pp.some(function(regex) { return key.match(regex); }))
            ) {
                addError('The key "' + key + '" is not allowed to be set.');
            
            } else {
                schemas = [];
                if (properties && properties.hasOwnProperty(key))
                    schemas.push(properties[key]);
        
                pp && pp.forEach(function(regex) {
                    if (key.match(regex) && pattern[regex]) {
                        schemas.push(pattern[regex]);
                    }
                });

                if (!schemas.length && additional)
                    schemas.push(additional);

                schemas.forEach(function(schema) {
                    errors = errors.concat(validate(instance[key], schema, path ? path + '.' + key : key));
                });
            };
        });
    };

    if ('string' == type) {
        if (schema.maxLength && instance.length > schema.maxLength)
            addError('The instance must not be more than ' + schema.maxLength + ' character(s) long.');

        if (schema.minLength && instance.length < schema.minLength)
            addError('The instance must be at least ' + schema.minLength + ' character(s) long.');

        if (schema.pattern && !instance.match(schema.pattern))
            addError('Regex pattern /' + schema.pattern + '/ is a mismatch.');
    };

    if ('number' == type) {
        if (schema.multipleOf !== undefined && instance / schema.multipleOf % 1 != 0)
            addError('The instance is required to be a multiple of ' + schema.multipleOf + '.');

        if (schema.maximum !== undefined) {
            if (!schema.exclusiveMaximum && schema.maximum < instance)
                addError('The instance must have a maximum value of ' + schema.maximum + '.');

            if (schema.exclusiveMaximum && schema.maximum <= instance)
                addError('The instance must be lower than ' + schema.maximum + '.');
        };

        if (schema.minimum !== undefined) {
            if (!schema.exclusiveMinimum && schema.minimum > instance)
                addError('The instance must have a minimum value of ' + schema.minimum + '.');

            if (schema.exclusiveMinimum && schema.minimum >= instance)
                addError('The instance must be greater than ' + schema.minimum + '.');
        };
    };

    if (schema['enum']) {
        items = schema['enum'];
        l = items.length;
        for (i = 0, found = 0; i < l && !found; i++)
            if (areEqual(items[i], instance))
                found = 1;

        if (!found) addError('The instance must have one of the following values: ' + items.join(', ') + '.');
    };

    if (schema.allOf) {
        schema.allOf.forEach(function(schema) {
            errors = errors.concat(validate(instance, schema, path));
        });
    };

    if (schema.anyOf) {
        items = schema.anyOf;
        l = items.length;
        for(i = 0, found = 0; i < l && !found; i++)
            if (!validate(instance, items[i], path).length)
                found = 1;

        if (!found) addError('The instance must validate against at least one schema defined by the "anyOf" keyword.');
    };

    if (schema.oneOf) {
        items = schema.oneOf;
        l = items.length;
        for (i = 0, found = 0; i < l; i++)
            if (!validate(instance, items[i], path).length) {
                if (found) {
                    addError('The instance must validate against exactly one schema defined by the "oneOf" keyword.');
                    break;
                }
                found = 1;
            }

        if (!found) {
            addError('The instance must validate against one schema defined by the "oneOf" keyword.');            
        };
    };

    if (schema.not && !validate(instance, schema.not, path).length)
        addError('The instance must not validate against the schema defined by the "not" keyword.');

    return errors;
};
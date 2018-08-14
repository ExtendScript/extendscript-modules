#include '../create.js'

var person = {
  isHuman: false,
  getIntroduction: function () {
    return 'My name is ' + this.name + '. Am I human? ' + this.isHuman;
  }
};

var me = Object.create(person);

me.name = "Matthew"; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten

$.writeln( me.getIntroduction() === "My name is Matthew. Am I human? true");

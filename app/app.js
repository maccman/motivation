(function(){

var $  = document.getElementById.bind(document);
var $$ = document.querySelectorAll.bind(document);

var App = function($el){
  this.$el = $el;
  this.load();

  this.$el.addEventListener(
    'submit', this.submit.bind(this)
  );

  if (this.dob) {
    this.renderAgeLoop();
  } else {
    this.renderChoose();
  }
};

App.fn = App.prototype;
App.fn.load = function(){
  var value;

  if (value = localStorage.dob)
    this.dob     = new Date(parseInt(value));
    this.showAge = localStorage.showAge;
};

App.fn.save = function(){
  if (this.dob)
    localStorage.dob     = this.dob.getTime();
    localStorage.showAge = this.showAge;
};

App.fn.submit = function(e){
  e.preventDefault();

  var input    = this.$$('input')[0];
  var checkbox = this.$$('input')[1];
  if ( !input.valueAsDate ) return;

  this.dob     = input.valueAsDate;
  this.showAge = checkbox.checked;

  this.save();
  this.renderAgeLoop();
};

App.fn.renderChoose = function(){
  this.html(this.view('dob')());
};

App.fn.renderAgeLoop = function(){
  if (this.showAge === 'true' || this.showAge === true)
    this.age = "AGE";

  this.html(this.view('age')({
    showAge: this.age
  }));
  this.interval = setInterval(this.renderAge.bind(this), 100);
};

App.fn.renderAge = function(){
  var now       = new Date;
  var duration  = now - this.dob;
  var years     = duration / 31556900000;

  var majorMinor = years.toFixed(9).toString().split('.');

  requestAnimationFrame(function(){
    this.html(this.view('age')({
      year:         majorMinor[0],
      milliseconds: majorMinor[1],
      showAge:      this.age
    }));
  }.bind(this));
};

App.fn.$$ = function(sel){
  return this.$el.querySelectorAll(sel);
};

App.fn.html = function(html){
  this.$el.innerHTML = html;
};

App.fn.view = function(name){
  var $el = $(name + '-template');
  return Handlebars.compile($el.innerHTML);
};

window.app = new App($('app'))

})();

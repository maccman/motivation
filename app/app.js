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
    this.dob = moment.unix(value);
};

App.fn.save = function(){
  if (this.dob)
    localStorage.dob = this.dob.unix();
};

App.fn.submit = function(e){
  e.preventDefault();

  var input = this.$$('input')[0];
  if ( !input.valueAsDate ) return;

  this.dob  = moment(input.valueAsDate);
  this.save();
  this.renderAgeLoop();
};

App.fn.renderChoose = function(){
  this.html(this.view('dob')());
};

App.fn.renderAgeLoop = function(){
  this.interval = setInterval(this.renderAge.bind(this), 100);
};

App.fn.renderAge = function(){
  var now       = moment();
  var duration  = moment.duration(now.diff(this.dob));

  var previousBday = moment({
    month: this.dob.month(),
    day:   this.dob.day(),
    year:  now.year() - 1
  });

  var previousBdayDuration = moment.duration(now.diff(previousBday));

  requestAnimationFrame(function(){
    this.html(this.view('age')({
      year:         duration.years(),
      milliseconds: previousBdayDuration.asMilliseconds()
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
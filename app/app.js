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
    this.renderAge();
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
  if ( !input.value ) return;

  this.dob = moment(input.value, 'YYYY-MM-DD');
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
  var lastBdayYear = now.year();

  if (this.dob.month() < now.month()) {
    lastBdayYear--;
  }
  else if (this.dob.month() === now.month()) {
    if (this.dob.date() > now.date()) {
      lastBdayYear--;
    }
  }

  var previousBday = moment({
    month: this.dob.month(),
    day:   this.dob.date(),
    year:  lastBdayYear
  });

  var previousBdayDuration = moment.duration(now.diff(previousBday));

  var yearLeftPercentage = (previousBdayDuration.asMilliseconds() / 31557600000).toString();
  yearLeftPercentage = yearLeftPercentage.substring(2, yearLeftPercentage.length);

  requestAnimationFrame(function(){
    this.html(this.view('age')({
      year:         duration.years(),
      milliseconds: yearLeftPercentage
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

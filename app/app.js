(function(){

var $  = document.getElementById.bind(document);
var $$ = document.querySelectorAll.bind(document);

var App = function($el){
  this.$el = $el;
  this.load();
};

App.fn = App.prototype;

App.fn.load = function(){
  this.renderAgeLoop();
};

App.fn.renderAgeLoop = function(){
  this.interval = setInterval(this.renderAge.bind(this), 100);
};

App.fn.renderAge = function(timeLeft){
  var now = new Date(Date.now());
  var timeLeft = countdown( new Date(now.getFullYear(), now.getMonth(), now.getDay()+6) ).toString();

  requestAnimationFrame(function(){
    this.html(this.view('age')({
      timeLeft: timeLeft,
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
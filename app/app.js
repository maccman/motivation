(function(){

var $  = document.getElementById.bind(document);
var $$ = document.querySelectorAll.bind(document);

var App = function($el){
  this.$el = $el;
  this.load();
  this.renderAgeLoop();
};


App.fn = App.prototype;

App.fn.load = function(){
  var value;

  if (value = localStorage.dob)
    this.dob = new Date(parseInt(value));
};

App.fn.renderAgeLoop = function(){
  this.interval = setInterval(this.renderAge.bind(this), 100);
};

App.fn.renderAge = function(){
  var now       = new Date;
  var duration  = now - this.dob;
  var seconds     = duration / 1000;

  var majorMinor = seconds.toFixed(4).toString().split('.');

  requestAnimationFrame(function(){
    // console.log(this.view('age'), "<= thisviewage");
    this.html(this.view('age')({
      year:         majorMinor[0],
      milliseconds: majorMinor[1]
    }));
  }.bind(this));
};

App.fn.html = function(html){
  // console.log(html);
  this.$el.innerHTML = html;
};

App.fn.view = function(name){

  var $el = $(name + '-template');
  // console.log($el.innerHTML, "<= $el.innerHTML");
  return Handlebars.compile($el.innerHTML);
};

app = new App($('secCount'));
console.log(app, "<=app at bottom");
// console.log(app);
app.dob = new Date;
})();

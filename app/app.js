(function(){

var $  = document.getElementById.bind(document);
var $$ = document.querySelectorAll.bind(document);

// These are the 2015 United States Social Security actuarial data tables for life expectancy - each line is male, then female.
// Age in years is the array offset, starting from 0. Max age is 119.
// Yes, there are cases where - especially just before your birthday - you can be assumed to be dead already.
var actuarial_data =
[
  [76.15, 80.97],
  [75.63, 80.41],
  [74.67, 79.44],
  [73.69, 78.45],
  [72.71, 77.47],
  [71.72, 76.48],
  [70.73, 75.48],
  [69.74, 74.49],
  [68.75, 73.5],
  [67.76, 72.51],
  [66.76, 71.51],
  [65.77, 70.52],
  [64.78, 69.53],
  [63.79, 68.53],
  [62.8, 67.54],
  [61.82, 66.56],
  [60.84, 65.57],
  [59.88, 64.59],
  [58.91, 63.61],
  [57.96, 62.63],
  [57.01, 61.65],
  [56.08, 60.67],
  [55.14, 59.7],
  [54.22, 58.73],
  [53.29, 57.76],
  [52.37, 56.79],
  [51.44, 55.82],
  [50.52, 54.85],
  [49.59, 53.88],
  [48.67, 52.92],
  [47.75, 51.95],
  [46.82, 50.99],
  [45.9, 50.03],
  [44.98, 49.07],
  [44.06, 48.11],
  [43.14, 47.16],
  [42.22, 46.2],
  [41.3, 45.25],
  [40.38, 44.3],
  [39.46, 43.35],
  [38.54, 42.41],
  [37.63, 41.46],
  [36.72, 40.52],
  [35.81, 39.59],
  [34.9, 38.65],
  [34.0, 37.72],
  [33.11, 36.8],
  [32.22, 35.88],
  [31.34, 34.96],
  [30.46, 34.06],
  [29.6, 33.15],
  [28.75, 32.26],
  [27.9, 31.37],
  [27.07, 30.49],
  [26.25, 29.61],
  [25.43, 28.74],
  [24.63, 27.88],
  [23.83, 27.02],
  [23.05, 26.17],
  [22.27, 25.32],
  [21.51, 24.48],
  [20.75, 23.64],
  [20.0, 22.81],
  [19.27, 21.99],
  [18.53, 21.17],
  [17.81, 20.36],
  [17.09, 19.55],
  [16.38, 18.76],
  [15.68, 17.98],
  [14.98, 17.2],
  [14.3, 16.44],
  [13.63, 15.69],
  [12.97, 14.96],
  [12.33, 14.24],
  [11.7, 13.54],
  [11.08, 12.85],
  [10.48, 12.17],
  [9.89, 11.51],
  [9.33, 10.86],
  [8.77, 10.24],
  [8.24, 9.63],
  [7.72, 9.04],
  [7.23, 8.48],
  [6.75, 7.93],
  [6.3, 7.41],
  [5.87, 6.91],
  [5.45, 6.43],
  [5.06, 5.98],
  [4.69, 5.54],
  [4.35, 5.14],
  [4.03, 4.76],
  [3.73, 4.41],
  [3.46, 4.09],
  [3.21, 3.8],
  [2.99, 3.54],
  [2.8, 3.3],
  [2.63, 3.09],
  [2.48, 2.9],
  [2.34, 2.73],
  [2.22, 2.57],
  [2.11, 2.42],
  [2.0, 2.27],
  [1.89, 2.14],
  [1.79, 2.0],
  [1.69, 1.88],
  [1.59, 1.76],
  [1.5, 1.64],
  [1.41, 1.53],
  [1.33, 1.43],
  [1.25, 1.33],
  [1.17, 1.24],
  [1.1, 1.15],
  [1.03, 1.06],
  [0.96, 0.98],
  [0.89, 0.9],
  [0.83, 0.83],
  [0.77, 0.77],
  [0.71, 0.71],
  [0.66, 0.66],
  [0.61, 0.61]
]

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

  if (value = localStorage.dob) {
    this.dob = new Date(parseInt(value));
    this.ageMethod = localStorage.ageMethod;
  }
};

App.fn.save = function(){
  if (this.dob) {
    localStorage.dob = this.dob.getTime();
    localStorage.ageMethod = this.ageMethod;
  }
};

App.fn.submit = function(e){
  e.preventDefault();

  var input = document.getElementById('dob');
  if ( !input.valueAsDate ) return;

  this.dob = input.valueAsDate;
  this.ageMethod = document.getElementById("age_method").value;

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
  var now       = new Date;
  var age       = now - this.dob;
  var duration;
  var timeAgeText = "AGE";

  if("up" === this.ageMethod) {
      duration = age;
  } else {
      var ageYears = parseInt(age / 31556900000);
      if(ageYears > 119) ageYears = 119;  // Highest we have actuarial data for

      timeAgeText = "TIME";

      var expected_final_age;
      if("down_male" === this.ageMethod) {
          expected_final_age = actuarial_data[ageYears][0] + ageYears;
      } else if("down_female" === this.ageMethod) {
          expected_final_age = actuarial_data[ageYears][1] + ageYears;
      } else if("down_100" === this.ageMethod) {
          expected_final_age = 100.0;
      }

      var expiry = parseInt(this.dob.getTime()) + expected_final_age * 31556900000.0;
      duration = expiry - now;
      if(duration < 0.0) duration = 0.0;
  }

  var years      = duration / 31556900000;
  var majorMinor = years.toFixed(9).toString().split('.');

  requestAnimationFrame(function(){
    this.html(this.view('age')({
      year:         majorMinor[0],
      milliseconds: majorMinor[1]
    }));
    document.getElementById("age-time-label").textContent = timeAgeText;
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

/***********************************************************************
 * App Controllers. These controllers will be called on page initialization. *
 ***********************************************************************/

myApp.controllers = {

  progress: function (page) {
    this.chartFunction(page);
  },

  profile: function(page) {
    document.querySelector('#progressButton').onclick = function() {
      document.querySelector('#myNavigator').pushPage('html/progress.html');
    };
    document.querySelector('#recommendationsButton').onclick = function() {
      document.querySelector('#myNavigator').pushPage('html/recommendations.html');
    };
  },

  signup: function(page) {
    this.maskPassword('signupPassword');
    this.maskPassword('signupConfirmPassword');

    document.querySelector('#signupStudent').onclick = function() {
      document.querySelector('#myNavigator').pushPage('html/makeProfile.html');
    };
  },

  makeProfile: function(page) {
    document.querySelector('#survey').onclick = function() {
      document.querySelector('#myNavigator').pushPage('html/survey.html');
    };
  },

  survey: function(page) {
    document.querySelector('#nextHome').onclick = function() {
      document.querySelector('#myNavigator').pushPage('html/main.html');
    };
  },

  messages: function(page) {
    let elements = page.querySelectorAll('.message-card');
    for(let i=0; i < elements.length; i++) {
      elements[i].onclick = function () {
        document.querySelector('#myNavigator').pushPage('html/chatwindow.html');
      }
    }
  },

  /* Referenced from https://www.chartjs.org/docs/latest/samples/area/line-stacked.html*/
  chartFunction: function (page) {
    Chart.defaults.global.defaultColor= 'rgba(33,56,67,1)';
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var config = {
      type: 'line',
      data: {
        labels: ['May', 'June', 'July'],
        datasets: [{
          label: 'My First dataset',
          fontColor: "#FFFFFF",
          borderColor: 'rgba(255, 255, 255, 0.8)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          data: [
            50, 40, 5
          ],
        }, {
          label: 'My Second dataset',
          fontColor: "#FFFFFF",
          borderColor: 'rgba(166, 227, 198, 0.8)',
          backgroundColor: 'rgba(166, 227, 198, 0.8)',
          data: [
            0, 50, 30
          ],
        }]
      },
      options: {
        responsive: true,
        title: {
          display: false,
          text: 'Chart.js Line Chart - Stacked Area'
        },
        tooltips: {
          mode: 'index',
        },
        hover: {
          mode: 'index'
        },
        legend: {
          display: false,
          labels: {
            fontColor: "#FFFFFF"
          }
        },
        scales: {
          xAxes: [{
            ticks:{
              display: true,
              fontColor: "#FFFFFF"
            },
            display:true,
            gridLines: {
              display: false,
              color: "#FFFFFF"
            },
            scaleLabel: {
              display: false,
              labelString: 'Month',
              fontColor: "#FFFFFF",
            }
          }],
          yAxes: [{
            ticks:{
              display: true,
              stepSize: 50,
              fontColor: "#FFFFFF"
            },
            display: true,
            gridLines: {
              display: false,
              color: "#FFFFFF"
            },
            stacked: true,
            scaleLabel: {
              display: false,
              fontColor: "#FFFFFF",
              labelString: 'Value',
            }
          }]
        }
      }
    };

    var ctx = page.getElementsByClassName('canvas')[0].getContext('2d');
    window.myLine = new Chart(ctx, config);

    var colorNames = Object.keys(window.chartColors);
  },

  home: function (page){
    document.querySelector('#progressChart').onclick = function() {
      document.querySelector('#myNavigator').pushPage('html/progress.html');
    };

    document.querySelector('#moreRecommendations').onclick = function() {
      document.querySelector('#myNavigator').pushPage('html/recommendations.html');
    };
    this.chartFunction(page);
  },


  tabbarPage: function(page) {
    this.maskPassword('loginPassword');

    document.querySelector('#login').onclick = function() {
      document.querySelector('#myNavigator').pushPage('html/main.html');
    };

    document.querySelector('#clickButton').onclick = function() {
      document.querySelector('#myNavigator').pushPage('html/signup.html');
    };
  },


  menuPage: function(page) {
    myApp.services.categories.bindOnCheckboxChange(page.querySelector('#default-category-list ons-list-item[category-id=""]'));
    myApp.services.categories.bindOnCheckboxChange(page.querySelector('#default-category-list ons-list-item:not([category-id])'));

    document.querySelector('#mySplitter').left.setAttribute('animation', ons.platform.isAndroid() ? 'overlay' : 'reveal');
  },


  maskPassword: function(id) {
    var text;
    var stars;

    function ShowCharacter() {
      document.querySelector('#'+id).value = stars
    }

    document.querySelector('#'+id).onkeydown = function(e) {
      var keycode = e.keyCode ? e.keyCode : e.charCode
      if((keycode>=48 && keycode<=90) || (keycode>=96 && keycode<=111) || (keycode>=186 && keycode<=192) || (keycode>=219 && keycode<=222)){
        if (stars)
          stars += '*';
        else
          stars = '*'
      }
    };
    document.querySelector('#'+id).onkeyup = function(e) {
      var keycode = e.keyCode ? e.keyCode : e.charCode
      if((keycode>=48 && keycode<=90) || (keycode>=96 && keycode<=111) || (keycode>=186 && keycode<=192) || (keycode>=219 && keycode<=222)){
        if (text) {
          text += e.target.value.replace(stars.substring(0, stars.length - 1), "");
        } else {
          text = e.target.value.replace(stars.substring(0, stars.length - 1), "");
        }
        ShowCharacter();
      }
    }
  }
};

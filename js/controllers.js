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
  //////////////////////////
  // Tabbar Page Controller //
  //////////////////////////
  tabbarPage: function(page) {

    this.maskPassword('loginPassword');

    document.querySelector('#login').onclick = function() {
      document.querySelector('#myNavigator').pushPage('html/main.html');
    };

    document.querySelector('#clickButton').onclick = function() {
      document.querySelector('#myNavigator').pushPage('html/signup.html');
    };
    // Set button functionality to open/close the menu.
    // page.querySelector('[component="button/menu"]').onclick = function() {
    //   document.querySelector('#mySplitter').left.toggle();
    // };
    //
    // // Set button functionality to push 'new_task.html' page.
    // Array.prototype.forEach.call(page.querySelectorAll('[component="button/new-task"]'), function(element) {
    //   element.onclick = function() {
    //     document.querySelector('#myNavigator').pushPage('html/new_task.html');
    //   };
    //
    //   element.show && element.show(); // Fix ons-fab in Safari.
    // });
    //
    // // Change tabbar animation depending on platform.
    // page.querySelector('#myTabbar').setAttribute('animation', ons.platform.isAndroid() ? 'slide' : 'none');
  },

  //////////////////////////
  // Menu Page Controller /
  ////////////////////////
  menuPage: function(page) {
    // Set functionality for 'No Category' and 'All' default categories respectively.
    myApp.services.categories.bindOnCheckboxChange(page.querySelector('#default-category-list ons-list-item[category-id=""]'));
    myApp.services.categories.bindOnCheckboxChange(page.querySelector('#default-category-list ons-list-item:not([category-id])'));

    // Change splitter animation depending on platform.
    document.querySelector('#mySplitter').left.setAttribute('animation', ons.platform.isAndroid() ? 'overlay' : 'reveal');
  },

  ////////////////////////////
  // New Task Page Controller //
  ////////////////////////////
  newTaskPage: function(page) {
    // Set button functionality to save a new task.
    Array.prototype.forEach.call(page.querySelectorAll('[component="button/save-task"]'), function(element) {
      element.onclick = function() {
        var newTitle = page.querySelector('#title-input').value;

        if (newTitle) {
          // If input title is not empty, create a new task.
          myApp.services.tasks.create(
            {
              title: newTitle,
              category: page.querySelector('#category-input').value,
              description: page.querySelector('#description-input').value,
              highlight: page.querySelector('#highlight-input').checked,
              urgent: page.querySelector('#urgent-input').checked
            }
          );

          // Set selected category to 'All', refresh and pop page.
          document.querySelector('#default-category-list ons-list-item ons-radio').checked = true;
          document.querySelector('#default-category-list ons-list-item').updateCategoryView();
          document.querySelector('#myNavigator').popPage();

        } else {
          // Show alert if the input title is empty.
          ons.notification.alert('You must provide a task title.');
        }
      };
    });
  },

  ////////////////////////////////
  // Details Task Page Controller //
  ///////////////////////////////
  detailsTaskPage: function(page) {
    // Get the element passed as argument to pushPage.
    var element = page.data.element;

    // Fill the view with the stored data.
    page.querySelector('#title-input').value = element.data.title;
    page.querySelector('#category-input').value = element.data.category;
    page.querySelector('#description-input').value = element.data.description;
    page.querySelector('#highlight-input').checked = element.data.highlight;
    page.querySelector('#urgent-input').checked = element.data.urgent;

    // Set button functionality to save an existing task.
    page.querySelector('[component="button/save-task"]').onclick = function() {
      var newTitle = page.querySelector('#title-input').value;

      if (newTitle) {
        // If input title is not empty, ask for confirmation before saving.
        ons.notification.confirm(
          {
            title: 'Save changes?',
            message: 'Previous data will be overwritten.',
            buttonLabels: ['Discard', 'Save']
          }
        ).then(function(buttonIndex) {
          if (buttonIndex === 1) {
            // If 'Save' button was pressed, overwrite the task.
            myApp.services.tasks.update(element,
              {
                title: newTitle,
                category: page.querySelector('#category-input').value,
                description: page.querySelector('#description-input').value,
                ugent: element.data.urgent,
                highlight: page.querySelector('#highlight-input').checked
              }
            );

            // Set selected category to 'All', refresh and pop page.
            document.querySelector('#default-category-list ons-list-item ons-radio').checked = true;
            document.querySelector('#default-category-list ons-list-item').updateCategoryView();
            document.querySelector('#myNavigator').popPage();
          }
        });

      } else {
        // Show alert if the input title is empty.
        ons.notification.alert('You must provide a task title.');
      }
    };
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

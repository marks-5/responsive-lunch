var menu = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: []
}

var days = [
 "sunday",
 "monday",
 "tuesday",
 "wednesday",
 "thursday",
 "friday",
 "saturday"
]

var dayName = days[(new Date).getDay()];

$(function(){

  // A row is a row in the spreadsheet, e.g:
  // {
  //   rowNumber: 2,
  //   type: "Soup",
  //   monday: "M&S Thai Chicken",
  //   tuesday: "M&S Spicy Lentil",
  //   wednesday: "M&S Haddock Chowder",
  //   thursday: "M&S Cream of Tomato",
  //   friday: "M&S Morrocan Chicken"
  // }
  var parseRow = function(row) {
    if (row.type === 'date') { return; }

    for (var day in row) {
      if (menu.hasOwnProperty(day)) {
        var meal = {
          type: row.type,
          name: row[day]
        }

        menu[day].push(meal)
      }
    }
  }

  // A sheet is a array of rows
  var parseSheet = function(sheet) {
    for (var rowNumber in sheet) {
      var row = sheet[rowNumber];
      parseRow(row);
    }
    console.log(menu)
  }

  var parseSpreadsheet = function(spreadsheet, tabletop) {
    var sheet = spreadsheet.Sheet1.all();
    parseSheet(sheet);
    putDataInPage();
  }

  var putDataInPage = function() {
    //Running Handlebars so the JSON retrieved from the Google spreadsheet can be put in the html
    var source = $('#meal-template').html();
    var template = Handlebars.compile(source);
    var html = template(menu);
    $('body').append(html);
    //Hide all the days and then show just monday
    $('.day').hide();
    $currentDay = $('#' + dayName);
    $currentDay.show();
    $('.next-day').click(showNextDay);
    $('.previous-day').click(showPreviousDay);
  }

  var $currentDay;
  //show the next day
  var showNextDay = function() {
    $currentDay.hide();
    $currentDay = $currentDay.next();
    $currentDay.show();
    ga('send', 'event', 'navigation', 'Click', 'nextDay');
  }
  //show the previous day
  var showPreviousDay = function() {
    $currentDay.hide();
    $currentDay = $currentDay.prev();
    $currentDay.show();
    ga('send', 'event', 'navigation', 'Click', 'previousDay');
  }


  Tabletop.init( { key: '0Anc6UVEZwROtdFNwQlRXSFo3dEhQdldUVEE2SmxZVmc',
                   callback: parseSpreadsheet,
                   simpleSheet: false } )

});

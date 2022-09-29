//creating dataSets
var india = [
  { group: "Wins", value: 7 },
  { group: "Loss", value: 1 },
  { group: "Draw", value: 0 },
  { group: "No Result", value: 1 },
];
var australia = [
  { group: "Wins", value: 7 },
  { group: "Loss", value: 2 },
  { group: "Draw", value: 0 },
  { group: "No Result", value: 0 },
];
var england = [
  { group: "Wins", value: 6 },
  { group: "Loss", value: 3 },
  { group: "Draw", value: 0 },
  { group: "No Result", value: 0 },
];
var newZealand = [
  { group: "Wins", value: 5 },
  { group: "Loss", value: 3 },
  { group: "Draw", value: 0 },
  { group: "No Result", value: 1 },
];
var pakistan = [
  { group: "Wins", value: 5 },
  { group: "Loss", value: 3 },
  { group: "Draw", value: 0 },
  { group: "No Result", value: 1 },
];
var sriLanka = [
  { group: "Wins", value: 3 },
  { group: "Loss", value: 4 },
  { group: "Draw", value: 0 },
  { group: "No Result", value: 2 },
];
var southAfrica = [
  { group: "Wins", value: 3 },
  { group: "Loss", value: 5 },
  { group: "Draw", value: 0 },
  { group: "No Result", value: 1 },
];
var bangladesh = [
  { group: "Wins", value: 3 },
  { group: "Loss", value: 5 },
  { group: "Draw", value: 0 },
  { group: "No Result", value: 1 },
];
var westIndies = [
  { group: "Wins", value: 2 },
  { group: "Loss", value: 6 },
  { group: "Draw", value: 0 },
  { group: "No Result", value: 1 },
];
var afghanistan = [
  { group: "Wins", value: 0 },
  { group: "Loss", value: 9 },
  { group: "Draw", value: 0 },
  { group: "No Result", value: 0 },
];

var margin = { top: 30, right: 30, bottom: 70, left: 60 },
  width = 460 - margin.left - margin.right, //370
  height = 400 - margin.top - margin.bottom; //300

//Update function for plotting
function pointsGraph(data) {
  var chart1 = d3
    .select("#pointsGraph")
    .append("svg")
    .attr("width", width + margin.left + margin.right) //460
    .attr("height", height + margin.top + margin.bottom) //400
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // console.log(typeof india);
  // console.log(india);
  var x = d3
    .scaleBand()
    .domain(
      india.map(function (d) {
        return d.group;
      })
    )
    .range([0, width])
    .padding([0.2]);
  chart1
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  //Y Axis
  var y = d3.scaleLinear().domain([0, 9]).range([height, 0]);
  chart1.append("g").attr("class", "myYaxis").call(d3.axisLeft(y));

  //Variable u
  var updateChart1 = chart1.selectAll("rect").data(data);

  updateChart1
    .enter()
    .append("rect")
    .attr("id", "results")
    .merge(updateChart1)
    .transition()
    .duration(800)
    .attr("x", function (d) {
      return x(d.group);
    })
    .attr("y", function (d) {
      return y(d.value);
    })
    .attr("width", x.bandwidth())
    .attr("height", function (d) {
      return height - y(d.value);
    })
    .style("fill", "#69b3a2")
    .delay((d, i) => {
      return i * 100;
    });
}

/* spent so much time on fetching the data out of the csv, 
mapping it and filtering it for getting the match data 
for a particular team on button click. Ignore the function below this, 
it is just a testing function. It will just print many logs into
the console, nothing much xD. */

//Testing function
function testingFunction(teamName) {
  //function parameter is a string named => {teamName}
  //Loading CSV and working on the data

  d3.csv("data/worldCup.csv", function (data) {
    //Grouping the csv data => teams

    var allGroup = d3
      .map(data, function (d) {
        //let a = d.team1;
        //let b = d.team2;
        // console.log(d.team1);
        // console.log(d.team2);
        //console.log(typeof d.team1);

        return d.team1;
      })
      .keys();

    // Searching the object {allGroup} to find the element {teamName}

    function searchTeam(team, objectName) {
      for (var i = 0; i < objectName.length; i++) {
        if (objectName[i] === team) {
          return objectName[i];
        }
      }
    }
    let selectedTeams = searchTeam(teamName, allGroup);

    //LOGS
    // console.log(teamName);
    // console.log(typeof allGroup);
    // console.log(allGroup);
    // console.log(selectedTeams);

    /* Filtering the data to find out match information for the teams
    whose name start with the {teamName} */

    var dataFilter = data.filter((d) => {
      var __team1 = d.team1 == selectedTeams;
      var __team2 = d.team2 == selectedTeams;
      if (__team1 == false) {
        return __team2;
      } else if (__team2 == false) {
        return __team1;
      } else {
        return __team1 + __team2;
      }
    });

    //LOGS
    //console.log(dataFilter);

    /* Looping through the team match data. And extracting list of 
    matched played by particular team {teamName}*/
    function teamMatch() {
      //console.log(dataFilter.length);
      let matches = new Array();
      var i = 0;
      for (var i = 0; i < dataFilter.length; i++) {
        matches.push(dataFilter[i].match);
      }
      //console.log(matches);
    }

    //function Call
    teamMatch();
  });
}

function lineGraph(teamName) {
  //Chart 2
  var chart2 = d3
    .select("#lineGraph")
    .append("svg")
    .attr("width", width + margin.left + margin.right + width) //460 + 100
    .attr("height", height + margin.top + margin.bottom) //400
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // console.log("- - - - - - - - - - - - - - - - -");
  // console.log("- - - - - - - - - - - - - - - - -");
  // console.log(`- - ${teamName} - -`);
  // console.log("- - - - - - - - - - - - - - - - -");
  // console.log("- - - - - - - - - - - - - - - - -");

  //Loading CSV
  d3.csv("data/worldCup.csv", function (data) {
    var allGroup = d3
      .map(data, function (d) {
        return d.team1;
      })
      .keys();

    function searchTeam(team, objectName) {
      for (var i = 0; i < objectName.length; i++) {
        if (objectName[i] === team) {
          return objectName[i];
        }
      }
    }

    let selectedTeam = searchTeam(teamName, allGroup);

    var dataFilter = data.filter((d) => {
      var __team1 = d.team1 == selectedTeam;
      var __team2 = d.team2 == selectedTeam;
      if (__team1 == false) {
        return __team2;
      } else if (__team2 == false) {
        return __team1;
      } else {
        return __team1 + __team2;
      }
    });

    let matches = new Array();
    var i = 0;
    for (var i = 0; i < dataFilter.length; i++) {
      matches.push(dataFilter[i].match);
    }

    //X axis
    // console.log(matches);
    // console.log(typeof matches);
    var x = d3
      .scaleBand()
      .domain(matches)
      .range([
        0,
        width + margin.bottom + margin.left + margin.right + margin.top,
      ])
      .padding(1);

    chart2
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    //Y axis
    var y = d3.scaleLinear().domain([0, 400]).range([height, 0]);
    chart2.append("g").call(d3.axisLeft(y));

    //Lines
    //Selected Team Runs
    chart2
      .append("g")
      .append("path")
      .datum(dataFilter)
      .attr(
        "d",
        d3
          .line()
          .x((d) => {
            return x(d.match);
          })
          .y((d) => {
            if (d.team1 == teamName) {
              return y(d.team1Total);
            } else if (d.team2 == teamName) {
              return y(d.team2Total);
            }
          })
      )
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
      .style("fill", "none");

    //Dots
    chart2
      .append("g")
      .selectAll("myDots")
      .data(dataFilter)
      .enter()
      .append("circle")
      .attr("cx", (d) => {
        return x(d.match);
      })
      .attr("cy", (d) => {
        if (d.team1 == teamName) {
          return y(d.team1Total);
        } else if (d.team2 == teamName) {
          return y(d.team2Total);
        }
      })
      .attr("r", 5)
      .attr("fill", "#69b3a2");

    //Opposite Team Runs
    chart2
      .append("g")
      .append("path")
      .datum(dataFilter)
      .attr(
        "d",
        d3
          .line()
          .x((d) => {
            return x(d.match);
          })
          .y((d) => {
            if (d.team1 != teamName) {
              return y(d.team1Total);
            } else if (d.team2 != teamName) {
              return y(d.team2Total);
            }
          })
      )
      .attr("stroke", "#242424")
      .attr("stroke-width", 1.5)
      .style("fill", "none");

    //Dots
    chart2
      .append("g")
      .selectAll("myDots")
      .data(dataFilter)
      .enter()
      .append("circle")
      .attr("cx", (d) => {
        return x(d.match);
      })
      .attr("cy", (d) => {
        if (d.team1 != teamName) {
          return y(d.team1Total);
        } else if (d.team2 != teamName) {
          return y(d.team2Total);
        }
      })
      .attr("r", 5)
      .attr("fill", "#242424");
  });
}

d3.csv("data/pointsTable.csv", (error, data) => {
  if (error) console.log(error);
  else pieChart(data);
});

function pieChart(incomingData) {
  //Dimensions and Margins
  var width = 950,
    height = 550,
    margin = 40;

  var pieC = d3.pie();
  var nArc = d3.arc();

  nArc.innerRadius(0).outerRadius(180);

  pieC.value((d) => d.wins).sort(null);

  var myPie = pieC(incomingData);

  //Colorscale
  var colorScale = d3
    .scaleOrdinal()
    .range([
      "#00B0FF",
      "#FFEB3B",
      "#18FFFF",
      "#212121",
      "#4CAF50",
      "#1A237E",
      "#CDDC39",
      "#1B5E20",
      "#8a0000",
      "#29B6F6",
    ]);

  var chart3 = d3
    .select("#pieChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  chart3
    .append("text")
    .attr("class", "title")
    .attr("x", 500)
    .attr("y", 40)
    .attr("text-anchor", "middle")
    .text("Most Wins in the ICC Cricket Worldcup 2019");

  /* Text Label */
  var pies = chart3
    .append("g")
    .attr("transform", "translate(" + width / 2 + ", " + height / 2 + ")")
    .selectAll("path")
    .data(myPie);

  pies
    .enter()
    .append("path")
    .attr("class", "slices")
    .attr("d", nArc)
    .style("fill", (d, i) => colorScale(i))
    .transition()
    .delay((d, i) => {
      i * 500;
    })
    .duration(500);

  var legends = chart3
    .append("g")
    .attr("transform", "translate(750, 100)")
    .selectAll(".legends")
    .data(myPie);
  var legend = legends
    .enter()
    .append("g")
    .classed("legends", true)
    .attr("transform", (d, i) => "translate(0, " + (i + 0) * 40 + ")");

  legend
    .append("rect")
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", (d) => colorScale(d.data.teams))
    .transition()
    .duration(300);

  legend
    .append("text")
    .transition()
    .duration(300)
    .text((d) => d.data.teams)
    .attr("fill", (d) => colorScale(d.data.teams))
    .attr("x", 30)
    .attr("y", 15);
}

function clearBar() {
  d3.selectAll("svg").remove();
}

function addGraph(id) {
  var title1 = (document.querySelector("#title1").innerHTML = "Team Points");
  var title2 = (document.querySelector("#title2").innerHTML =
    "Runs scored in matches");
  switch (id) {
    case "1":
      document.querySelector("#teamName").innerHTML = "India";
      title1;
      title2;
      clearBar();
      pointsGraph(india);
      lineGraph("India");
      testingFunction("India");
      break;
    case "2":
      document.querySelector("#teamName").innerHTML = "Australia";
      title1;
      title2;
      clearBar();
      pointsGraph(australia);
      lineGraph("Australia");
      break;
    case "3":
      document.querySelector("#teamName").innerHTML = "England";
      title1;
      title2;
      clearBar();
      pointsGraph(england);
      lineGraph("England");
      break;
    case "4":
      document.querySelector("#teamName").innerHTML = "New Zealand";
      title1;
      title2;
      clearBar();
      pointsGraph(newZealand);
      lineGraph("New Zealand");
      break;
    case "5":
      document.querySelector("#teamName").innerHTML = "Pakistan";
      title1;
      title2;
      clearBar();
      pointsGraph(pakistan);
      lineGraph("Pakistan");
      break;
    case "6":
      document.querySelector("#teamName").innerHTML = "Sri Lanka";
      title1;
      title2;
      clearBar();
      pointsGraph(sriLanka);
      lineGraph("Sri Lanka");
      break;
    case "7":
      document.querySelector("#teamName").innerHTML = "South Africa";
      title1;
      title2;
      clearBar();
      pointsGraph(southAfrica);
      lineGraph("South Africa");
      break;
    case "8":
      document.querySelector("#teamName").innerHTML = "Bangladesh";
      title1;
      title2;
      clearBar();
      pointsGraph(bangladesh);
      lineGraph("Bangladesh");
      break;
    case "9":
      document.querySelector("#teamName").innerHTML = "West Indies";
      title1;
      title2;
      clearBar();
      pointsGraph(westIndies);
      lineGraph("West Indies");
      break;
    case "10":
      document.querySelector("#teamName").innerHTML = "Afghanistan";
      title1;
      title2;
      clearBar();
      pointsGraph(afghanistan);
      lineGraph("Afghanistan");
      break;
  }
}

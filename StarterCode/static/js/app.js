function optionChanged(value){
    d3.json("samples.json").then((incomingData) => {
        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        // var subject = dropdownMenu.property("value");
    
        // Use filter() to pass the function as its argument
        var filteredMovies = incomingData.filter(filterMovieRatings);

        //  Check to make sure your are filtering your movies.
        console.log(filteredMovies);

        // Use the map method with the arrow function to return all the filtered movie titles.
        var titles = filteredMovies.map(movies =>  movies.title);

        // Use the map method with the arrow function to return all the filtered movie metascores.
        var ratings = filteredMovies.map(movies => movies.metascore);

        // Check your filtered metascores.
        console.log(ratings);

        // Create your trace.
        var trace = {
            x: titles,
            y: ratings,
            type: "bar"
        };

        // Create the data array for our plot
        var data = [trace];

        // Define the plot layout
        var layout = {
            title: "The highest critically acclaimed movies.",
            xaxis: { title: "Title" },
            yaxis: { title: "Metascore (Critic) Rating"}
        };

        // Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bar", data, layout);
        Plotly.newPlot("gauge", data, layout);
        Plotly.newPlot("bubble", data, layout);
    });
}
function init() {
    d3.json("samples.json").then((dataJ) => {
    var dropdownMenu = d3.select("#selDataset");
    dataJ['names'].forEach(d=> dropdownMenu.append('option').text(d))
    // .slice
    // var data = [{
    //   values: us,
    //   labels: labels,
    //   type: "pie"
    // }];
  
    // var layout = {
    //   height: 600,
    //   width: 800
    // };
    
    // Plotly.newPlot("pie", data, layout);
    // Plotly.newPlot("bar", data, layout);
    //     Plotly.newPlot("gauge", data, layout);
    //     Plotly.newPlot("bubble", data, layout);
  })
}

  
  // Function called by DOM changes
  
  init();
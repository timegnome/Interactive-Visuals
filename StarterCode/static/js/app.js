function optionChanged(value){
    d3.json("samples.json").then((incomingData) => {
        var info = d3.select("#sample-metadata");
        var otus =incomingData["samples"].filter(d => d.id === value)[0]['otu_ids']

        // Use the map method with the arrow function to return all the filtered movie metascores.
        var values =incomingData["samples"].filter(d => d.id === value)[0]['sample_values']

        var labels =incomingData["samples"].filter(d => d.id === value)[0]['otu_labels']
        metadata = incomingData["metadata"].filter(d => d.id === parseInt(value))[0]
        info.html('')
        info.append('p')
        .html(`<strong>ID: ${metadata['id']}</strong><br>
        <strong>Ethnicity: ${metadata['ethnicity']}</strong><br>
        <strong>Gender: ${metadata['gender']}</strong><br>
        <strong>Age: ${metadata['age']}</strong><br>
        <strong>Location: ${metadata['location']}</strong><br>
        <strong>Bbtype: ${metadata['bbtype']}</strong><br>
        <strong>Wfreq: ${metadata['wfreq']}</strong><br>`)
        //  forEach(d => {info.append('p').text(d); console.log(d);})
        //  Create your trace.
        var traceBar = [{
            type: "bar",
            x: otus.slice(0,10),
            y: values.slice(0,10),
            orientation: 'h'
        }];
        var traceGauge = [{
            type: "indicator",
            mode:"gauge+number",
            value: metadata['wfreq'],
            gauge: {
                axis: {range: [null, 9]}
                // steps:[
                //     { range: []}
                // ]
            }
        }];
        var traceBubble = [{
            x: otus,
            y: values,
            text: labels,
            mode: 'markers',
            marker: {
                size: values,
                color: otus
            }
        }];
        
        // Create the data array for our plot
        // Define the plot layout
        var layout = {
            // title: "The highest critically acclaimed movies.",
            // xaxis: { title: "Title" },
            // yaxis: { title: "Metascore (Critic) Rating"}
        };

        // Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bar", traceBar, layout);
        Plotly.newPlot("gauge", traceGauge, layout);
        Plotly.newPlot("bubble", traceBubble, layout);
    });
}
function init() {
    d3.json("samples.json").then((incomingData) => {
        var dropdownMenu = d3.select("#selDataset");
        incomingData['names'].forEach(d=> dropdownMenu.append('option').text(d))
        var info = d3.select("#sample-metadata");
        var value = dropdownMenu.property('value')
        var otus =incomingData["samples"].filter(d => d.id === value)[0]['otu_ids']

        // Use the map method with the arrow function to return all the filtered movie metascores.
        var values =incomingData["samples"].filter(d => d.id === value)[0]['sample_values']

        var labels =incomingData["samples"].filter(d => d.id === value)[0]['otu_labels']
        metadata = incomingData["metadata"].filter(d => d.id === parseInt(value))[0]
        info.html('')
        info.append('p')
        .html(`<strong>ID: ${metadata['id']}</strong><br>
        <strong>Ethnicity: ${metadata['ethnicity']}</strong><br>
        <strong>Gender: ${metadata['gender']}</strong><br>
        <strong>Age: ${metadata['age']}</strong><br>
        <strong>Location: ${metadata['location']}</strong><br>
        <strong>Bbtype: ${metadata['bbtype']}</strong><br>
        <strong>Wfreq: ${metadata['wfreq']}</strong><br>`)
        // console.log(values.slice(0,10).map(d => d.toString()))
        //  Create your trace.
        var traceGauge = [{
            type: "indicator",
            mode:"gauge+number",
            value: metadata['wfreq'],
            gauge: {
                axis: {range: [null, 9]}
                // steps:[
                //     { range: []}
                // ]
            }
        }];
        var traceBubble = [{
            x: otus,
            y: values,
            text: labels,
            mode: 'markers',
            marker: {
                size: values,
                color: otus
            }
        }];
        var traceBar = [{
            y: otus.slice(0,10).map(d => "OTU"+d.toString()),
            x: values.slice(0,10),
            type: "bar",
            orientation: 'h',
            marker:{
                width:1
            }
        }];
        // Define the plot layout
        var layout = {
            // title: "The highest critically acclaimed movies.",
            // xaxis: { title: "Title" },
            // yaxis: { title: "Metascore (Critic) Rating"}
        };

        Plotly.newPlot("bar", traceBar);
        Plotly.newPlot("gauge", traceGauge);
        Plotly.newPlot("bubble", traceBubble);
  })
}
init();
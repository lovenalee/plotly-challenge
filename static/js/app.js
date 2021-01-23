//Use the D3 library to read in samples.json
//Create a function to read and get data
  function getData(id) {
  
    d3.json("samples.json").then((data) => {
        console.log(data)
        
        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(`Washing Freq: ${wfreq}`)

        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        console.log(samples)

        var sampleValues = (samples.sample_values.slice(0, 10)).reverse();
        console.log(`Sample Values: ${sampleValues}`)

        var idValues = (samples.otu_ids.slice(0, 10)).reverse();
        console.log(`Id Values: ${idValues}`)

        var otuid = idValues.map(d => "OTU " + d)
        console.log(`OTU IDS: ${otuid}`)

        //Use otu_labels as the hovertext for the chart.
        var labels = samples.otu_labels.slice(0, 10);

        var trace = {
            x: sampleValues,
            y: otuid,
            text: labels,
            type:"bar",
            orientation: "h",
        };

        var data = [trace];

        var layout = {
            title: `Top 10 OTUs`,
            yaxis: {
              autorange: true,
              type: "linear"
            },
          };
        
        Plotly.newPlot("bar", data, layout);
    });
  }
  getData();
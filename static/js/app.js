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


        var labels = samples.otu_labels.slice(0, 10);




        var trace = {
            x: sampleValues,
            y: otuid,
            text: labels,
            type:"bar",
            orientation: "h",
            marker: {
              color: '#C8A2C8',
              line: {
                  width: 2
              }
          }
        };

        var data = [trace];

        var layout = {
            title: "Top 10 OTU",
            tittlefont: {sixe:30},
            autosize: false,
            width: 500,
            height: 500,
            yaxis:{
                tickmode:"linear",
            },
            plot_bgcolor: '#c8c8c8'
        };
        
        Plotly.newPlot("bar", data, layout);

        //bubble plot
        var trace1 = {
          x: samples.otu_ids,
          y: samples.sample_values,
          mode: "markers",
          marker: {
              size: samples.sample_values,
              color: samples.otu_ids
          },
          text: samples.otu_labels

      };

      var layout1 = {
          xaxis:{title: "OTU ID"},
          height: 600,
          width: 1300
      };


      var data1 = [trace1];

      Plotly.newPlot("bubble", data1, layout1); 

      // create gauge chart
      var trace2 = {
          domain: { x: [0, 1], y: [0, 1] },          
          value: wfreq,
          title: { text: "Belly Button Washing Frequency" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [null, 9] },
            steps: [
              { range: [0, 1], color: "aliceblue" },
              { range: [1, 2], color: "azure" },
              { range: [2, 3], color: "lightcyan" },
              { range: [3, 4], color: "powderblue" },
              { range: [4, 5], color: "lightblue" },
              { range: [5, 6], color: "lightskyblue" },
              { range: [6, 7], color: "deepskyblue" },
              { range: [7, 8], color: "cornflowerblue" },
              { range: [8, 9], color: "royalblue" },
            ],

          }
          
      }

      var data2 = [trace2]
      
      var layout2 = { width: 600, height: 500, margin: { t: 0, b: 0 } };
      
      Plotly.newPlot("gauge", data2, layout2)

  });    
}
  

function getInfo(id) {

  d3.json("samples.json").then((data)=> {
      

      var metadata = data.metadata;
      console.log(metadata)

      var result = metadata.filter(meta => meta.id.toString() === id)[0];

      var DemographicInfo = d3.select("#sample-metadata");
      
      DemographicInfo.html("");

      Object.entries(result).forEach((key) => {   
              DemographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
      });
  });
}


function init() {

  var dropdown = d3.select("#selDataset");

  d3.json("samples.json").then((data)=> {
      console.log(data)

      data.names.forEach(function(name) {
          dropdown.append("option").text(name).property("value");
      });

      getData(data.names[0]);
      getInfo(data.names[0]);
  });
}


function optionChanged(id) {
  getData(id);
  getInfo(id);
}

init();
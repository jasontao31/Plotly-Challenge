function createChart (sample){
    d3.json('samples.json').then((data)=>{
        var samples = data.samples;
        var dataArray = samples.filter(sampleObj => sampleObj.id == sample);
        var result = dataArray[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        console.log(otu_ids);
        console.log(otu_labels);
        console.log(sample_values);

        bar_values = [{
            type: "bar",
            orientation:'h',
            x: otu_ids.slice(0,10),
            y: sample_values.slice(0,10),
            text: otu_labels.slice(0,10)
        }];

        var bar_layout ={
            title: 'Top 10 OTUs',
            showlegend: false,
            height:500,
            width:900
        };

        Plotly.newPlot('bar', bar_values, bar_layout);

        var trace1 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            labels: otu_labels,
            marker: {
                color: otu_ids,
                size: sample_values,
                opacity: [1, 0.8, 0.6, 0.4],
                size: [40, 60, 80, 100]
                }
          };
    
        var bubble_layout = {
            title:'Sample Data',
            showlegend: false,
            height: 400,
            width: 1200 
        };
    
        var bubble_values = [trace1];

        Plotly.newPlot('bubble', bubble_values, bubble_layout);
    })
}

function metadata(sample){
    d3.json('samples.json').then((data)=> {
        var metadata = data.metadata;
        var dataArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var results = dataArray[0];
        var sample_metadata = d3.select("#sample-metadata");
        sample_metadata.html("");
        Object.entries(results).forEach(([key,value]) => {
            sample_metadata.append("h5").text(key+" : " +value)
        })
    })
}

function dropdown(sample){
    d3.json("samples.json").then((data)=> {
        var selDataset = d3.select("#selDataset");
        var names = data.names;
        names.forEach((name) => {
            selDataset.append("option").text(name).property("value", name)
        })
        var firstSample = names[0];
            createChart(firstSample);
            metadata(firstSample);
    })
}

function optionChanged(sample){
    createChart(sample);
    metadata(sample);
}

// Call dropdown box to activate
dropdown()







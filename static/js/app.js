function chartCreation (sample){
    d3.json('samples.json').then((data)=>{
        var samples = data.samples;
        var dataArray = samples.filter(sampleObj => sampleObj.id == sample);
        var result = dataArray[0];
       // Use `otu_ids` as the labels for the bar chart.
        var otu_ids = result.otu_ids;
        // Use `otu_labels` as the hovertext for the chart
        var otu_labels = result.otu_labels;
        // Use `sample_values` as the values for the bar chart.
        var sample_values = result.sample_values;
        
        //console.log(otu_ids);
        //console.log(otu_labels);
        //console.log(sample_values);
        
        //Create dataset to plot
        barData = [{
            type: "bar",
            orientation:'h',
            x: otu_ids.slice(0,10),
            y: sample_values.slice(0,10),
            text: otu_labels.slice(0,10)
        }];
        // create layout for bar chart
        var barLayout ={
            title: 'Test Subject Data',
            showlegend: false,
            height:400,
            width:1000
        };
        //create new bar chart plot
        Plotly.newPlot('bar', barData, barLayout);

    // 3. Create a bubble chart that displays each sample.
    var trace = {
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
    var bubbleData = [trace];
    // display otu id's from sample data in console log
    console.log(otu_ids);

    // create Bubble Chart layout
    var bubbleLayout = {
        title:'Test Subject Data',
        showlegend: false,
        height: 400,
        width: 1200 
    };

    // Create new Bubble Plot
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    })
}
// 4. Display the sample metadata, i.e., an individual's demographic information.
function displayMetadata(sample){
    d3.json('samples.json').then((data)=> {
        var metadata = data.metadata;
        var dataArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var results = dataArray[0];
        var sample_metadata = d3.select("#sample-metadata");
        sample_metadata.html("");
        // 5. Display each key-value pair from the metadata JSON object somewhere on the page.
        Object.entries(results).forEach(([key,value]) => {
            sample_metadata.append("h5").text(key+" : " +value)
        })
    })
}

// 6. Update all of the plots any time that a new sample is selected.
function dropdownChange(sample){
    d3.json("samples.json").then((data)=> {
        var selDataset = d3.select("#selDataset");
        var names = data.names;
        names.forEach((name) => {
            selDataset.append("option").text(name).property("value", name)
        })
        var firstSample = names[0];
            chartCreation(firstSample);
            displayMetadata(firstSample);
    })
}
// Ff option in dropdown changes, display new sample data
function optionChanged(sample){
    chartCreation(sample);
    displayMetadata(sample);
}
// Call dropdown box to activate
dropdownChange()

// Promise Pending
function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
}

d3.json("data/samples.json").then(function(data) {
    
    d3.select("#subjects").selectAll("option")
    .data(data.samples.map(row => row.id))
    .enter()
    .append("option")
    .text(function(d) {
    return `${d}`;
    })
    .attr("value", function(d) {
    return `${d}`;
    });

});



d3.select("#subjects").on("change", function() {

    var sel = d3.select(this);
    var opt = this.options[this.selectedIndex].text;
    console.log(opt);

    d3.json("data/samples.json").then(function(data) {

        var subjectInfo = data.metadata.find(function(element, index, array) {
            return `${element.id}` === opt;
        });

        infoBox = `ID: ${subjectInfo.id}<br>Ethnicity: ${subjectInfo.ethnicity}<br>Gender: ${subjectInfo.gender}<br>Age: ${subjectInfo.age}<br>Location: ${subjectInfo.location}<br>BBTYPE: ${subjectInfo.bbtype}<br>WFREQ: ${subjectInfo.wfreq}`;

        d3.select("#info").html(infoBox);

        var subjectData = data.samples.find(function(element, index, array) {
            return `${element.id}` === opt;
        });

        var top_sample_values = subjectData.sample_values.slice(0, 10).reverse();
        var top_otu_ids_org = subjectData.otu_ids.slice(0, 10).reverse();
        var top_otu_ids = subjectData.otu_ids.slice(0, 10).reverse();
        top_otu_ids = top_otu_ids.map(String);
        var top_otu_labels = subjectData.otu_labels.slice(0, 10).reverse();
    
        top_otu_ids = top_otu_ids.map(i => 'OTU ' + i);

        //HORIZONTAL BAR

        var bar_data = [{
            type: 'bar',
            x: top_sample_values,
            y: top_otu_ids,
            text: top_otu_labels,
            orientation: 'h'
            }];
    
        Plotly.newPlot('hbar', bar_data);
    
    
        //BUBBLE
    
        var trace1 = {
            x: subjectData.otu_ids,
            y: subjectData.sample_values,
            mode: 'markers',
            marker: {
              color: subjectData.otu_ids,
              size: subjectData.sample_values
            }
          };
          
        var data = [trace1];
        
        var layout = {
        title: '',
        showlegend: false
        };
        
        Plotly.newPlot('bubble', data, layout);



    });

});


d3.json("data/samples.json").then(function(data) {

    var subjectInfo = data.metadata.find(function(element, index, array) {
        return `${element.id}` === '940';
    });

    infoBox = `ID: ${subjectInfo.id}<br>Ethnicity: ${subjectInfo.ethnicity}<br>Gender: ${subjectInfo.gender}<br>Age: ${subjectInfo.age}<br>Location: ${subjectInfo.location}<br>BBTYPE: ${subjectInfo.bbtype}<br>WFREQ: ${subjectInfo.wfreq}`;

    d3.select("#info").html(infoBox);


    var subjectData = data.samples.find(function(element, index, array) {
        return element.id === '940';
      });
      
    console.log(subjectData);


    var top_sample_values = subjectData.sample_values.slice(0, 10).reverse();
    var top_otu_ids_org = subjectData.otu_ids.slice(0, 10).reverse();
    var top_otu_ids = subjectData.otu_ids.slice(0, 10).reverse();
    top_otu_ids = top_otu_ids.map(String);
    var top_otu_labels = subjectData.otu_labels.slice(0, 10).reverse();

    top_otu_ids = top_otu_ids.map(i => 'OTU ' + i);

    console.log(top_otu_ids);

    

    var bar_data = [{
        type: 'bar',
        x: top_sample_values,
        y: top_otu_ids,
        text: top_otu_labels,
        orientation: 'h'
        }];

    Plotly.newPlot('hbar', bar_data);


    //BUBBLE

    var trace1 = {
        x: subjectData.otu_ids,
        y: subjectData.sample_values,
        mode: 'markers',
        marker: {
          color: subjectData.otu_ids,
          size: subjectData.sample_values
        }
      };
      
      var data = [trace1];
      
      var layout = {
        title: '',
        showlegend: false
      };
      
      Plotly.newPlot('bubble', data, layout);

});


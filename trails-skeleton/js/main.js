
// Global objects go here (outside of any functions)
let data, scatterplot, barchart;
const dispatcher = d3.dispatch('filterCategories');


/**
 * Load data from CSV file asynchronously and render charts
 */
d3.csv('data/vancouver_trails.csv')
    .then(_data => {
        data = _data; // for safety, so that we use a local copy of data.

        // ... data preprocessing etc. ... TODO: you add code here for numeric
        data.forEach(d => {
            d.time = +d.time; // convert to number
            d.distance = +d.distance; // convert to number
        });

        console.log(data);

        // Initialize scale
        const colorScale = d3.scaleOrdinal()
            .domain(["Easy", "Intermediate", "Difficult"])
            .range(["#d3eecd", "#7bc77e", "#2a8d46"])

        // See Lab 4 for help
        scatterplot = new Scatterplot({
            parentElement: '#scatterplot',
            colorScale: colorScale
        }, data);
        scatterplot.updateVis();

        barchart = new Barchart({
            parentElement: '#barchart',
            colorScale: colorScale
        }, dispatcher, data);
        barchart.updateVis();

        dispatcher.on('filterCategories', selectedCategories => {
            if (selectedCategories.length == 0) {
                scatterplot.data = data;
            } else {
                scatterplot.data = data.filter(d =>
                    selectedCategories.includes(d.difficulty));
            }
            scatterplot.updateVis();
        })
    })

    .catch(error => console.error(error));
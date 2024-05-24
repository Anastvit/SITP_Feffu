const svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    marginX = 40,
    marginY = 40;

d3.select("#showTable")
    .on('click', function () {
        let buttonValue = d3.select(this);

        if (buttonValue.property("value") === "Показать таблицу") {
            buttonValue.attr("value", "Скрыть таблицу");

            let table = d3.select(".table").select("table");

            let rows = table.selectAll("tr")
                .data(data)
                .enter()
                .append("tr");

            let cells = rows.selectAll("td")
                .data(function (row) {
                    return d3.range(Object.keys(row).length).map(function (column, i) {
                        return row[Object.keys(row)[i]];
                    });
                })
                .enter()
                .append("td")
                .text(function (d) { return d; });

        } else {
            buttonValue.attr("value", "Показать таблицу");

            d3.select(".table").select("table").remove();
        }
    });

function createArrGraph(data, key, valueField) {
    let valuesFn = valueField === 'minBattery' ? d => d['Аккумулятор'] : d => d[valueField];
    let arrGraph = d3.rollups(data, v => {
        if (valueField === 'minBattery') {
            let minValue = d3.min(v, valuesFn);
            return [minValue, minValue];
        } else {
            let extentValues = d3.extent(v, valuesFn);
            return extentValues;
        }
    }, d => d[key])
        .map(([key, values]) => ({ labelX: key, values: values }));
    return arrGraph;
}

function createAxis(data) {
    let allValues = data.flatMap(d => d.values);
    let max = d3.max(allValues);

    let scaleX = d3.scaleBand()
        .domain(data.map(d => d.labelX))
        .range([0, width - 2 * marginX])
        .padding(0.1);

    let scaleY = d3.scaleLinear()
        .domain([0, max * 1.1]) //11111
        .range([height - 2 * marginY, 0]);

    let axisX = d3.axisBottom(scaleX);
    let axisY = d3.axisLeft(scaleY);

    svg.append("g")
        .attr("transform", `translate(${marginX}, ${height - marginY})`)
        .call(axisX)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    svg.append("g")
        .attr("transform", `translate(${marginX}, ${marginY})`)
        .call(axisY);

    return [scaleX, scaleY];
}



function createScatterPlot(data, scaleX, scaleY, color) {
    const r = 4;

    svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", r)
        .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("cy", d => scaleY(d.values[0]))
        .attr("transform", `translate(${marginX}, ${marginY})`)
        .style("fill", color);
}

function createBarChart(data, scaleX, scaleY, color, index) {
    let offset = (index % 2) * scaleX.bandwidth() / 2;
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => scaleX(d.labelX) + offset)
        .attr("y", d => scaleY(d.values[0]))
        .attr("width", scaleX.bandwidth() / 2)
        .attr("height", d => height - 2 * marginY - scaleY(d.values[0])) // 1111111
        .attr("transform", `translate(${marginX}, ${marginY})`)
        .style("fill", color);
}



function drawGraph(formData) {
    const keyX = formData.get('ox');
    if (!keyX) {
        alert("Выберите категорию для оси X");
        return;
    }

    const selectedYKeys = formData.getAll('oy');
    if (selectedYKeys.length === 0) {
        alert("Выберите хотя бы одну категорию для оси Y");
        return;
    }

    const chartType = formData.get('chartType');
    svg.selectAll('*').remove();

    let allData = [];
    selectedYKeys.forEach((keyY, index) => {
        const arrGraph = createArrGraph(data, keyX, keyY);
        allData = allData.concat(arrGraph);
    });

    const [scX, scY] = createAxis(allData);

    selectedYKeys.forEach((keyY, index) => {
        const arrGraph = createArrGraph(data, keyX, keyY);
        if (chartType === 'scatter') {
            createScatterPlot(arrGraph, scX, scY, index % 2 === 0 ? "blue" : "red");
        } else if (chartType === 'bar') {
            createBarChart(arrGraph, scX, scY, index % 2 === 0 ? "blue" : "red", index);
        }
    });
    
}


document.querySelector('input[type="button"]').addEventListener('click', function() {
    const formData = new FormData(document.querySelector('form'));
    drawGraph(formData);
});

// Построить график по умолчанию при загрузке страницы
window.addEventListener('load', function() {
    const formData = new FormData(document.querySelector('form'));
    drawGraph(formData);
});

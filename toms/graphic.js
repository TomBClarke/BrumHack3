var graphic = new (function() {
    // Holds data
    var nodes = [];
    // D3 force layout of graph
    var force;

    var width, height;
    
    this.loadGraphic = function() {
        var nodes = [
            { "title": "test01", "img": "http://tombclarke.co.uk/res/img/me_circle.png", "description": "some words about the thing", "perc": 0.1, "link": "http://google.com" },
            { "title": "test02", "img": "http://tombclarke.co.uk/res/img/me_circle.png", "description": "some words about the thing", "perc": 0.2, "link": "http://google.com" },
            { "title": "test03", "img": "http://tombclarke.co.uk/res/img/me_circle.png", "description": "some words about the thing", "perc": 0.3, "link": "http://google.com" },
            { "title": "test04", "img": "http://tombclarke.co.uk/res/img/me_circle.png", "description": "some words about the thing", "perc": 0.4, "link": "http://google.com" },
            { "title": "test05", "img": "http://tombclarke.co.uk/res/img/me_circle.png", "description": "some words about the thing", "perc": 0.5, "link": "http://google.com" },
            { "title": "test06", "img": "http://tombclarke.co.uk/res/img/me_circle.png", "description": "some words about the thing", "perc": 0.6, "link": "http://google.com" },
            { "title": "test07", "img": "http://tombclarke.co.uk/res/img/me_circle.png", "description": "some words about the thing", "perc": 0.7, "link": "http://google.com" },
            { "title": "test08", "img": "http://tombclarke.co.uk/res/img/me_circle.png", "description": "some words about the thing", "perc": 0.8, "link": "http://google.com" },
            { "title": "test09", "img": "http://tombclarke.co.uk/res/img/me_circle.png", "description": "some words about the thing", "perc": 0.9, "link": "http://google.com" }
        ];

        height = 800;
        width = 800;

        // Create the colors
        var color = d3.scale.category20b();
        
        // Create the force layout
        force = d3.layout.force()
            // How much nodes attract/repel eachother
            .charge(-100)
            .size([width, height]);

        // Create graphics element, and set dimensions
        var svg = d3.select(".graphic#elucidateGraphic").append("svg").style('height', height).style('width', width);

        // Add the nodes, start up the graph
        force
            .nodes(nodes)
            .start();

        // Sets how to move objects to the front
        d3.selection.prototype.moveToFront = function() {
            return this.each(function() {
                this.parentNode.appendChild(this);
            });
        };


        // Create all the nodes
        var node = svg.selectAll(".node")
            .data(nodes)
            .enter()
            // Appending a g element because it's needed to hold text + circle.
            // Wouldn't need if just circle/text.
            .append("g")
            .attr("class", "gnode");

        // Create the circles
        var circle = node.append("circle")
            .attr("class", "node")
            // Set the radius to be the sum of two trusts (see function)
            .attr("r", getRadius)
            // Fills it with the right colour (depends on it's index, see above)
            .style('fill', function() {
                return '#333333';
            })
            // Set the border
            .style("stroke", "black")
            .style("stroke-width", "1px")
            .on("mousedown", function(d) {
                var sel = d3.select(this.parentNode);
                sel.moveToFront();
            })
            .on("mousedown", function(d) {
                var sel = d3.select(this.parentNode);
                sel.moveToFront();
            })
            // Start the dragging
            .call(force.drag);

        // Add the labels
        var labels = node
            .append("text")
            // Make it unselectable.
            .attr("class", "unselectable")
            .attr("dy", ".35em")
            .style("font-size", function(d) {
                var size = d.perc * 50;
                if (size < 20)
                    size = 20;
                return size + 'px';
            })
            // Set the text to be centred
            .attr("text-anchor", "middle")
            //Text colour:
            .attr('fill','red')
            .on("mousedown", function(d) {
                var sel = d3.select(this.parentNode);
                sel.moveToFront();
                // window.open(d.link, '_blank');
            })
            // Set the label content
            .text(function(d) { return d.title; })
            .call(force.drag);

        force.on("tick", tick);
    }
    
    this.destroy = function() {
        if(force)
            force.stop();
    }

    // Sums the two trusts, and scales it appropriately
    function getRadius(d) {
        var totalNodeValue = 0.0;
        for(var i = 0; i < nodes.length; i++){
            totalNodeValue += nodes[i].perc;
        }
        return (width + height) * (d.perc / totalNodeValue);
    }
    
    // Collision code
    function collide(node) {
        var r = getRadius(node) + 16,
            nx1 = node.x - r,
            nx2 = node.x + r,
            ny1 = node.y - r,
            ny2 = node.y + r;
        return function(quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== node)) {
                var x = node.x - quad.point.x,
                    y = node.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y),
                    r = getRadius(node) + getRadius(quad.point);
                if (l < r) {
                    l = (l - r) / l * .5;
                    node.x -= x *= l;
                    node.y -= y *= l;
                    quad.point.x += x;
                    quad.point.y += y;
                }
            }
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        };
    }

    // Called on tick
    function tick(e) {
        var q = d3.geom.quadtree(nodes),
            i = 0,
            n = nodes.length;
        
        while (++i < n) q.visit(collide(nodes[i]));
        
        for(var i = 0; i < nodes.length; i++) {
            nodes[i].x = boundPosition(nodes[i].x, 0, width);
            nodes[i].y = boundPosition(nodes[i].y, 0, height);
        }
        
        d3.selectAll("circle")
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
        d3.selectAll("text")
            .attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; });
    }
    
    function boundPosition(value, min, max) {
        return Math.max(Math.min(value, max), min);
    }
})();
var graphic = new (function() {
    // Holds data
    var nodes = [];
    // D3 force layout of graph
    var force;

    var lastClick = new Date().getTime();

    var width, height;
    
    this.loadGraphic = function() {
        var nodes = [
            { "title": "test01", "img": "http://tombclarke.co.uk/res/img/me_full.png", "description": "some words about the thing", "perc": 0.1, "link": "http://google.com" },
            { "title": "test02", "img": "http://tombclarke.co.uk/res/img/uob_front.png", "description": "some words about the thing", "perc": 0.2, "link": "http://google.com" },
            { "title": "test03", "img": "http://tombclarke.co.uk/res/img/uob_front.png", "description": "some words about the thing", "perc": 0.3, "link": "http://google.com" },
            { "title": "test04", "img": "http://tombclarke.co.uk/res/img/uob_front.png", "description": "some words about the thing", "perc": 0.4, "link": "http://google.com" },
            { "title": "test05", "img": "http://tombclarke.co.uk/res/img/uob_front.png", "description": "some words about the thing", "perc": 0.5, "link": "http://google.com" },
            { "title": "test06", "img": "http://tombclarke.co.uk/res/img/uob_front.png", "description": "some words about the thing", "perc": 0.6, "link": "http://google.com" },
            { "title": "test07", "img": "http://tombclarke.co.uk/res/img/uob_front.png", "description": "some words about the thing", "perc": 0.7, "link": "http://google.com" },
            { "title": "test08", "img": "http://tombclarke.co.uk/res/img/uob_front.png", "description": "some words about the thing", "perc": 0.8, "link": "http://google.com" },
            { "title": "test09", "img": "", "description": "some words about the thing", "perc": 0.9, "link": "http://google.com" }
        ];

        height = window.innerHeight;
        width = window.innerWidth;

        // Create the colors
        var color = d3.scale.category20b();
        
        // Create the force layout
        force = d3.layout.force()
            // How much nodes attract/repel eachother
            .charge(-800)
            .size([innerWidth, height]);

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
        
        //Add img
        var image = node
            .append("image")
            .attr("width", function(d){ return getRadius(d) * 2.2; })
            .attr("height", function(d){ return getRadius(d) * 2.2; })
            .style('border-radius', '50%')
            .attr("xlink:href", function(d) {
                return d.img;
            })
            .on("mousedown", function(d) {
                var sel = d3.select(this.parentNode);
                sel.moveToFront();
            })
            .call(force.drag);

        // Create the circles
        var circle = node
            .append("circle")
            .attr("class", "node")
            // Set the radius to be the sum of two trusts (see function)
            .attr("r", getRadius)
            // Fills the circle
            .style('fill', function(d) {
                if(d.img == "") {
                    return getRandomColor();
                } else {
                    return "transparent";
                }
            })
            .on("mousedown", function(d) {
                clickOn(d, this);
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
                clickOn(d, this);
            })
            // Set the text to be centred
            .attr("text-anchor", "middle")
            //Text colour:
            .attr('fill','white')
            .on("mousedown", function(d) {
                clickOn(d, this);
            })
            // Set the label content
            .text(function(d) { return d.title; })
            .call(force.drag);

        setTimeout(function() {
            force.on("tick", tick);
            $('#elucidateGraphic').fadeIn(1500);
        }, 1500);
    }
    
    this.destroy = function() {
        if(force)
            force.stop();
    }

    function clickOn(d, _this) {
        var sel = d3.select(_this.parentNode);
        sel.moveToFront();

        var date = new Date();
        var diff = date.getTime() - lastClick;
        if (diff > 1000 )
            expand(d);
    }

    // Sums the two trusts, and scales it appropriately
    function getRadius(d) {
        var size = d.perc * 100;
        if (size < 50)
            size = 50;
        return size;
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
            .attr("cy", function(d) { return d.y - 100; });
        d3.selectAll("text")
            .attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y - 100; });
        d3.selectAll("image")
            .attr("x", function(d) { return d.x - getRadius(d); })
            .attr("y", function(d) { return d.y - getRadius(d) - 10 - 100; });
    }
    
    function boundPosition(value, min, max) {
        return Math.max(Math.min(value, max), min);
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function expand(d) {
        var size = 100;

        $('#detail_holder').hide();
        $('#detail_table').hide();

        $('#detail_holder').css('left', d.x  - size);
        $('#detail_holder').css('top', d.y - size);

        $('#detail_title').text(d.title);
        $('#detail_descr').text(d.description);
        $('#detail_link').attr('href', d.link);
        
        $('#detail_holder').css('width', 20);
        $('#detail_holder').css('height', 20);
        $('#detail_holder').show();
        // $('#detail_holder').fadeIn();
        $('#detail_holder').animate({
            left: (width / 2) - (size * 4 / 3),
            top: (height / 8 * 7) - (size * 2),
            width: (size * 2),
            height: (size * 2)
        });

        setTimeout(function() {
            $('#detail_table').fadeIn();
        }, 100);
    }

    this.contract = function() {
       $('#detail_holder').fadeOut();
       $('#detail_table').fadeOut();
    }
})();
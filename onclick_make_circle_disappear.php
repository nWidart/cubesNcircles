<html>
    <head>
        <title>Raphael Play</title>
        <script type="text/javascript" src="js/raphael-min.js"></script>
        <script type="text/javascript">
            window.onload = function() {
                var paper = new Raphael(document.getElementById('canvas_container'), 500, 500);

                var circ = paper.circle(250, 250, 40);
                circ.attr({fill: '#000', stroke: 'none'});

                var text = paper.text(250, 250, 'Bye Bye Circle!')
                text.attr({opacity: 0, 'font-size': 12}).toBack();

                circ.node.onmouseover = function() {
                    this.style.cursor = 'pointer';
                }

                circ.node.onclick = function() {
                    text.animate({opacity: 1}, 2000);
                    circ.animate({opacity: 0}, 2000, function() {
                        this.remove();
                    });
                }
            }
        </script>
        <style type="text/css">
            #canvas_container {
                width: 500px;
                border: 1px solid #aaa;
            }
        </style>
    </head>
    <body>
        <div id="canvas_container"></div>
        <p>Click on the circle!</p>
    </body>
</html>
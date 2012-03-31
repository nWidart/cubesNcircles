// creation of the canvas
var paper = new Raphael(document.getElementById('canvas_container'), 1024, 768),
    circles,
    centerX = 460,
    centerY = 384;

// global variables.
var recordSales = new Array(39.8, 39.7, 39.8, 38.5, 38.2, 38.6, 36.9, 33.7, 32.2, 32, 33.6, 33.5, 31.9, 30.6, 27.5, 24.6, 22.2, 19.1),
    livemusicSales = new Array(11.7, 13.4, 12.8, 12.5, 13, 12.5, 12.8, 13.5, 13.5, 13.7, 14.8, 15.2, 16.5, 18.1, 19.4, 20.8, 22.2, 23.5),
    digitalSales = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.38, 1.2, 2.5, 4.5, 7, 10.7, 12.9, 14.8),
    musicSales = new Array(46, 46, 46, 46, 46, 48, 52, 54, 62, 76, 82, 82.3, 82.6, 81, 82, 82, 87, 89),
    gameSales = new Array(14, 12, 15, 18, 19, 20, 14.7, 20, 27, 23, 25.4, 29, 31.6, 41.7, 54, 60.4, 61.2, 62.5),
    movieTickets = new Array(5.1,5.29,5.59,6.77,7.3,7.48,8.13,9.7,13.5,16.4,17.8,21,25.5,26.3,27.7,29.4,31.8,32.5),
    dvdVod = new Array(22.75,25.11,35.61,36.23,38.7,43.52,43.87,53.4,52.2,59.6,64.2,61.3,55.5,55.3,52.3,52.6,55.2,54.7),
    gamesConsole = new Array(8.7,9,9.5,11,16,17.3,18.5,20,21.88,23.3,26.33,27.67,31.63,37.47,41.46,44.23,46.72,48.88),
    maxValue = 90, // valeur maximum
    radius = 190, // rayon du cercle
    centerRadius = 130,
    albumSalesLength = recordSales.length,
    liveMusicSalesLength = livemusicSales.length,
    digitalSalesLength = digitalSales.length,
    pathString = "",
    pathString2 = "",
    pathString3 = "",
    musicIndustrySales = new Array(),
    globalMusicIndustrySales = new Array(),
    popupPath = '';

// On aditione les Albums Sales avec les live music sales (concerts)
if (albumSalesLength == liveMusicSalesLength) {
    for (var i = 0; i < albumSalesLength; i++) {
        var sum = recordSales[i] + livemusicSales[i];
        musicIndustrySales.push(sum);
    }
}
// On aditione les résultats du précédent calcule avec les ventes digitales
var musicIndustrySalesLength = musicIndustrySales.length;
if (digitalSalesLength == musicIndustrySalesLength) {
    for (var i = 0; i < digitalSalesLength; i++) {
        var sum = digitalSales[i] + musicIndustrySales[i];
        globalMusicIndustrySales.push(sum);
    }
}

// Création des pop-ups
function get_hover_handler(value, circle) {
    return function (event) {
        var popup = $("#popup");
        //popup.css("display", "block");//pour faire apparaître la popup
        popup.fadeIn(300);
        var popupNumber = $(this).parent().attr("title");
        var cx = circle.attr("cx");
        /*vous pouvez récupérer les coordonnées du centre du cercle comme ça, ça vous évite d'utiliser un tableau pour tout stocker*/
        var cy = circle.attr("cy");
        var p;
        circle.attr({
            "fill":"#fbfbfb"
        });
        /*option 1:  simple droite */
        // p = "M " + cx + " " + cy+ "L 875 65";

        /*option 2 la courbe*/
        // p = "M " + cx + " " + cy+ "Q 100 100  875 65";

        /*option 3 plusieurs droites*/
        if (cy < centerY)
            p = "M " + cx + " " + cy + " L" + cx + " " + "100 " + "L 875 79";
        else if (cx < centerX) /*en bas à gauche, ligne en trois partie partant vers la gauche */
            p = "M " + cx + " " + cy + " L" + 100 + " " + cy + "L 100 100  L 875 79";
        else
            p = "M " + cx + " " + cy + " L" + 800 + " " + cy + "L 800 100  L 875 79";
        var popupPath = paper.path(p);

        popupPath.attr({stroke:"#fbfbfb", "stroke-opacity":".7", "stroke-width":"2"});
        circle.pathToPopup = popupPath;
        /*je rajoute une variable au circle pour me rappeler du chemin dessiné , voir get_out_handler*/
        popup.html("<div><a href='#' class='close_popup'>x</a>" + value + "</div>");
        // On ferme le popup au clic du X
        popup.on('click', function() {
             $(this).on('click', function() {
                $('#popup').fadeOut();
                // on change seulement la couleur du cercle quand on ferme le popup.
                // Marche pas avec la multi sélection..
                circle.attr({"fill":"#666"});
            });
        });
    };
}
// Supression du path qui va vers le pop up
function get_out_handler(circle) {
    return function (event) {
        circle.pathToPopup.remove();
        //circle.attr({"fill":"#666"});
    };
}

function hover_effect(circle) {
    circle.attr({"fill-opacity":".9"});
}


// Function to create the graphic ( circles and lines)
function create_graph(array, maxValue, radius, centerRadius, centerX, centerY, addCircle) {

    var albumLength = array.length;
    var step = Math.PI * 2 / albumLength;
    pathString = "";
    var legendesTextesArray = new Array(
        '<div id="1994"><h4>1994</h4><h5>In numbers</h5><ul><li>Physical album sales : $39.8 billion</li><li>Concert ticket sales : $11.7 billion</li></ul><h5>Main events</h5><img src="images/icons/mp3.png" alt="MP3"/><p>The Mp3 is a pretty new format that makes it possible for music files to be compressed to a tenth of their original size while retaining a good sound quality. It starts spreading on the Internet.</p></div>',
        '<div id="1995"><h4>1995</h4><h5>In numbers</h5><ul><li>Physical album sales : $39.7 billion</li><li>Concert ticket sales : $13.4 billion</li></ul></div>',
        '<div id="1996"><h4>1996</h4><h5>In numbers</h5><ul><li>Physical album sales : $39.8 billion</li><li>Concert ticket sales : $12.8 billion</li></ul></div>',
        '<div id="1997"><h4>1997</h4><h5>In numbers</h5><ul><li>Physical album sales : $38.5 billion</li><li>Concert ticket sales : $12.5 billion</li></ul></div>',
        '<div id="1998"><h4>1998</h4><h5>In numbers</h5><ul><li>Physical album sales : $38.2 billion</li><li>Concert ticket sales : $13 billion</li></ul><h5>Main events</h5><img src="images/icons/napster.png" alt="Napster"/><p>Shawn Fanning releases <a href="http://en.wikipedia.org/wiki/Napster">Napster</a>. It allows users to easily share MP3 format songs for the first time. Even though it got shut down in 2001, it was the inspiration for many other <a href="http://en.wikipedia.org/wiki/Peer-to-peer_file_sharing">P2P sharing</a> sites.</p><img src="images/icons/emusic.png" alt="eMusic"/><p><a href="http://www.emusic.com/info/what-is-emusic-20/">eMusic</a> is established as one of the firsts online music store. With a monthly suscription, users can download a fixed amount of tracks.</p></div>',
        '<div id="1999"><h4>1999</h4><h5>In numbers</h5><ul><li>Physical album sales : $38.6 billion</li><li>Concert ticket sales : $12.5 billion</li></ul></div>',
        '<div id="2000"><h4>2000</h4><h5>In numbers</h5><ul><li>Physical album sales : $36.9 billion</li><li>Concert ticket sales : $12.8 billion</li></ul><h5>Main events</h5><img src="images/icons/napster.png" alt="Napster"/><p>A federal judge rules that Napster must remain offline until it can prevent copyrighted material from being shared by its users.</p><img src="images/icons/gnutella.png" alt="Gnutella"><p>Gnutella is developped in early 2000.  The source code is shared under the GNU Public License.</p><img src="images/icons/pandora.png" alt="Pandora"><p>Pandora Radio is an automated music recommendation service and "custodian" of the <a href="http://en.wikipedia.org/wiki/Music_Genome_Project">Music Genome Project</a> available only in the United States.</p><p>LimeWire uses the gnutella network as well as the BitTorrent protocol.</p></div>',
        '<div id="2001"><h4>2001</h4><h5>In numbers</h5><ul><li>Physical album sales : $33.7 billion</li><li>Concert ticket sales : $13.5 billion</li></ul><h5>Main events</h5><img src="images/icons/p2p.png" alt="Peer-2-Peer"><p>FastTrack is a Peer-2-Peer protocol developped by Estonian programmers. It is used as a base for many coming sharing networks. </p><img src="images/icons/kazaa.png" alt="Kazaa"/><p>Kazaa is launched, using the FastTrack protocol. It quickly becomes the most used P2P network in the world with an average 3 000 000 people connected at any time. It will be closed in 2005. </p><img src="images/icons/bittorrent.png" alt="BitTorrent"/><p><a href="http://en.wikipedia.org/wiki/BitTorrent_(protocol)">BitTorrent</a> is released. It is used for distributing large amounts of data over the Internet. </p></div>',
        '<div id="2002"><h4>2002</h4><h5>In numbers</h5><ul><li>Physical album sales : $32.2 billion</li><li>Concert ticket sales : $13.5 billion</li></ul></div>',
        '<div id="2003"><h4>2003</h4><h5>In numbers</h5><ul><li>Physical album sales : $32 billion</li><li>Concert ticket sales : $13.7 billion</li></ul><h5>Main events</h5><img src="images/icons/riaa.png" alt"RIAA"/><p>The <a href="http://www.riaa.com/">RIAA</a> sues 261 individuals for allegedly distributing copyright music files over peer-to-peer networks.</p><img src="images/icons/myspace.png" alt="Myspace"><p>Myspace is a social networking service allowing artists to share their own music.</p><img src="images/icons/piratebay.png" alt="The Pirate Bay"><p><a href="http://piratbyran-in-eng.blogspot.com/">Piratbyrån ("The Pirate Bureau") </a> is a Swedish organization established to support people opposed to current ideas about intellectual property — by freely sharing information and culture. They created the Pirate Bay</p><img src="images/icons/itunes.png" alt="Itunes"/><p>Apple launches the Itunes Store, an online music store. It allows users to download music for 99c per song.</p><img src="images/icons/anonymous.png" alt"Anonymous"/><p><a href="http://en.wikipedia.org/wiki/Anonymous_(group)">Anonymous</a> is created as an Internet movement that exists as an anarchic, digitized global brain.</p></div>',
        '<div id="2004"><h4>2004</h4><h5>In numbers</h5><ul><li>Physical album sales : $33.6 billion</li><li>Digital album sales : $0.38 billion</li><li>Concert ticket sales : $14.8 billion</li></ul><h5>Main events</h5><img src="images/icons/edonkey.png" alt="edonkey"/><p>eDonkey becomes the most widely used file sharing network on the Internet. Figures vary but it is bealieved to share 500 million to two billion files via 100 to 200 servers. </p><img src="images/icons/piratebay.png" alt="The Pirate Bay"><p>The Pirate Bay is launched. It is a Swedish website that hosts magnet links, which allow users to share files via BitTorrent. It calls itself "the galaxy\'s most resilient BitTorrent site".</p></div>',
        '<div id="2005"><h4>2005</h4><h5>In numbers</h5><ul><li>Physical album sales : $33.5 billion</li><li>Digital album sales : $1.2 billion</li><li>Concert ticket sales : $15.2 billion</li></ul><h5>Main events</h5><img src="images/icons/utorrent.png" alt="utorrent"/><p>The program <a href="http://www.utorrent.com/">uTorrent</a> is released as a freeware on all OS platforms. It is very appreciated for its stability and performances.</p><img src="images/icons/megaupload.png" alt="megaupload"/><p>Megaupload was the biggest file hosting service, accounting for 1% of the total traffic on the Internet, and 50 million daily visitor. </p></div>',
        '<div id="2006"><h4>2006</h4><h5>In numbers</h5><ul><li>Physical album sales : $31.9 billion</li><li>Digital album sales : $2.5 billion</li><li>Concert ticket sales : $16.6 billion</li></ul></div>',
        '<div id="2007"><h4>2007</h4><h5>In numbers</h5><ul><li>Physical album sales : $30.6 billion</li><li>Digital album sales : $4.5 billion</li><li>Concert ticket sales : $18.1 billion</li></ul><h5>Main events</h5><img src="images/icons/itunes.png" alt="Itunes"/><p>Apple surpasses one billion iTunes downloads.</p></div>',
        '<div id="2008"><h4>2008</h4><h5>In numbers</h5><ul><li>Physical album sales : $27.5 billion</li><li>Digital album sales : $7 billion</li><li>Concert ticket sales : $19.4 billion</li></ul><h5>Main events</h5><img src="images/icons/spotify.png" alt="Spotify"/><p><a href="http://www.spotify.com">Spotify</a> is a music streaming service offering streaming of selected music from a range of major and independent record labels, including Sony, EMI, Warner Music Group, and Universal. The service had approximately ten million users in 2010.</p><img src="images/icons/hadopi.png" alt="Hadopi"/><p>The Hadopi law is introduced to the French Senate. It is a "law promoting the distribution and protection of creative works on the internet". It allows the police to suspend the internet connection of someone suspected of piracy.</p></div>',
        '<div id="2009"><h4>2009</h4><h5>In numbers</h5><ul><li>Physical album sales : $24.6 billion</li><li>Digital album sales : $10.7 billion </li><li>Concert ticket sales : 20.8 billion</li></ul><h5>Main events</h5><img src="images/icons/kazaa.png" alt="Kazaa"><p>Kazaa comes back as a legal music distribution platform. A monthly suscription allows the user to download MP3 music. It offers more than a million titles.</p><img src="images/icons/bittorrent.png" alt="BitTorrent"/><p>Peer-to-peer networks collectively are accounted for roughly 43% to 70% of all Internet traffic (depending on geographical location).</p><img src="images/icons/telecomix.png" alt="Telecomix"/><p><a href="http://telecomix.org/">Telecomix</a> is a decentralized cluster of net activists, committed to the freedom of expression. Telecomix circulated the ways of using landlines to circumvent state blockages of broadband networks during the Egyptian uprising of 2011.</p></div>',
        '<div id="2010"><h4>2010</h4><h5>In numbers</h5><ul><li>Physical album sales : $22.2 billion</li><li>Digital album sales : $12.9 billion</li><li>Concert ticket sales : $22.2 billion</li></ul><h5>Main events</h5><img src="images/icons/limewire.png" alt="Limewire"/><p>Limewire is shut down by the United States Court, to get resurrectedto days later by a secret team of developers and dubbed <a href="http://en.wikipedia.org/wiki/Limewire_Pirate_Edition">Limewire Pirate Edition.</a></p></div>',
        '<div id="2011"><h4>2011</h4><h5>In numbers</h5><ul><li>Physical album sales : $19.1 billion</li><li>Digital album sales : $14.8 billion</li><li>Concert ticket sales : $23.5 billion</li></ul><h5>Main events</h5><img src="images/icons/bittorrent.png" alt="BitTorrent"/><p>The BitTorrent protocal has 150 million active users. At any given instant of time BitTorrent has, on average, more active users than YouTube and Facebook combined.</p><img src="images/icons/piratebay.png" alt="The Pirate Bay"><p>The Pirate Bay hosts more than 4 million torrent files. According to the Los Angeles Times, TPB is "one of the world\'s largest facilitators of illegal downloading".</p><img src="images/icons/megaupload.png" alt="megaupload"/><p>MegaUpload gets shut down with a big media coverage. Many other file sharing site follow.</p><p>The <a href="http://en.wikipedia.org/wiki/Stop_Online_Piracy_Act">SOPA</a>, <a href="http://en.wikipedia.org/wiki/PROTECT_IP_Act">PIPA</a>, and <a href="http://en.wikipedia.org/wiki/Anti-Counterfeiting_Trade_Agreement">ACTA</a> laws are introduced to the world. They all aim to protect intellectual property against piracy, but are seen by many as a danger for online freedom of speech. Protests online and in big cities around the world finally put the laws on hold.</p></div>');
    for (var i = 0; i < albumLength; i++) {
        var angle = -(step * i + Math.PI);
        var sin = Math.sin(angle);
        var cos = -Math.cos(angle);
        var value = array[i];
        var legText = legendesTextesArray[i];
        var move;
        if (i === 0)
            move = "M ";
        else
            move = "L ";
        pathString += move + (centerX + sin * ( centerRadius + (value / maxValue) * radius ) ) + "," + (centerY - cos * ( centerRadius + (value / maxValue) * radius ) );
        if (addCircle) {
            var c = paper.circle(centerX + sin * ( centerRadius + (value / maxValue) * radius ), centerY - cos * ( centerRadius + (value / maxValue) * radius ), 8);
            c.attr({stroke:"#fff", "stroke-opacity":".4", fill:"90-#fff-#ccc", "fill-opacity":".7", "title":i});

            $(c.node).mouseenter(get_hover_handler(legText, c));
            $(c.node).mouseenter(hover_effect(c));
            $(c.node).mouseleave(get_out_handler(c));
            circles.push(c);
        }
    }
    pathString += "L" + centerX + " " + centerY + "z";
    return pathString;
}


//calling the function *create_graph

function reinit_all(industry) {
    paper.remove(); //on efface le graphe précédent
    paper = new Raphael(document.getElementById('canvas_container'), 1024, 768); /* et on recommence*/
    // creation of the grid circles
    if (industry == "music")
    {
    circles = [];
    for (var i = 5; i < 16; i += 1) {
        var multiplier = i * 20;
        paper.circle(centerX, centerY, 10 + multiplier).attr({"stroke":"#eee", "stroke-opacity":".1"}).toBack();
    }
    // creation of the center lines
    for (var i = 0; i < 18; i += 1) {
        var el = paper.path('M ' + centerX + ' ' + centerY + ' l 0 ' + (-multiplier - 10)).attr({stroke:"#eee", "stroke-opacity":".1"}).toBack();
        if (i > 0) {
            el.rotate(i * 20, centerX, centerY);
        }
    }
    var recordSalesPath = create_graph(recordSales, maxValue, radius, centerRadius, centerX, centerY, false),
        digitalSalesPath = create_graph(digitalSales, maxValue, radius, centerRadius, centerX, centerY, false),
        musicIndustrySalesPath = create_graph(musicIndustrySales, maxValue, radius, centerRadius, centerX, centerY, false),
        globalMusicIndustrySalesPath = create_graph(globalMusicIndustrySales, maxValue, radius, centerRadius, centerX, centerY, true);
    // Drawing and styling the paths
    // Record sales style
    var second = paper.path(recordSalesPath)
        .toBack()
        .attr({
            "stroke-width":0,
            "fill":"#007E9A", // bleu
            "fill-opacity":"0"
        })
        .animate({
            "fill-opacity":"1"
        }, 1000, "ease-in");
    $(second.node).on('mouseenter', function() {
        second.animate({
            "fill":"#00abd1"
        },300);
        $('.record').css("font-weight","bold");
    });
    $(second.node).on('mouseleave', function() {
        second.animate({
            "fill":"#007E9A"
        },300);
        $('.record').css("font-weight","normal");
    });
    $('.record').on ('mouseenter', function() {
        second.animate({
            "fill":"#00abd1"
        },300);
        $('.record').css("font-weight","bold");
    });
    $('.record').on ('mouseleave', function() {
        second.animate({
            "fill":"#007E9A"
        },300);
        $('.record').css("font-weight","normal");
    });

    // music industry sales style
    var third = paper.path(musicIndustrySalesPath)
        .toBack()
        .attr({
            "stroke-width":0,
            "fill":"#F5A400", // red
            "fill-opacity":"0"
        })
        .animate({
            "fill-opacity":"1"
        }, 2000, "ease-in");
    $(third.node).on('mouseenter', function() {
        third.animate({
            "fill":"#ffb520"
        },300);
        $('.liveticket').css("font-weight","bold");
    });
    $(third.node).on('mouseleave', function() {
        third.animate({
            "fill":"#F5A400"
        },300);
        $('.liveticket').css("font-weight","normal");
    });
    $('.liveticket').on ('mouseenter', function() {
        third.animate({
            "fill":"#ffb520"
        },300);
        $('.liveticket').css("font-weight","bold");
    });
    $('.liveticket').on ('mouseleave', function() {
        third.animate({
            "fill":"#F5A400"
        },300);
        $('.liveticket').css("font-weight","normal");
    });
    // global music industry sales style
    var forth = paper.path(globalMusicIndustrySalesPath)
        .toBack()
        .attr({
            "stroke-width":0,
            "fill":"#A9121D", // red
            "fill-opacity":"0"
        }).animate({
            "fill-opacity":"1"
        }, 3000, "ease-in");
    $(forth.node).on('mouseenter', function() {
        forth.animate({
            "fill":"#dc1726"
        },300);
        $('.digital').css("font-weight","bold");
    });
    $(forth.node).on('mouseleave', function() {
        forth.animate({
            "fill":"#A9121D"
        },300);
        $('.digital').css("font-weight","normal");
    });
    $('.digital').on ('mouseenter', function() {
        forth.animate({
            "fill":"#dc1726"
        },300);
        $('.digital').css("font-weight","bold");
    });
    $('.digital').on ('mouseleave', function() {
        forth.animate({
            "fill":"#A9121D"
        },300);
        $('.digital').css("font-weight","normal");
    });
    // remplir le cercle du centre (noir)
    paper.circle(centerX, centerY, centerRadius)
        .attr({
            fill:"#333",
            stroke:"none"
        });

    $.each(circles, function (i, c) {
        c.toFront();
        c.animate({'fill':'#666'}, 1000);
    });

    } else if (industry == "media") {
        circles = [];
        for (var i = 5; i < 16; i += 1) {
            var multiplier = i * 20;
            paper.circle(centerX, centerY, 10 + multiplier).attr({"stroke":"#eee", "stroke-opacity":".1"}).toBack();
        }
        // creation of the center lines
        for (var i = 0; i < 18; i += 1) {
            var el = paper.path('M ' + centerX + ' ' + centerY + ' l 0 ' + (-multiplier - 10)).attr({stroke:"#eee", "stroke-opacity":".1"}).toBack();
            if (i > 0) {
                el.rotate(i * 20, centerX, centerY);
            }
        }
        var movieTicketsPath = create_graph(movieTickets, maxValue, radius, centerRadius, centerX, centerY, false),
            dvdVodPath = create_graph(dvdVod, maxValue, radius, centerRadius, centerX, centerY, true);
        var mtp = paper.path(dvdVodPath)// dernière
            .attr({
                "stroke-width":0,
                "fill":"#913402",
                "fill-opacity":"0"
            })
            .animate({
                "fill-opacity":"1"
            }, 1000, "ease-in");
        $(mtp.node).on('mouseenter', function() {
            mtp.animate({
                "fill":"#b94203"
            },300);
            $('.dvdvod').css("font-weight","bold");
        });
        $(mtp.node).on('mouseleave', function() {
            mtp.animate({
                "fill":"#913402"
            },300);
            $('.dvdvod').css("font-weight","normal");
        });
        $('.dvdvod').on ('mouseenter', function() {
            mtp.animate({
                "fill":"#b94203"
            },300);
            $('.dvdvod').css("font-weight","bold");
        });
        $('.dvdvod').on ('mouseleave', function() {
            mtp.animate({
                "fill":"#913402"
            },300);
            $('.dvdvod').css("font-weight","normal");
        });

        var dvp = paper.path(movieTicketsPath)
            .attr({
                "stroke-width":0,
                "fill":"#685D47", // green
                "fill-opacity":"0"
            })
            .animate({
                "fill-opacity":"1"
            }, 2000, "ease-in");
        $(dvp.node).on('mouseenter', function() {
            dvp.animate({
                "fill":"#b8a57e"
            },300);
            $('.boxoffice').css("font-weight","bold");
        });
        $(dvp.node).on('mouseleave', function() {
            dvp.animate({
                "fill":"#685D47"
            },300);
            $('.boxoffice').css("font-weight","normal");
        });
        $('.boxoffice').on ('mouseenter', function() {
            dvp.animate({
                "fill":"#b8a57e"
            },300);
            $('.boxoffice').css("font-weight","bold");
        });
        $('.boxoffice').on ('mouseleave', function() {
            dvp.animate({
                "fill":"#685D47"
            },300);
            $('.boxoffice').css("font-weight","normal");
        });

    $.each(circles, function (i, c) {
        c.toFront();
        c.animate({'fill':'#666'}, 1000);
    });

    } else if (industry == "games") {
        circles = [];
        for (var i = 5; i < 16; i += 1) {
            var multiplier = i * 20;
            paper.circle(centerX, centerY, 10 + multiplier).attr({"stroke":"#eee", "stroke-opacity":".1"}).toBack();
        }
        // creation of the center lines
        for (var i = 0; i < 18; i += 1) {
            var el = paper.path('M ' + centerX + ' ' + centerY + ' l 0 ' + (-multiplier - 10)).attr({stroke:"#eee", "stroke-opacity":".1"}).toBack();
            if (i > 0) {
                el.rotate(i * 20, centerX, centerY);
            }
        }
        var gameSalesPath = create_graph(gameSales, maxValue, radius, centerRadius, centerX, centerY, true);
        var gameConsolePath = create_graph(gamesConsole, maxValue, radius, centerRadius, centerX, centerY, false);

        var gsp = paper.path(gameSalesPath)
            .attr({
                "stroke-width":0,
                "fill":"#f2b807", // green
                "fill-opacity":"0"
            })
            .animate({
                "fill-opacity":"1"
            }, 1000, "ease-in");
        $(gsp.node).on('mouseenter', function() {
            gsp.animate({
                "fill":"#fcd04a"
            },300);
            $('.games_legend').css("font-weight","bold");
        });
        $(gsp.node).on('mouseleave', function() {
            gsp.animate({
                "fill":"#f2b807"
            },300);
            $('.games_legend').css("font-weight","normal");
        });
        $('.games_legend').on ('mouseenter', function() {
            gsp.animate({
                "fill":"#fcd04a"
            },300);
            $('.games_legend').css("font-weight","bold");
        });
        $('.games_legend').on ('mouseleave', function() {
            gsp.animate({
                "fill":"#f2b807"
            },300);
            $('.games_legend').css("font-weight","normal");
        });

        var gcp = paper.path(gameConsolePath)
            .attr({
                "stroke-width":0,
                "fill":"#6A2EA6", // green
                "fill-opacity":"0"
            })
            .animate({
                "fill-opacity":"1"
            }, 2000, "ease-in");
        $(gcp.node).on('mouseenter', function() {
            gcp.animate({
                "fill":"#923fe4"
            },300);
            $('.consolegames').css("font-weight","bold");
        });
        $(gcp.node).on('mouseleave', function() {
            gcp.animate({
                "fill":"#6A2EA6"
            },300);
            $('.consolegames').css("font-weight","normal");
        });
        $('.consolegames').on ('mouseenter', function() {
            gcp.animate({
                "fill":"#923fe4"
            },300);
            $('.consolegames').css("font-weight","bold");
        });
        $('.consolegames').on ('mouseleave', function() {
            gcp.animate({
                "fill":"#6A2EA6"
            },300);
            $('.consolegames').css("font-weight","normal");
        });

        $.each(circles, function (i, c) {
        c.toFront();
        c.animate({'fill':'#666'}, 1000);
        });
    }
}
$(document).ready(function() {
    $('#navigation a').on('click', function (event) {
        var la_classe =  $(event.currentTarget).attr("class");
        //console.log(la_classe); /*ça va écrire music, media ou games dans la console parce que j'ai rajouté les classes sur votre navigation*/
        reinit_all(la_classe);
    });
    $('.music').trigger('click');
    $('#navigation a.music').on('click', function (){
        // $('#music_lgd').css('display','block');
        $('#music_lgd').fadeIn(400);
        $('#movie_lgd').css('display','none');
        $('#games_lgd').css('display','none');
        $('#popup').fadeOut(200);
    });
    $('#navigation a.media').on('click', function (){
        $('#movie_lgd').fadeIn(500);
        $('#games_lgd').css('display','none');
        $('#music_lgd').css('display','none');
        $('#popup').fadeOut(200);
    });
    $('#navigation a.games').on('click', function (){
        $('#movie_lgd').css('display','none');
        $('#music_lgd').css('display','none');
        $('#games_lgd').fadeIn(500);
        $('#popup').fadeOut(200);
    });
});


    function handleButtonClick(buttonId, targetHash) {
        var myButton = document.getElementById(buttonId);
        myButton.addEventListener("click", function () {
            window.location.href = "index.html#" + targetHash;
        });
    }

   
function All(){
    $(document).ready(function () {
        handleButtonClick("btnBlock13", "life");
        handleButtonClick("btnBlock16", "contactus");
        handleButtonClick("btnBlock14", "search");
        handleButtonClick("btnBlock15", "qa");
    });
    window.onload = function () {
        if (window.location.hash) {
            var target = window.location.hash;
            var targetOffset = $(target).offset().top;
            window.scrollTo(0, targetOffset);
        }
    };
    
}





function BackToTop() {
    $(document).ready(function () {
        const logo = document.querySelector('.logo');
        logo.addEventListener('click', function (e) {
            e.preventDefault();
            const targetTop = 0;
            const currentTop = window.pageYOffset;
            const distance = targetTop - currentTop;
            const duration = 500;
            const startTime = performance.now();

            function step(timestamp) {
                const elapsedTime = timestamp - startTime;
                const progress = elapsedTime / duration;
                const position = currentTop + distance * Math.min(progress, 1);
                window.scrollTo(0, position);
                if (elapsedTime < duration) {
                    window.requestAnimationFrame(step);
                }
            }
            window.requestAnimationFrame(step);

        });
    })
}

function GoToTop() {
    $(document).ready(function () {
        const scrollToTopButton = document.getElementById('scroll-to-top-button');

        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 100) {
                scrollToTopButton.classList.add('show');
            } else {
                scrollToTopButton.classList.remove('show');
            }
        });

        scrollToTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
}

function navigate() {
    $(document).ready(function () {

        window.addEventListener('scroll', function () {
            var nav = document.querySelector('.header');
            var currentScrollPos = window.pageYOffset;

            if (currentScrollPos > nav.offsetTop) {
                nav.classList.add('fixed');
            } else {
                nav.classList.remove('fixed');
            }
        });
    });
}

function showImage(img) {
    var overlay = document.getElementById("overlays");
    var overlayImg = document.getElementById("overlays-img");
    overlay.style.display = "flex";
    overlayImg.src = img.src;
}

function hideImage() {
    var overlay = document.getElementById("overlays");
    overlay.style.display = "none";
}

function search() {
    $(document).ready(function () {
        var searchTerm = document.getElementById('searchInput').value;

        if (searchTerm == "星夜") {
            window.location.href = 'post-impressionism3.html#pi56';
        } else if (searchTerm == "向日葵") {
            window.location.href = 'post-impressionism.html#pi57';
        } else if (searchTerm == "鳶尾花") {
            window.location.href = 'post-impressionism2.html#pi58';
        } else if (searchTerm == "烏鴉群飛的麥田") {
            window.location.href = 'post-impressionism.html#pi59';
        } else if (searchTerm == "羅納河上的星空") {
            window.location.href = 'post-impressionism.html#pi60';
        } else if (searchTerm == "割掉耳朵後的自畫像") {
            window.location.href = 'post-impressionism.html#pi61';
        } else if (searchTerm == "吃馬鈴薯的人") {
            window.location.href = 'realism.html#r1';
        } else if (searchTerm == "夜晚露天咖啡座") {
            window.location.href = 'post-impressionism.html#pi63';
        } else if (searchTerm == "嘉舍醫師的畫像") {
            window.location.href = 'post-impressionism.html#pi62';
        } else if (searchTerm == "在亞爾的臥室") {
            window.location.href = 'post-impressionism.html#pi64';
        } else if (searchTerm == "Breton Women") {
            window.location.href = 'enamel.html#e1';
        } else if (searchTerm == "Ladies of Arles (Memories of the Garden at Etten)") {
            window.location.href = 'enamel.html#e2';
        } else if (searchTerm == "Spectators in the Arena at Arles") {
            window.location.href = 'enamel.html#e3';
        } else if (searchTerm == "Paul Gauguin (Man in a Red Beret)") {
            window.location.href = 'enamel.html#e4';
        } else if (searchTerm == "Peasant Woman Cutting Straw after Millet") {
            window.location.href = 'enamel.html#e5';
        } else if (searchTerm == "Two Little Girls") {
            window.location.href = 'enamel.html#e6';
        } else if (searchTerm == "The Sower Outskirts of Arles in the Background") {
            window.location.href = 'enamel.html#e7';
        } else if (searchTerm == "Mount Gaussier with the Mas de Saint-Paul") {
            window.location.href = 'enamel.html#e8';
        } else if (searchTerm == "Landscape with House and Ploughman") {
            window.location.href = 'enamel.html#e9';
        } else if (searchTerm == "Sunset at Montmajour") {
            window.location.href = 'impressionism.html#i1';
        } else if (searchTerm == "Laboureur dans un Champ") {
            window.location.href = 'impressionism.html#i2';
        } else if (searchTerm == "La mousme") {
            window.location.href = 'japanese.html#jp1';
        } else if (searchTerm == "A mousmé, half-Figure") {
            window.location.href = 'japanese.html#jp2';
        } else if (searchTerm == "Japanese art") {
            window.location.href = 'japanese.html#jp3';
        } else if (searchTerm == "Père Tanguy") {
            window.location.href = 'japanese.html#jp4';
        } else if (searchTerm == "A mousmé, sitting") {
            window.location.href = 'japanese.html#jp5';
        } else if (searchTerm == "Portrait of Père Tanguy") {
            window.location.href = 'japanese.html#jp6';
        } else if (searchTerm == "The Langlois Bridge at Arles") {
            window.location.href = 'japanese.html#jp7';
        } else if (searchTerm == "The Langlois Bridge at Arles") {
            window.location.href = 'japanese.html#jp8';
        } else if (searchTerm == "The Langlois Bridge") {
            window.location.href = 'japanese.html#jp9';
        } else if (searchTerm == "Japonaiserie Oiran (after Kesai Eisen)") {
            window.location.href = 'japanese.html#jp10';
        } else if (searchTerm == "Branches with Almond Blossom") {
            window.location.href = 'japanese.html#jp11';
        } else if (searchTerm == "The Langlois Bridge at Arles with Women Washing") {
            window.location.href = 'japanese.html#jp12';
        } else if (searchTerm == "A woman walking in garden") {
            window.location.href = 'new-impressionism.html#n1';
        } else if (searchTerm == "Avenue in Voyer d'Argenson Park at Asnieres") {
            window.location.href = 'new-impressionism.html#n2';
        } else if (searchTerm == "Banks of the Seine near Pont de Clichy") {
            window.location.href = 'new-impressionism.html#n3';
        } else if (searchTerm == "Absinthe") {
            window.location.href = 'new-impressionism.html#n4';
        } else if (searchTerm == "Entrance to the Moulin de la Galette") {
            window.location.href = 'new-impressionism.html#n5';
        } else if (searchTerm == "Flowerpot with Chives") {
            window.location.href = 'new-impressionism.html#n6';
        } else if (searchTerm == "Factories at Asnieres, Seen from the Quai de Clichy") {
            window.location.href = 'new-impressionism.html#n7';
        } else if (searchTerm == "Exterior of a Restaurant at Asnieres") {
            window.location.href = 'new-impressionism.html#n8';
        } else if (searchTerm == "House with sunflowers") {
            window.location.href = 'new-impressionism.html#n9';
        } else if (searchTerm == "Moored Boats") {
            window.location.href = 'new-impressionism.html#n10';
        } else if (searchTerm == "Outskirts of Paris near Montmartre") {
            window.location.href = 'new-impressionism.html#n11';
        } else if (searchTerm == "Park at Asnieres in Spring") {
            window.location.href = 'new-impressionism.html#n12';
        } else if (searchTerm == "Portrait of a Man with a Skull Cap") {
            window.location.href = 'new-impressionism.html#n13';
        } else if (searchTerm == "Portrait of a Woman (Madame Tanguy)") {
            window.location.href = 'new-impressionism.html#n14';
        } else if (searchTerm == "Portrait of Alexander Reid") {
            window.location.href = 'new-impressionism.html#n15';
        } else if (searchTerm == "Self Portrait") {
            window.location.href = 'new-impressionism.html#n16';
        } else if (searchTerm == "Self Portrait with Felt Hat") {
            window.location.href = 'new-impressionism.html#n17';
        } else if (searchTerm == "Self-Portrait") {
            window.location.href = 'new-impressionism.html#n18';
        } else if (searchTerm == "Still Life with Apples, Pears, Lemons and Grapes") {
            window.location.href = 'new-impressionism.html#n19';
        } else if (searchTerm == "Still Life with Basket of Apples") {
            window.location.href = 'new-impressionism2.html#n20';
        } else if (searchTerm == "The Factory at Asnieres") {
            window.location.href = 'new-impressionism2.html#n21';
        } else if (searchTerm == "The Voyer d'Argenson Park in Asnieres") {
            window.location.href = 'new-impressionism2.html#n22';
        } else if (searchTerm == "The Boulevard de Clichy") {
            window.location.href = 'new-impressionism2.html#n23';
        } else if (searchTerm == "Undergrowth") {
            window.location.href = 'new-impressionism2.html#n24';
        } else if (searchTerm == "View from Vincent's room in the Rue Lepic") {
            window.location.href = 'new-impressionism2.html#n25';
        } else if (searchTerm == "View of Paris from Vincent's Room in the Rue Lepic") {
            window.location.href = 'new-impressionism2.html#n26';
        } else if (searchTerm == "Woman Sitting in the Grass") {
            window.location.href = 'new-impressionism2.html#n27';
        } else if (searchTerm == "The Seine with the Pont de la Grande Jette") {
            window.location.href = 'new-impressionism2.html#n28';
        } else if (searchTerm == "Fishing in the Spring") {
            window.location.href = 'new-impressionism2.html#n29';
        } else if (searchTerm == "Vegetable Gardens in Montmartre") {
            window.location.href = 'new-impressionism2.html#n30';
        } else if (searchTerm == "Interior of a Restaurant") {
            window.location.href = 'pointillism.html#pt1';
        } else if (searchTerm == "Lane in Voyer d'Argenson Park at Asnieres") {
            window.location.href = 'new-impressionism.html#pt2';
        } else if (searchTerm == "Man with Spade in a Suburb of Paris") {
            window.location.href = 'new-impressionism.html#pt3';
        } else if (searchTerm == "A house Magros") {
            window.location.href = 'realism.html#r2';
        } else if (searchTerm == "The Goat Herd") {
            window.location.href = 'realism.html#r3';
        } else if (searchTerm == "A Girl Raking") {
            window.location.href = 'realism.html#r4';
        } else if (searchTerm == "A Digger") {
            window.location.href = 'realism.html#r5';
        } else if (searchTerm == "An Old Man Putting Dry Rice on the Hearth") {
            window.location.href = 'realism.html#r6';
        } else if (searchTerm == "Miners Women Carrying Sacks (The Bearers of the Burden)") {
            window.location.href = 'realism.html#r7';
        } else if (searchTerm == "Mother at the Cradle and Child Sitting on the Floor") {
            window.location.href = 'realism.html#r8';
        } else if (searchTerm == "Peasant Sitting by the Fireplace (Worn Out)") {
            window.location.href = 'realism.html#r9';
        } else if (searchTerm == "Man Writing Facing Left") {
            window.location.href = 'realism.html#r10';
        } else if (searchTerm == "Man with a Sack of Wood") {
            window.location.href = 'realism.html#r11';
        } else if (searchTerm == "Man with Winnow") {
            window.location.href = 'realism.html#r12';
        } else if (searchTerm == "Entrance to the Pawn Bank, The Hague") {
            window.location.href = 'realism.html#r13';
        } else if (searchTerm == "Edge of a Wood") {
            window.location.href = 'realism.html#r14';
        } else if (searchTerm == "Factory") {
            window.location.href = 'realism.html#r15';
        } else if (searchTerm == "Meadows near Rijswijk") {
            window.location.href = 'realism.html#r16';
        } else if (searchTerm == "Meadows near Rijswijk and the Schenkweg") {
            window.location.href = 'realism.html#r17';
        } else if (searchTerm == "Potato Field") {
            window.location.href = 'realism.html#r18';
        } else if (searchTerm == "Old Woman Asleep after Rops") {
            window.location.href = 'realism2.html#r19';
        } else if (searchTerm == "Town d'Avray: L'Etang au Batelier") {
            window.location.href = 'realism2.html#r20';
        } else if (searchTerm == "Daughter of Jacob Meyer") {
            window.location.href = 'realism2.html#r21';
        } else if (searchTerm == "Station in The Hague") {
            window.location.href = 'realism2.html#r22';
        } else if (searchTerm == "The Bakery in de Geest") {
            window.location.href = 'realism2.html#r23';
        } else if (searchTerm == "Sunset Over a Meadow") {
            window.location.href = 'realism2.html#r24';
        } else if (searchTerm == "Bending Woman") {
            window.location.href = 'realism2.html#r25';
        } else if (searchTerm == "Bent Figure of a Woman Sien") {
            window.location.href = 'realism2.html#r26';
        } else if (searchTerm == "Bent Figure of a Woman") {
            window.location.href = 'realism2.html#r27';
        } else if (searchTerm == "Driveway") {
            window.location.href = 'post-impressionism.html#pi3';
        } else if (searchTerm == "Canel") {
            window.location.href = 'post-impressionism.html#pi4';
        } else if (searchTerm == "Donkey and Cart") {
            window.location.href = 'post-impressionism.html#pi7';
        } else if (searchTerm == "Shores of Scheveningen") {
            window.location.href = 'post-impressionism.html#pi10';
        } else if (searchTerm == "Route") {
            window.location.href = 'post-impressionism.html#pi8';
        } else if (searchTerm == "Woman near a Window twice, Man with Winnow,Sower, and Woman with Broom") {
            window.location.href = 'post-impressionism.html#pi9';
        } else if (searchTerm == "Boy with Cap and Clogs") {
            window.location.href = 'post-impressionism.html#pi14';
        } else if (searchTerm == "Church in Nuenen, with One Figure") {
            window.location.href = 'post-impressionism.html#pi13';
        } else if (searchTerm == "Churches at Petersham and Turnham Green") {
            window.location.href = 'post-impressionism.html#pi5';
        } else if (searchTerm == "Interior with Woman Sewing") {
            window.location.href = 'post-impressionism.html#pi17';
        } else if (searchTerm == "Dance-hall") {
            window.location.href = 'post-impressionism.html#pi18';
        }else if (searchTerm == "Head of a Man") {
            window.location.href = 'post-impressionism2.html#pi20';
        } else if (searchTerm == "Silhouette of a Man with a Rake") {
            window.location.href = 'post-impressionism2.html#pi21';
        } else if (searchTerm == "Head of an Old Man") {
            window.location.href = 'post-impressionism2.html#pi22';
        } else if (searchTerm == "Peasant") {
            window.location.href = 'post-impressionism2.html#pi23';
        } else if (searchTerm == "Two Heads of Men") {
            window.location.href = 'post-impressionism2.html#pi24';
        } else if (searchTerm == "Silhouette of a Peasant Woman Digging Carrots") {
            window.location.href = 'post-impressionism2.html#pi25';
        } else if (searchTerm == "A Public Garden with People Walking in the Rain") {
            window.location.href = 'post-impressionism2.html#pi26';
        } else if (searchTerm == "一雙舊鞋") {
            window.location.href = 'post-impressionism2.html#pi27';
        } else if (searchTerm == "Belvedere Overlooking Montmartre") {
            window.location.href = 'post-impressionism2.html#pi29';
        } else if (searchTerm == "Flower Pot with Asters") {
            window.location.href = 'post-impressionism2.html#pi30';
        } else if (searchTerm == "Le Moulin de la Galette 4") {
            window.location.href = 'post-impressionism2.html#pi31';
        } else if (searchTerm == "Self-Portrait with Dark Felt Hat") {
            window.location.href = 'post-impressionism2.html#pi32';
        } else if (searchTerm == "Plaster Statuette of a Kneeling Man") {
            window.location.href = 'post-impressionism2.html#pi33';
        } else if (searchTerm == "Head of a Woman") {
            window.location.href = 'post-impressionism2.html#pi34';
        } else if (searchTerm == "Still Life with Roses and Sunflowers") {
            window.location.href = 'post-impressionism2.html#pi35';
        } else if (searchTerm == "Terrace of a Cafe on Montmartre \"La Guinguette\"") {
            window.location.href = 'post-impressionism2.html#pi36';
        } else if (searchTerm == "The Bois de Boulogne with People Walking") {
            window.location.href = 'post-impressionism2.html#pi37';
        } else if (searchTerm == "Skull of a Skeleton with Burning Cigarette") {
            window.location.href = 'post-impressionism3.html#pi38';
        } else if (searchTerm == "Barn Owl Viewed from the Side") {
            window.location.href = 'post-impressionism3.html#pi39';
        } else if (searchTerm == "Double-Bass Player") {
            window.location.href = 'post-impressionism3.html#pi40';
        } else if (searchTerm == "Edge of a Wheatfield with Poppies") {
            window.location.href = 'post-impressionism3.html#pi41';
        } else if (searchTerm == "Entrance to the Moulin de la Galette") {
            window.location.href = 'post-impressionism3.html#pi42';
        } else if (searchTerm == "Shed with Sunflowers") {
            window.location.href = 'post-impressionism3.html#pi43';
        } else if (searchTerm == "The Boulevard de Clichy") {
            window.location.href = 'post-impressionism3.html#pi44';
        } else if (searchTerm == "The Brothel") {
            window.location.href = 'post-impressionism3.html#pi45';
        } else if (searchTerm == "The Factory at Asnieres") {
            window.location.href = 'post-impressionism3.html#pi46';
        } else if (searchTerm == "The Garden with Sunflower") {
            window.location.href = 'post-impressionism3.html#pi47';
        } else if (searchTerm == "The Rispal Restaurant at Asnieres") {
            window.location.href = 'post-impressionism3.html#pi48';
        } else if (searchTerm == "The Seine with the Pont de Clichy") {
            window.location.href = 'post-impressionism3.html#pi49';
        } else if (searchTerm == "The Seine with the Pont de la Grande Jette") {
            window.location.href = 'post-impressionism3.html#pi50';
        } else if (searchTerm == "The Voyer d'Argenson Park in Asnieres") {
            window.location.href = 'post-impressionism3.html#pi51';
        } else if (searchTerm == "Vase with Daisies") {
            window.location.href = 'post-impressionism3.html#pi53';
        } else if (searchTerm == "Vegetable Gardens in Montmartre") {
            window.location.href = 'post-impressionism3.html#pi54';
        } else if (searchTerm == "Vegetable Garden in Montmartre") {
            window.location.href = 'post-impressionism3.html#pi55';
        } else {
            alert("查無此畫作，請重新查詢!");
            searchInput.value = "";
        }
    })
}

function scrollToPic() {
    $(document).ready(function () {
        if (window.location.hash) {
            var target = window.location.hash;
            var targetOffset = $(target).offset().top;

            $('html, body').animate({
                scrollTop: targetOffset - 300
            }, 1000); // 1000 是滾動的持續時間，以毫秒為單位
        }
    });
}

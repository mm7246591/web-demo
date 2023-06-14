

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

function WordDown() {
    $(document).ready(function () {
        const content = document.querySelector('.content');
        const h1 = content.querySelector('h1');
        const p = content.querySelector('p');
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            if (scrollPos >= 50 && scrollPos <= 650) {
                const newPos = (scrollPos - 150) * 0.5;
                h1.style.transform = `translateY(${newPos}px)`;
                p.style.transform = `translateY(${newPos}px)`;
            }
        });
    })
}

function seeMore() {
    $(document).ready(function () {
        const slider = document.querySelector('.slider');
        const slides = Array.from(slider.querySelectorAll('img'));

        let currentSlide = 0;


        slides[currentSlide].classList.add('active');

        function updateSlides() {
            slides.forEach((slide, index) => {
                if (index === currentSlide) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
        }

    })
}

function picShow() {
    $(document).ready(function () {
        const slider = document.querySelector(".slider");
        const slides = slider.querySelectorAll("img");

        const slideInterval = 7000;

        let currentSlide = 0;
        let slideTimer;

        slides[currentSlide].classList.add("active");

        function startSlideTimer() {
            slideTimer = setInterval(() => {
                const nextSlide = (currentSlide + 1) % slides.length;
                if (nextSlide === 0) {
                    setTimeout(() => {
                        goToSlide(nextSlide);
                    }, slideInterval / 2);
                } else {
                    goToSlide(nextSlide);
                }
            }, slideInterval);
        }

        function stopSlideTimer() {
            clearInterval(slideTimer);
        }

        function goToSlide(slideIndex) {
            slides[currentSlide].classList.remove("active");
            currentSlide = slideIndex % slides.length;
            slides[currentSlide].classList.add("active");

            const sliderContent = document.querySelector(".sliderContent");
            const currentSlideContent = slides[currentSlide].getAttribute("alt");
            sliderContent.textContent = currentSlideContent;

            highlightActiveDot();
        }

        startSlideTimer();

        const dotContainer = document.querySelector(".dots");
        const dots = dotContainer.querySelectorAll(".dot");

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                goToSlide(index);
            });
        });

        function highlightActiveDot() {
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add("active");
                } else {
                    dot.classList.remove("active");
                }
            });
        }


        const sliderContent = document.querySelector(".sliderContent");
        const currentSlideContent = slides[currentSlide].getAttribute("alt");
        sliderContent.textContent = currentSlideContent;

    })
}

function scrollDown() {
    $(document).ready(function () {

        const btnBlock1 = document.querySelector('#btnBlock1');
        const btnBlock2 = document.querySelector('#btnBlock2');
        const btnBlock3 = document.querySelector('#btnBlock3');
        const btnBlock4 = document.querySelector('#btnBlock4');
        const btnBlock5 = document.querySelector('#btnBlock5');
        const btnBlock6 = document.querySelector('#btnBlock6');
        const btnBlock7 = document.querySelector('#btnBlock7');
        const btnBlock8 = document.querySelector('#btnBlock8');

        btnBlock1.addEventListener('click', () => {
            const life = document.querySelector('.life');
            const offset = -180;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = life.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition + offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });

        btnBlock2.addEventListener('click', () => {
            const search = document.querySelector('.search');
            const offset = -130;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = search.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition + offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });

        btnBlock3.addEventListener('click', () => {
            const question = document.querySelector('.qa');
            const offset = -130;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = question.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition + offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });

        btnBlock4.addEventListener('click', () => {
            const contactUs = document.querySelector('.contactUs');
            const offset = -220;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = contactUs.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition + offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });

        btnBlock5.addEventListener('click', () => {
            const life = document.querySelector('.life');
            const offset = -180;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = life.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition + offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });

        btnBlock6.addEventListener('click', () => {
            const search = document.querySelector('.search');
            const offset = -130;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = search.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition + offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });

        btnBlock7.addEventListener('click', () => {
            const question = document.querySelector('.qa');
            const offset = -130;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = question.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition + offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });

        btnBlock8.addEventListener('click', () => {
            const contactUs = document.querySelector('.contactUs');
            const offset = -220;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = contactUs.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition + offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });
    })
}

function quickSearch() {
    $(document).ready(function () {
        document.getElementById("label1").addEventListener("click", function () {
            document.getElementById("searchInput").value = document.getElementById("label1").innerHTML;
        });
        document.getElementById("label2").addEventListener("click", function () {
            document.getElementById("searchInput").value = document.getElementById("label2").innerHTML;
        });
        document.getElementById("label3").addEventListener("click", function () {
            document.getElementById("searchInput").value = document.getElementById("label3").innerHTML;
        });
        document.getElementById("label4").addEventListener("click", function () {
            document.getElementById("searchInput").value = document.getElementById("label4").innerHTML;
        });
        document.getElementById("label5").addEventListener("click", function () {
            document.getElementById("searchInput").value = document.getElementById("label5").innerHTML;
        });
        document.getElementById("label6").addEventListener("click", function () {
            document.getElementById("searchInput").value = document.getElementById("label6").innerHTML;
        });
        document.getElementById("label7").addEventListener("click", function () {
            document.getElementById("searchInput").value = document.getElementById("label7").innerHTML;
        });
        document.getElementById("label8").addEventListener("click", function () {
            document.getElementById("searchInput").value = document.getElementById("label8").innerHTML;
        });
        document.getElementById("label9").addEventListener("click", function () {
            document.getElementById("searchInput").value = document.getElementById("label9").innerHTML;
        });
        document.getElementById("label10").addEventListener("click", function () {
            document.getElementById("searchInput").value = document.getElementById("label10").innerHTML;
        });
    })
}

function contact() {
    
    $(document).ready(function () {
        var clicked = false;
        $('#verification').click(function () {

            swal("Success!", "點擊OK繼續填寫!", "success");
            clicked = true;
        });

        $('#send').click(function () {
            if ($("#a1").val() == "" || $("#a2").val() == "" || $("#a3").val() == "" || $("#a4").val() == "" || $("#a5").val() == "" || (!clicked))
                alert("請確實填寫所有表格和驗證");
            else {
                alert("成功發送");
                window.location.href = "index.html";
            }

        });
    })

}



function genreShow() {
    $(document).ready(function () {
        const images = [{
                name: '點描畫派',
                src: '../img/Pointillism.jpg'
            },
            {
                name: '後印象派',
                src: '../img/Post-Impressionism.jpg'
            },
            {
                name: '琺瑯彩主義',
                src: '../img/enamel.jpg'
            },
            {
                name: '日本主義',
                src: '../img/japanese.jpg'
            },
            {
                name: '現實主義',
                src: '../img/realism.jpg'
            },
            {
                name: '印象派',
                src: '../img/Impressionism.jpg'
            },
            {
                name: '新印象派',
                src: '../img/newimpressionism.jpg'
            },
        ];

        const leftBtn = document.querySelector('.leftBtn');
        const rightBtn = document.querySelector('.rightBtn');

        const leftPic = document.querySelector('.leftPic');
        const mainPic = document.querySelector('.mainPic');
        const rightPic = document.querySelector('.rightPic');

        let timerId;
        let currentImageIndex = 0;
        let timer = setInterval(moveImages, 5000); // 設定計時器

        function moveLeft() {
            clearInterval(timer); // 清除計時器
            currentImageIndex = (currentImageIndex + 1) % images.length;
            setImages();
        }

        function moveRight() {
            clearInterval(timer); // 清除計時器
            currentImageIndex = (currentImageIndex === 0) ? images.length - 1 : currentImageIndex - 1;
            setImages();
        }

        leftBtn.addEventListener('click', moveRight);
        rightBtn.addEventListener('click', moveLeft);

        function setImages() {
            clearInterval(timer); // 清除計時器
            leftPic.style.transition = 'background-image 0.5s';
            leftPic.style.backgroundImage = `url(${images[currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1].src})`;
            mainPic.style.transition = 'background-image 0.5s';
            mainPic.style.backgroundImage = `url(${images[currentImageIndex].src})`;
            rightPic.style.transition = 'background-image 0.5s';
            rightPic.style.backgroundImage = `url(${images[(currentImageIndex + 1) % images.length].src})`;
            leftPic.style.backgroundSize = 'cover';
            mainPic.style.backgroundSize = 'cover';
            rightPic.style.backgroundSize = 'cover';

            // 設定圖片名稱
            const imageTitle = document.querySelector('.name');
            imageTitle.textContent = images[currentImageIndex].name;

            // 更新其他兩張圖片的名稱
            const leftImageTitle = document.querySelector('.leftPic .name');
            leftImageTitle.textContent = images[currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1].name;

            const imageTitleMain = document.querySelector('.mainPic .name');
            imageTitleMain.textContent = images[currentImageIndex].name;


            const rightImageTitle = document.querySelector('.rightPic .name');
            rightImageTitle.textContent = images[(currentImageIndex + 1) % images.length].name;

            timer = setInterval(moveImages, 5000); // 設定新的計時器
        }


        function moveImages() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            setImages();
        }

        window.addEventListener('load', function () {
            setImages(); // 初始顯示圖片
            timerId = setInterval(moveImages, 5000);
        });

        window.addEventListener('beforeunload', function () {
            clearInterval(timerId); // 離開頁面時清除定時器
        });


    })
}

function answer() {
    $(document).ready(function () {
        // 取得元素
        const qaBlock1 = document.querySelector("#qaBlock1");
        const qaBlock2 = document.querySelector("#qaBlock2");
        const qaBlock3 = document.querySelector("#qaBlock3");
        const qaBlock4 = document.querySelector("#qaBlock4");
        const qaBlock5 = document.querySelector("#qaBlock5");
        const qaBlock6 = document.querySelector("#qaBlock6");
        const qaTitle1 = document.querySelector("#qaTitle1");
        const qaTitle2 = document.querySelector("#qaTitle2");
        const qaTitle3 = document.querySelector("#qaTitle3");
        const qaTitle4 = document.querySelector("#qaTitle4");
        const qaTitle5 = document.querySelector("#qaTitle5");
        const qaTitle6 = document.querySelector("#qaTitle6");
        const answer1 = document.querySelector("#answer1");
        const answer2 = document.querySelector("#answer2");
        const answer3 = document.querySelector("#answer3");
        const answer4 = document.querySelector("#answer4");
        const answer5 = document.querySelector("#answer5");
        const answer6 = document.querySelector("#answer6");

        // 綁定點擊事件
        let title1Clicked = false;
        let title2Clicked = false;
        let title3Clicked = false;
        let title4Clicked = false;
        let title5Clicked = false;
        let title6Clicked = false;

        qaTitle1.addEventListener("click", () => {
            if (title1Clicked) {
                answer1.style.display = "none";
                title1Clicked = false;
                if (!title1Clicked && !title2Clicked && !title3Clicked) {
                    qaBlock1.style.height = "150px";
                    qaBlock2.style.height = "150px";
                    qaBlock3.style.height = "150px";
                }
            } else {
                qaBlock1.style.height = "680px";
                qaBlock2.style.height = "680px";
                qaBlock3.style.height = "680px";
                answer1.style.display = "block";
                title1Clicked = true;
            }

            console.log(title1Clicked);
        });

        qaTitle2.addEventListener("click", () => {
            if (title2Clicked) {
                answer2.style.display = "none";
                title2Clicked = false;
                if (!title1Clicked && !title2Clicked && !title3Clicked) {
                    qaBlock1.style.height = "150px";
                    qaBlock2.style.height = "150px";
                    qaBlock3.style.height = "150px";
                }

            } else if (!title3Clicked && !title1Clicked) {
                qaBlock1.style.height = "400px";
                qaBlock2.style.height = "400px";
                qaBlock3.style.height = "400px";
                answer2.style.display = "block";
                title2Clicked = true;
            } else if (!title1Clicked && title3Clicked) {
                qaBlock1.style.height = "550px";
                qaBlock2.style.height = "550px";
                qaBlock3.style.height = "550px";
                answer2.style.display = "block";
                title2Clicked = true;
            } else if (title1Clicked && !title3Clicked) {
                qaBlock1.style.height = "680px";
                qaBlock2.style.height = "680px";
                qaBlock3.style.height = "680px";
                answer2.style.display = "block";
                title2Clicked = true;
            } else if (title1Clicked && title3Clicked) {
                qaBlock1.style.height = "680px";
                qaBlock2.style.height = "680px";
                qaBlock3.style.height = "680px";
                answer2.style.display = "block";
                title2Clicked = true;
            }
            console.log(title2Clicked);
        });

        qaTitle3.addEventListener("click", () => {
            if (title3Clicked) {
                answer3.style.display = "none";
                title3Clicked = false;
                if (!title1Clicked && !title2Clicked && !title3Clicked) {
                    qaBlock1.style.height = "150px";
                    qaBlock2.style.height = "150px";
                    qaBlock3.style.height = "150px";
                }
            } else if (!title2Clicked && !title1Clicked) {
                qaBlock1.style.height = "550px";
                qaBlock2.style.height = "550px";
                qaBlock3.style.height = "550px";
                answer3.style.display = "block";
                title3Clicked = true;
            } else if (!title1Clicked && title2Clicked) {
                qaBlock1.style.height = "550px";
                qaBlock2.style.height = "550px";
                qaBlock3.style.height = "550px";
                answer3.style.display = "block";
                title3Clicked = true;
            } else if (title1Clicked && !title2Clicked) {
                qaBlock1.style.height = "680px";
                qaBlock2.style.height = "680px";
                qaBlock3.style.height = "680px";
                answer3.style.display = "block";
                title3Clicked = true;
            } else if (title1Clicked && title2Clicked) {
                qaBlock1.style.height = "680px";
                qaBlock2.style.height = "680px";
                qaBlock3.style.height = "680px";
                answer3.style.display = "block";
                title3Clicked = true;
            }
            console.log(title3Clicked);
        })

        qaTitle4.addEventListener("click", () => {
            if (title4Clicked) {
                answer4.style.display = "none";
                title4Clicked = false;
                if (!title4Clicked && !title5Clicked && !title6Clicked) {
                    qaBlock4.style.height = "150px";
                    qaBlock5.style.height = "150px";
                    qaBlock6.style.height = "150px";
                }
            } else {
                qaBlock4.style.height = "380px";
                qaBlock5.style.height = "380px";
                qaBlock6.style.height = "380px";
                answer4.style.display = "block";
                title4Clicked = true;
            }
        });

        qaTitle5.addEventListener("click", () => {
            if (title5Clicked) {
                answer5.style.display = "none";
                title5Clicked = false;
                if (!title4Clicked && !title5Clicked && !title6Clicked) {
                    qaBlock4.style.height = "150px";
                    qaBlock5.style.height = "150px";
                    qaBlock6.style.height = "150px";
                }
            } else if (!title4Clicked && !title6Clicked) {
                qaBlock4.style.height = "350px";
                qaBlock5.style.height = "350px";
                qaBlock6.style.height = "350px";
                answer5.style.display = "block";
                title5Clicked = true;
            } else if (!title4Clicked && title6Clicked) {
                qaBlock4.style.height = "350px";
                qaBlock5.style.height = "350px";
                qaBlock6.style.height = "350px";
                answer5.style.display = "block";
                title5Clicked = true;
            } else if (title4Clicked && !title6Clicked) {
                qaBlock4.style.height = "380px";
                qaBlock5.style.height = "380px";
                qaBlock6.style.height = "380px";
                answer5.style.display = "block";
                title5Clicked = true;
            } else if (title4Clicked && title6Clicked) {
                qaBlock4.style.height = "380px";
                qaBlock5.style.height = "380px";
                qaBlock6.style.height = "380px";
                answer5.style.display = "block";
                title5Clicked = true;
            }
        });

        qaTitle6.addEventListener("click", () => {
            if (title6Clicked) {
                answer6.style.display = "none";
                title6Clicked = false;
                if (!title4Clicked && !title5Clicked && !title6Clicked) {
                    qaBlock4.style.height = "150px";
                    qaBlock5.style.height = "150px";
                    qaBlock6.style.height = "150px";
                }
            } else if (!title4Clicked && !title5Clicked) {
                qaBlock4.style.height = "280px";
                qaBlock5.style.height = "280px";
                qaBlock6.style.height = "280px";
                answer6.style.display = "block";
                title6Clicked = true;
            } else if (!title4Clicked && title5Clicked) {
                qaBlock4.style.height = "350px";
                qaBlock5.style.height = "350px";
                qaBlock6.style.height = "350px";
                answer6.style.display = "block";
                title6Clicked = true;
            } else if (title4Clicked && !title5Clicked) {
                qaBlock4.style.height = "380px";
                qaBlock5.style.height = "380px";
                qaBlock6.style.height = "380px";
                answer6.style.display = "block";
                title6Clicked = true;
            } else if (title4Clicked && title5Clicked) {
                qaBlock4.style.height = "380px";
                qaBlock5.style.height = "380px";
                qaBlock6.style.height = "380px";
                answer6.style.display = "block";
                title6Clicked = true;
            }
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


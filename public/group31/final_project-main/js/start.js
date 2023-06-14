function SHOW() {
    $(document).ready(function () {
        const progressBar = document.querySelector('.progress-bar');

        let width = 0;
        let timer = setInterval(() => {
            width += 1;
            progressBar.style.width = `${width}%`;

            if (width >= 100) {
                clearInterval(timer);
                setTimeout(() => {
                    window.location.href = './index.html';
                }, 1000);
            }
        }, 40);

    });
}

function bounce() {
    $(document).ready(function () {
        const elements = document.querySelectorAll('.loading');
        const speeds = [0.1, 0.2, 0.5, 0.2, 1.2, 0.4, 0.6, 0.1, 0.4, 0.2]; 

        elements.forEach((el, index) => {
            const speed = speeds[index];
            let posY = 0;
            let direction = 1;

            setInterval(() => {
                el.style.transform = `translateY(${posY}px)`;
                posY += direction * speed;

                if (posY >= 20) {
                    direction = -1; 
                } else if (posY <= 0) {
                    direction = 1;
                }
            }, 10 * speed);
        });
    });
}
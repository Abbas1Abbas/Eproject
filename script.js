document.addEventListener('DOMContentLoaded', () => {
    const handlePageChange = (pageId) => {
        const sections = document.querySelectorAll('.section');
        const activeSection = document.getElementById(pageId);
        sections.forEach((section) => section.classList.remove('active'));
        if (activeSection) {
            activeSection.classList.add('active');
        }
    }

    const handleBarClick = () => {
        const barIcon = document.querySelector('.barIcon');
        const mobView = document.querySelector('.mobView');

        if (barIcon && mobView) {
            barIcon.addEventListener('click', () => {
                barIcon.classList.toggle('fa-xmark');
                mobView.classList.toggle('activeMob');
            });
        }
    }

    const handlePortfolioSlider = () => {
        const portfolioArrowRgt = document.querySelector('.portfolioArrowRgt');
        const portfolioArrowLft = document.querySelector('.portfolioArrowLft');
        const slides = document.querySelectorAll('.upperDiv .slidesDiv .slide');
        const paginations = document.querySelectorAll('.paginationDiv .pagination');
        let index = 0;
    
        const updateSlidePosition = () => {
            const offset = -(index * 100); // Assuming each slide is 100% wide
            slides.forEach(slide => {
                slide.style.transform = `translateX(${offset}%)`;
            });
    
            // Update active pagination dot
            paginations.forEach(dot => dot.classList.remove('activePag'));
            if (paginations[index]) {
                paginations[index].classList.add('activePag');
            }
        }
    
        if (portfolioArrowLft && portfolioArrowRgt && slides.length > 0) {
            portfolioArrowLft.addEventListener('click', () => {
                if (index > 0) {
                    index--;
                    updateSlidePosition();
                }
            });
    
            portfolioArrowRgt.addEventListener('click', () => {
                if (index < slides.length - 1) {
                    index++;
                    updateSlidePosition();
                }
            });
        }
    
        // Add click event to pagination dots
        paginations.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                index = i;
                updateSlidePosition();
            });
        });
    
        updateSlidePosition(); // set initial position
    }
    

    handlePortfolioSlider();
    handleBarClick();
});

const handlePageChange = (pageId) => {
    if(pageId === "about"){
        handlePageChange('home');
        const aboutSection = document.getElementById("about");
        if (aboutSection) aboutSection.scrollIntoView({ behavior: "smooth" });
    }else{
        const sections = document.querySelectorAll('.section');
        const activeSection = document.getElementById(pageId);
        sections.forEach((section) => section.classList.remove('active'));
        if (activeSection) activeSection.classList.add('active');
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

const gallaryHandler = (className) => {
    let linksLis = document.querySelectorAll('.linkDivGallary li');
    let gallaryImages = document.querySelectorAll('.gallaryImage');

    linksLis.forEach((linkLi) => {
        linkLi.addEventListener('click', () => {

            linksLis.forEach((link) => link.classList.remove('activeOne'));
            linkLi.classList.add('activeOne');

            gallaryImages.forEach((image) => {
                image.classList.remove('activeGallaryImages');
                setTimeout(() => {
                    image.classList.remove('block');
                    image.classList.add('none');
                }, 300);
            });

            setTimeout(() => {
                document.querySelectorAll(`.${className}`).forEach((image) => {
                    image.classList.remove('none');
                    image.classList.add('activeGallaryImages');
                });
            }, 300);
        });
    });
};


handleBarClick();
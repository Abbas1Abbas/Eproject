const handlePageChange = (pageId) => {
    const sections = document.querySelectorAll('.section');
    const activeSection = document.getElementById(pageId);
    sections.forEach((section) => section.classList.remove('active'));
    activeSection.classList.add('active');
}

const handleBarClick = () => {
    const barIcon = document.querySelector('.barIcon');

    barIcon.addEventListener('click', () => {
        barIcon.classList.toggle('fa-xmark');
        document.querySelector('.mobView').classList.toggle('activeMob');
    });
}

handleBarClick();
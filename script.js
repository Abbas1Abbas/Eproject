const handlePageChange = (pageId) => {
    if (pageId === "about") {
        handlePageChange('home');
        const aboutSection = document.getElementById("about");
        if (aboutSection) aboutSection.scrollIntoView({ behavior: "smooth" });
    } else {
        const sections = document.querySelectorAll('.section');
        const activeSection = document.getElementById(pageId);
        sections.forEach((section) => section.classList.remove('active'));
        if (activeSection) activeSection.classList.add('active');
    }
};

const handleBarClick = () => {
    const barIcon = document.querySelector('.barIcon');
    const mobView = document.querySelector('.mobView');
    if (barIcon && mobView) {
        barIcon.addEventListener('click', () => {
            barIcon.classList.toggle('fa-xmark');
            mobView.classList.toggle('activeMob');
        });
    }
};

const getGeoLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const mapUrl = `https://www.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
            document.getElementById('locationFrame').src = mapUrl;
        }, (error) => {
            alert("Unable to fetch location.");
            console.error(error);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
};

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

const getOldUsersLocally = () => {
    const data = localStorage.getItem('users');
    return data ? JSON.parse(data) : [];
};

const saveUserLocally = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
};

const handleLogin = (e) => {
    e.preventDefault();

    let email = document.querySelector('.loginEmailInput').value;
    let password = document.querySelector('.loginPassInput').value;

    document.querySelector('.loginEmailInput').value = "";
    document.querySelector('.loginPassInput').value = "";

    if (email.trim() === "" || password.trim() === "") {
        return alert("Please fill in all fields.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return alert("Please enter a valid email address.");
    }

    let users = getOldUsersLocally();
    const foundUser = users.find((oldUser) => oldUser.email === email && oldUser.password === password);
    if (!foundUser) return alert("No User Register with this email or password.");

    handleAccount(foundUser);
};

const handleRegister = (e) => {
    e.preventDefault();

    let email = document.querySelector('.registerEmailInput').value;
    let password = document.querySelector('.registerPassInput').value;

    document.querySelector('.registerEmailInput').value = "";
    document.querySelector('.registerPassInput').value = "";

    if (email.trim() === "" || password.trim() === "") return alert("Please fill in all fields.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return alert("Please enter a valid email address.");
    }

    let users = getOldUsersLocally();
    const userExists = users.find((u) => u.email === email);

    if (userExists) return alert("You already have an account with this email.");

    const newUser = { email, password };
    users.push(newUser);
    saveUserLocally(users);
    handleAccount(newUser);
};

const getCurrentUser = () => {
    const userString = localStorage.getItem('currentLoginUser');
    if (userString) {
        try {
            const user = JSON.parse(userString);
            if (user?.email && user?.password) {
                handleAccount(user);
            }
        } catch (err) {
            console.error("Error parsing currentLoginUser from localStorage:", err);
        }
    }
};

const handleForgotPass = (e) => {
    e.preventDefault();

    const forgotEmail = document.querySelector('.forgotPassEmailInput').value;
    document.querySelector('.forgotPassEmailInput').value = "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(forgotEmail)) return alert("Please enter a valid email address.");

    let users = getOldUsersLocally();
    const foundUser = users.find((user) => user.email === forgotEmail);

    if (!foundUser) return alert("No account has been registered with this email.");

    alert(`Your old password is: ${foundUser.password}`);

    const wantToChange = confirm("Do you want to change your password?");
    if (wantToChange) {
        let newPass = prompt("Enter new password", foundUser.password);
        newPass = newPass.trim();

        if (!newPass) return alert("Password not changed.");

        users = users.map((user) =>
            user.email === foundUser.email ? { ...user, password: newPass } : user
        );

        saveUserLocally(users);
        alert("Password successfully changed.");
        handleAccount({ email: foundUser.email, password: newPass });
    } else handleAccount(foundUser);
};

const handleAccount = (userDetail) => {
    if(!userDetail) return;

    console.log("Logged in as:", userDetail.email);
    localStorage.setItem('currentLoginUser', JSON.stringify(userDetail));

    if (userDetail) {
        const unauthDiv = document.querySelector('.unAuthenticatedDiv');
        const authDiv = document.querySelector('.authenticatedDiv');

        if (unauthDiv && authDiv) {
            unauthDiv.classList.remove('visibleDiv');
            unauthDiv.classList.add('hiddenDiv');

            authDiv.classList.remove('hiddenDiv');
            authDiv.classList.add('visibleDiv');
            document.querySelector('.accountLi').style.display = "none";
            document.querySelector('.userEmail').innerText = userDetail.email;
        }
    }
};

const handleLogout = () => {
    localStorage.removeItem('currentLoginUser');
    handleAccount();
    window.location.reload();
}

handleBarClick();
getGeoLocation();
getCurrentUser();
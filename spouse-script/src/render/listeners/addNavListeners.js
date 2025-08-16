import { divMap } from "../../util/util.js";

const navListeners = async function () {
    // Toggle

    document.querySelector('.mobile-menu-btn').addEventListener('click', () => {
        divMap.navLinks.classList.toggle('active');
    });
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            divMap.navLinks.classList.remove('active');
        });
    });
};

export default navListeners
import { myKey, setMyKey, stateManager } from "../../state/stateManager.js";
import { renderDisplayCase } from "../renderManager.js";
export default async function addApiInputListeners() {
    if (myKey) {
        if (document.getElementById('apikeyfield')) {
            document.getElementById('apikeyfield').remove();
        }
    } else {
        document.getElementById("submitkey").addEventListener("click", async (e) => {
            e.preventDefault();
            setMyKey(document.getElementById('apikey').value);
            document.getElementById('apikeyfield').remove();
            await stateManager()
            renderDisplayCase();
        });
        document.getElementById('apikeyfield').addEventListener("submit", async (e) => {
            e.preventDefault();
            setMyKey(document.getElementById('apikey').value);
            document.getElementById('apikeyfield').remove();
            await stateManager()
            renderDisplayCase();
        });




        // Actual path to your API key page
        document.getElementById('apiKeyLink').href = "https://www.torn.com/preferences.php#tab=api?step=addNewKey&title=TornAIDS&type=3";



        // Set up hover/touch events
        if (window.matchMedia('(hover: hover)').matches) {
            // Desktop with hover support
            document.getElementById('apiNotification').addEventListener('mouseenter', showPopup);
            document.getElementById('apiNotification').addEventListener('mouseleave', hidePopup);
        } else {
            // Mobile devices (tap to show)
            document.getElementById('apiNotification').addEventListener('click', function (e) {
                e.preventDefault();
                togglePopup();
            });
        }

        // Close button click
        document.getElementById('closePopup').addEventListener('click', function (e) {
            e.stopPropagation();
            hidePopup();
        });

        async function showPopup() {
            document.getElementById('notificationPopup').classList.add('visible');
            document.getElementById('badgeCount').style.backgroundColor = '#6366f1'; // Slightly lighter when active
        }

        async function hidePopup() {
            document.getElementById('notificationPopup').classList.remove('visible');
            document.getElementById('badgeCount').style.backgroundColor = '#4f46e5'; // Original color
        }

        async function togglePopup() {
            if (document.getElementById('notificationPopup').classList.contains('visible')) {
                hidePopup();
            } else {
                showPopup();
            }
        }

        // Close when clicking outside on mobile
        document.addEventListener('click', function (e) {
            if (document.getElementById('notificationPopup')) {
                if (!document.getElementById('notificationPopup').contains(e.target) && document.getElementById('notificationPopup').classList.contains('visible')) {
                    hidePopup();
                }
            }

        });
    };
};
const pages = {
    "home": {
        name: "Home",
        link: "home",
        html: `
        <div class="hero-content" id="home-hero">
            <h1>TornAIDS</h1>
            <p>Micro-plastics in your balls. LEGO is Danish. Hurts up Bum.</p>
            
        </div>
    `,

    },
    "travel": {
        name: 'Travel',
        link: "travel",
        html: `
        <div class="hero-content">
            <h1>Travel Storage</h1>
            <p>A summary of what you have stored in display case.</p>

            <div class="toggle-container">
                <div class="toggle-wrapper">
                    <input type="radio" id="solo-option" value="false" name="spouse-status" class="toggle-option">
                    <input type="radio" id="spouse-option" value="true" name="spouse-status" class="toggle-option">
                    <div class="toggle-slider"></div>

                    <div class="toggle-labels">
                        <label for="solo-option" class="toggle-label toggle-label-solo">Solo</label>
                        <label for="spouse-option" class="toggle-label toggle-label-spouse">Spouse</label>
                    </div>
                </div>
        
            </div>

            <div class="filter-container">
                <h2>Filter Items</h2>
                <div class="filter-options">
                    <div class="filter-group">
                        <h3>Categories</h3>
                        <div class="filter-item">
                            <input type="checkbox" id="flowers" name="flowers" value="Flower">
                            <label for="flowers">Flowers</label>
                        </div>
                        <div class="filter-item">
                            <input type="checkbox" id="plushies" name="plushies" value="Plushie">
                            <label for="plushies">Plushies</label>
                        </div>
                        <div class="filter-item">
                            <input type="checkbox" id="drugs" name="drugs" value="Drug">
                            <label for="drugs">Drugs & Temps</label>
                        </div>
                    </div>
                    <div class="filter-group">
                        <h3>Show Empty?</h3>
                        <div class="filter-item-empty">
                            <input type="checkbox" id="showEmpty" name="showempty" value="ShowEmpty">
                        </div>
                    </div>
                </div>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr id="display-head">
                            <th>Item</th>
                            <th>Image</th>
                            <th>Location</th>
                            <th>You</th>
                            <th id="display-spouse-head">Spouse</th>
                            <th id="display-total-head">Total</th>
                        </tr>
                    </thead>
                    <tbody id="itemsContainer">
                    </tbody>
                </table>
                <div id="travel-spinner" class="spinner-cube">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
            </div>
            <a href="#home" class="btn">To Top</a>
        </div>
    `

    },
    "vault": {
        name: "Vault",
        link: "vault",
        html: `<!--Vault -->
    
        <div class="hero-content">
            <h1>Vault</h1>
            <p>Coming soon...</p>
            <a href="#home" class="btn">To Top</a>
        </div>
    `
    },
    "settings": {
        name: "Settings",
        link: "settings",
        html: `<!--Settings -->
    
        <div class="hero-content">
            <h1>Settings</h1>
            <p>Here are some buttons to help if you get stuck</p>

            <div class="btn">Delete Data</div>
            
            <br/>
            <br/>
            <hr/>
            <br/>
            <a href="#home" class="btn">To Top</a>
        </div>
    `
    }

};

const footerContent = ` <!--Fin-->
<footer>
<p>&copy; 2025 saucedontsauce || D00dleD . All rights reserved.</p>
</footer>`;

const navContent = `
            <div class="navbar-container">
                <div class="logo">
                    <img src="https://placehold.co/40x40" alt="Company logo" class="logo-img" id="logo-icon" />
                        <span class="logo-text"  id="nav-title">TornAIDS</span>

                        <form class="api-key-field" id="apikeyfield">
                            <input type="text" name="apikey" id="apikey" placeholder="API key"/>
                            <button class="btn py-0" id="submitkey">+</button>
                            <div class="notification-badge" id="apiNotification">
                                <button type="button" class="text-gray-700 hover:text-gray-900 px-3 py-2 relative">
                                    <span class="badge-count" id="badgeCount">?</span>
                                </button>
                                <div class="notification-popup" id="notificationPopup">
                                    <button type="button" class="close-btn" id="closePopup">✕</button>
                                    <div class="popup-title">API Key</div>
                                    <div class="popup-message">
                                        To use our Tool, you'll need an API key. Click below to get your key from Torn.
                                        Your API key will only be stored on your device unless consent is given.
                                    </div>
                                    <a href="#" target="_blank" class="popup-link" id="apiKeyLink">Get API Key →</a>                                    </div>
                                </div>
                            </div>
                            
                        </form>
                </div>

                <ul id="navlink-holder" class="nav-links">
                
                </ul>
                <button class="mobile-menu-btn">☰</button>
            </div>
        `

export { pages, navContent, footerContent }
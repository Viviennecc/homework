const iframe = document.querySelector('iframe[name="incontent"]');
const footerText = document.querySelector(".end p");
let clockInterval;

const countryConfig = {
  "iceland.html": {
    name: "Iceland",
    tz: "Atlantic/Reykjavik",
    city: "Reykjavik",
  },
  "finland.html": { name: "Finland", tz: "Europe/Helsinki", city: "Helsinki" },
  "sweden.html": { name: "Sweden", tz: "Europe/Stockholm", city: "Stockholm" },
  "norway.html": { name: "Norway", tz: "Europe/Oslo", city: "Oslo" },
};

// 1. Enter your key from https://home.openweathermap.org
const API_KEY = "f03eee1f0f50bbba36da7fc8b7f3313f";

iframe.addEventListener("load", function () {
  clearInterval(clockInterval);

  try {
    const currentPath = iframe.contentWindow.location.pathname;
    const fileName = currentPath.split("/").pop();
    const data = countryConfig[fileName];

    if (data) {
      const updateUI = async () => {
        const now = new Date();

        // 3. Time and Date
        const timeStr = now.toLocaleTimeString("en-GB", {
          timeZone: data.tz,
          hour12: false,
        });
        const dateStr = now.toLocaleDateString("en-GB", {
          timeZone: data.tz,
          day: "2-digit",
          month: "long",
        });

        // 4. Weather Fetch
        let weatherHTML = "Loading...";
        try {
          // FIXED: Added correct API path /data/2.5/weather and used ${} syntax
          const url = `https://openweathermap.org{data.city}&units=metric&appid=${API_KEY}`;
          const res = await fetch(url);
          const wData = await res.json();

          if (res.ok) {
            const temp = Math.round(wData.main.temp);
            const iconCode = wData.weather[0].icon;
            // FIXED: Added missing $ sign for template literal
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            weatherHTML = `${temp}°C <img src="${iconUrl}" alt="weather" style="vertical-align: middle; width: 35px;">`;
          } else {
            weatherHTML = "Weather error";
          }
        } catch (err) {
          weatherHTML = "Offline";
        }

        // 5. Update the Footer (Centered by CSS)
        footerText.innerHTML = `
          <span>Welcome to ${data.name} | ${dateStr} ${timeStr}</span>
          <span>${data.city}: ${weatherHTML}</span>
        `;
      };

      updateUI();
      clockInterval = setInterval(updateUI, 1000);
    } else {
      // Default Centered Text
      footerText.innerHTML = `<span>Welcome to the Nordics</span>`;
    }
  } catch (e) {
    console.warn("Iframe access restricted. Run via a Local Server.");
  }
});

window.addEventListener("DOMContentLoaded", () => {
   // Tabs

   const tabs = document.querySelectorAll(".tabheader__item"),
      tabsContent = document.querySelectorAll(".tabcontent"),
      tabsParent = document.querySelector(".tabheader__items");

   function hideTabContent() {
      tabsContent.forEach((item) => {
         item.classList.add("hide");
         item.classList.remove("show", "fade");
      });
      tabs.forEach((item) => {
         item.classList.remove("tabheader__item_active");
      });
   }
   function showTabContent(i = 0) {
      tabsContent[i].classList.add("show", "fade");
      tabsContent[i].classList.remove("hide");
      tabs[i].classList.add("tabheader__item_active");
   }

   hideTabContent();
   showTabContent();

   tabsParent.addEventListener("click", (event) => {
      const target = event.target;

      if (target && target.classList.contains("tabheader__item")) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hideTabContent();
               showTabContent(i);
            }
         });
      }
   });

   //Timer

   const deadline = "2023-01-31";
   function getTimeRemaining(endtime) {
      let days, hours, minutes, seconds;
      const t = Date.parse(endtime) - Date.parse(new Date());
      if (t <= 0) {
         days = 0;
         hours = 0;
         minutes = 0;
         seconds = 0;
      } else {
         days = Math.floor(t / (1000 * 60 * 60 * 24));
         hours = Math.floor((t / (1000 * 60 * 60)) % 24);
         (minutes = Math.floor((t / 1000 / 60) % 60))(
            (seconds = Math.floor((t / 1000) % 60))
         );
      }
      return {
         total: t,
         days,
         hours,
         minutes,
         seconds,
      };
   }

   function getZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      }
      return num;
   }

   function setClock(selector, endtime) {
      const timer = document.querySelector(selector),
         days = document.querySelector("#days"),
         hours = document.querySelector("#hours"),
         minutes = document.querySelector("#minutes"),
         seconds = document.querySelector("#seconds"),
         timeInterval = setInterval(updateClock, 1000);
      updateClock();
      function updateClock() {
         const t = getTimeRemaining(endtime);
         days.innerHTML = getZero(t.days);
         hours.innerHTML = getZero(t.hours);
         minutes.innerHTML = getZero(t.minutes);
         seconds.innerHTML = getZero(t.seconds);
         if (t.total <= 0) {
            clearInterval(timeInterval);
         }
      }
   }

   setClock(".timer", deadline);

   // Modal

   const modalTrigger = document.querySelectorAll("       [data-modal]"),
      modal = document.querySelector(".modal"),
      modalCloseBtn = document.querySelector("[data-close]");

   function openModal() {
      modal.classList.add("show");
      modal.classList.remove("hide");
      document.body.style.overflow = "hidden";
      clearInterval(modalTimerId);
   }

   modalTrigger.forEach((btn) => {
      btn.addEventListener("click", openModal);
   });

   function closeModal() {
      modal.classList.add("hide");
      modal.classList.remove("show");
      document.body.style.overflow = "";
   }

   modalCloseBtn.addEventListener("click", closeModal);

   modal.addEventListener("click", (e) => {
      if (e.target === modal) {
         closeModal();
      }
   });

   document.addEventListener("keydown", (e) => {
      if (e.code === "Escape" && modal.classList.contains("show")) {
         closeModal();
      }
   });

   const modalTimerId = setTimeout(openModal, 5000);

   function showModalScroll() {
      if (
         window.pageYOffset + document.documentElement.clientHeight >=
         document.documentElement.scrollHeight - 1
      ) {
         openModal();
         window.removeEventListener("scroll", showModalScroll);
      }
   }

   window.addEventListener("scroll", showModalScroll);
});

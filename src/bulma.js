
/* NAVBAR */
function setupNavbar() {
   const hamburgers = document.querySelectorAll('.navbar-burger');
   if (!hamburgers.length) {
      return;
   }

   hamburgers.forEach((hamburger) => {
      hamburger.addEventListener('click', () => {
         const target = hamburger.dataset.target && document.getElementById(hamburger.dataset.target);
         hamburger.classList.toggle('is-active');
         target?.classList.toggle('is-active');
      });
   });
}

/* MODAL */
function toggleModal(modal) {
   modal.classList.toggle("is-active");
}

function setupOpenTriggers() {
   const triggerElements = document.querySelectorAll("[data-bulma-target='modal']");
   triggerElements.forEach((triggerElement) => {
      const targetSelector = triggerElement.dataset.bulmaTargetId;
      if (!targetSelector) {
         return;
      }

      const target = document.getElementById(targetSelector);
      if (!target) {
         console.error(`There is no HTMLElement with id ${targetSelector}`);
         return;
      }

      const trigger = triggerElement.dataset.bulmaTrigger ?? "click";
      const eventListener = () => toggleModal(target);
      triggerElement.removeEventListener(trigger, eventListener);
      triggerElement.addEventListener(trigger, eventListener);
   });
}

function setupDismissTrigers() {
   const modals = document.querySelectorAll(".modal");
   modals.forEach((modal) => {
      const children = modal.querySelectorAll("[data-bulma-modal='close'], .modal-background");
      children.forEach((child) => {
         const eventListener = () => toggleModal(modal);
         child.removeEventListener("click", eventListener);
         child.addEventListener("click", eventListener);
      });
   });
}

function setupModals() {
   setupOpenTriggers();
   setupDismissTrigers();
}

/* EXPORTS */
module.exports = {
   setupNavbar,
   setupModals
}
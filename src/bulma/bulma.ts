
/* NAVBAR */
function setupNavbar(): void {
   const hamburgers: NodeListOf<HTMLElement> = document.querySelectorAll('.navbar-burger');
   if (!hamburgers.length) {
      return;
   }

   hamburgers.forEach((hamburger) => {
      hamburger.addEventListener('click', () => {
         const target = document.getElementById(hamburger.dataset.target ?? "");
         hamburger.classList.toggle('is-active');
         target?.classList.toggle('is-active');
      });
   });
}

/* MODAL */
function toggleModal(modal: HTMLElement): void {
   modal.classList.toggle("is-active");
}

function setupOpenTriggers(): void {
   const triggerElements: NodeListOf<HTMLElement> = document.querySelectorAll("[data-bulma-target='modal']");
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

function setupDismissTrigers(): void {
   const modals: NodeListOf<HTMLElement> = document.querySelectorAll(".modal");
   modals.forEach((modal) => {
      const children = modal.querySelectorAll("[data-bulma-modal='close'], .modal-background");
      children.forEach((child) => {
         const eventListener = () => toggleModal(modal);
         child.removeEventListener("click", eventListener);
         child.addEventListener("click", eventListener);
      });
   });
}

function setupModals(): void {
   setupOpenTriggers();
   setupDismissTrigers();
}

export default {
   setupNavbar,
   setupModals
}

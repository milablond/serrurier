// Variables globales
let currentPage = 'accueil';

// Gestion de la navigation
document.addEventListener('DOMContentLoaded', function () {
  // Navigation active
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.page-section');

  // Cacher toutes les sections sauf accueil
  sections.forEach((section) => {
    if (section.id !== 'accueil') {
      section.style.display = 'none';
    }
  });

  // Gestion des liens de navigation
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      showPage(targetId);

      // Fermer le menu mobile
      document.getElementById('mobile-menu').classList.remove('active');
    });
  });

  // Menu mobile
  document
    .getElementById('mobile-menu-btn')
    .addEventListener('click', function () {
      document.getElementById('mobile-menu').classList.toggle('active');
    });

  // Liens du menu mobile
  const mobileLinks = document.querySelectorAll('#mobile-menu a');
  mobileLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      showPage(targetId);
      document.getElementById('mobile-menu').classList.remove('active');
    });
  });
});

// Fonction pour afficher une page
function showPage(pageId) {
  // Masquer toutes les sections
  const sections = document.querySelectorAll('.page-section');
  sections.forEach((section) => {
    section.style.display = 'none';
  });

  // Afficher la section demandée
  const targetSection = document.getElementById(pageId);
  if (targetSection) {
    targetSection.style.display = 'block';
    currentPage = pageId;
  }

  // Mettre à jour la navigation active
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    link.classList.remove('nav-active');
    if (link.getAttribute('href') === '#' + pageId) {
      link.classList.add('nav-active');
    }
  });
}

// Fonction pour scroller vers le formulaire de contact
function scrollToContact() {
  showPage('contact');
}

// Simulateur de devis
function calculateEstimate() {
  const serviceType = document.getElementById('service-type').value;
  const doorType = document.getElementById('door-type').value;
  const urgence = document.getElementById('urgence').checked;

  if (!serviceType) {
    alert('Veuillez sélectionner un type de service');
    return;
  }

  let basePrice = 0;
  let serviceName = '';

  // Prix de base selon le service
  switch (serviceType) {
    case 'ouverture':
      basePrice = 79;
      serviceName = 'Ouverture de porte claquée';
      break;
    case 'remplacement':
      basePrice = 150;
      serviceName = 'Remplacement de serrure';
      break;
    case 'verrou':
      basePrice = 120;
      serviceName = 'Installation de verrou';
      break;
    case 'blindage':
      basePrice = 300;
      serviceName = 'Blindage de porte';
      break;
    case 'porte-blindee':
      basePrice = 800;
      serviceName = 'Pose de porte blindée';
      break;
    case 'copie-cle':
      basePrice = 25;
      serviceName = 'Copie de clé sécurisée';
      break;
  }

  // Ajustement selon le type de porte
  let doorMultiplier = 1;
  if (doorType === 'blindee') {
    doorMultiplier = 1.5;
  } else if (doorType === 'pvc') {
    doorMultiplier = 1.2;
  }

  // Calcul du prix final
  let finalPrice = Math.round(basePrice * doorMultiplier);
  let urgencePrice = finalPrice;

  // Majoration d'urgence
  if (urgence) {
    urgencePrice = finalPrice + 50;
  }

  // Affichage du résultat
  const resultDiv = document.getElementById('estimate-result');
  resultDiv.innerHTML = `
                <div class="text-center">
                    <h4 class="text-lg font-semibold text-gray-800 mb-2">${serviceName}</h4>
                    <div class="text-3xl font-bold text-blue-800 mb-2">
                        ${finalPrice} € ${
    urgence ? ' - ' + urgencePrice + ' €' : ' - ' + (finalPrice + 50) + ' €'
  }
                    </div>
                    <p class="text-sm text-gray-600">
                        ${
                          urgence
                            ? "Tarif d'urgence appliqué"
                            : 'Estimation standard (+ 50 € en urgence)'
                        }
                    </p>
                    <p class="text-xs text-gray-500 mt-2">
                        *Tarif indicatif, devis final après diagnostic sur place
                    </p>
                </div>
            `;

  // Afficher le bouton de devis
  document.getElementById('devis-btn').style.display = 'block';
}

// Gestion des modals
function openUrgenceModal() {
  document.getElementById('urgence-modal').classList.add('active');
}

function closeUrgenceModal() {
  document.getElementById('urgence-modal').classList.remove('active');
}

function openDevisModal() {
  document.getElementById('devis-modal').classList.add('active');
}

function closeDevisModal() {
  document.getElementById('devis-modal').classList.remove('active');
}

// Fermer les modals en cliquant à l'extérieur
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('active');
  }
});

// Gestion des formulaires
document
  .getElementById('contact-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();
    alert(
      'Merci pour votre demande ! Nous vous contacterons dans les plus brefs délais.'
    );
    this.reset();
  });

document
  .getElementById('urgence-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();
    alert("Votre demande d'urgence a été envoyée !");
    this.reset();
    closeUrgenceModal();
  });

document.getElementById('devis-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert(
    'Votre demande de devis a été envoyée ! Nous vous contacterons sous 24h.'
  );
  this.reset();
  closeDevisModal();
});

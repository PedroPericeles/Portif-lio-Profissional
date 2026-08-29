const typingElement = document.querySelector(".typing");

if (typingElement) {
  var typed = new Typed(".typing", {
    strings: ["Engenheiro de Software", "Web Developer"],
    typeSpeed: 100,
    backSpeed: 60, 
    loop: true
  });
}

const nav = document.querySelector(".nav");
const navlist = nav ? nav.querySelectorAll("li") : [];
const totalNavList = navlist.length;
const aside = document.querySelector(".aside");
const navToggler = document.querySelector(".nav-toggler");

for (let i = 0; i < totalNavList; i++) {
  const a = navlist[i].querySelector("a");
  a.addEventListener("click", function () {
    for (let j = 0; j < totalNavList; j++) {
      navlist[j].querySelector("a").classList.remove("active");
    }
    this.classList.add("active");

    if (aside) {
      aside.classList.remove("open");
    }

    if (navToggler) {
      navToggler.classList.remove("open");
    }
  });
}

if (navToggler) {
  navToggler.addEventListener("click", () => {
    navToggler.classList.toggle("open");
    if (aside) {
      aside.classList.toggle("open");
    }
  });
}
/* =========================================
   Função de Tradução Dinâmica (PT / EN)
========================================= */
function mudarIdioma(idioma) {
  // Seleciona todos os elementos do HTML que possuem essas classes
  const textosPt = document.querySelectorAll('.lang-pt');
  const textosEn = document.querySelectorAll('.lang-en');
  const botoesIdioma = document.querySelectorAll('.idioma-btn');

  botoesIdioma.forEach(function (botao) {
    const ativo = botao.dataset.idioma === idioma;
    botao.classList.toggle('ativo', ativo);
    botao.setAttribute('aria-pressed', ativo);
  });

  if (idioma === 'en') {
    // Esconde os textos em português e mostra os em inglês
    textosPt.forEach(function (texto) {
      texto.classList.add('hidden');
    });
    textosEn.forEach(function (texto) {
      texto.classList.remove('hidden');
    });
  }
  else {
    // Esconde os textos em inglês e mostra os em português
    textosEn.forEach(function (texto) {
      texto.classList.add('hidden');
    });
    textosPt.forEach(function (texto) {
      texto.classList.remove('hidden');
    });
  }
}

const contactForm = document.querySelector(".contato-form form");
const formSuccess = document.querySelector(".form-success");
const formStatus = document.querySelector(".form-status");
const newMessageButton = document.querySelector(".new-message-button");
const submitButton = document.querySelector(".submit-button");

if (contactForm && formSuccess && formStatus && newMessageButton && submitButton) {
  const showSuccessState = () => {
    contactForm.reset();
    contactForm.hidden = true;
    formSuccess.hidden = false;
    formStatus.textContent = "Mensagem enviada com sucesso!";
    formStatus.className = "form-status info";
  };

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Enviando...';
    formStatus.textContent = "";
    formStatus.className = "form-status";

    const isLocalFile = window.location.protocol === "file:";

    if (isLocalFile) {
      showSuccessState();
      submitButton.disabled = false;
      submitButton.innerHTML = '<i class="fa fa-paper-plane"></i> Enviar Mensagem';
      setTimeout(() => {
        contactForm.submit();
      }, 50);
      return;
    }

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error("Falha no envio");
      }

      showSuccessState();
    } catch (error) {
      formStatus.textContent = "Não foi possível enviar agora. Tente novamente em instantes.";
      formStatus.classList.add("error");
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = '<i class="fa fa-paper-plane"></i> Enviar Mensagem';
    }
  });

  newMessageButton.addEventListener("click", () => {
    formSuccess.hidden = true;
    contactForm.hidden = false;
    formStatus.textContent = "";
    formStatus.className = "form-status";
    contactForm.querySelector("input").focus();
  });
}
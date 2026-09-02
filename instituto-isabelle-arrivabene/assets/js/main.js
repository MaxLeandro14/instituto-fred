/* ==========================================================================
   MAIN — Instituto Isabelle Arrivabene
   Header, menu móvel, revelação por scroll, voltar ao topo, ano do rodapé.

   Zero dependência. Todo comportamento aqui é progressivo: se este arquivo
   não carregar, a página continua legível e navegável.

   WP: enfileirar com wp_enqueue_script('iia-main', ..., [], null, true).
   ========================================================================== */
(function () {
  "use strict";

  var reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------------
     HEADER — transparente no topo, campo de queima ao rolar.
     O limiar é 24px: cedo o bastante para o texto nunca ficar sem fundo.
     ------------------------------------------------------------------------ */
  var header = document.querySelector("[data-header]");

  if (header) {
    var travado = false;

    var atualizaHeader = function () {
      travado = false;
      var passou = window.scrollY > 24;
      header.classList.toggle("header--fixo", passou);
    };

    var pedeHeader = function () {
      if (travado) return;
      travado = true;
      window.requestAnimationFrame(atualizaHeader);
    };

    window.addEventListener("scroll", pedeHeader, { passive: true });
    atualizaHeader();
  }

  /* ------------------------------------------------------------------------
     MENU MÓVEL — a camada que desce sobre o campo.
     Fecha em Escape, em clique de link e ao voltar para desktop.
     Prende o foco enquanto está aberto e devolve ao botão ao fechar.
     ------------------------------------------------------------------------ */
  var menuBtn = document.querySelector("[data-menu-btn]");
  var menu = document.querySelector("[data-menu]");

  if (menuBtn && menu) {
    menu.removeAttribute("hidden");

    var focaveis =
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

    var abreMenu = function () {
      menu.setAttribute("data-aberto", "true");
      menuBtn.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-aberto");
      var primeiro = menu.querySelector(focaveis);
      if (primeiro) primeiro.focus();
    };

    var fechaMenu = function (devolveFoco) {
      menu.setAttribute("data-aberto", "false");
      menuBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-aberto");
      if (devolveFoco) menuBtn.focus();
    };

    menuBtn.addEventListener("click", function () {
      if (menuBtn.getAttribute("aria-expanded") === "true") {
        fechaMenu(true);
      } else {
        abreMenu();
      }
    });

    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) fechaMenu(false);
    });

    document.addEventListener("keydown", function (e) {
      if (menu.getAttribute("data-aberto") !== "true") return;

      if (e.key === "Escape") {
        fechaMenu(true);
        return;
      }

      /* Prende o foco dentro da camada. */
      if (e.key === "Tab") {
        var itens = Array.prototype.filter.call(
          menu.querySelectorAll(focaveis),
          function (el) {
            return el.offsetParent !== null;
          }
        );
        if (!itens.length) return;
        var primeiro = itens[0];
        var ultimo = itens[itens.length - 1];

        if (e.shiftKey && document.activeElement === primeiro) {
          e.preventDefault();
          ultimo.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault();
          primeiro.focus();
        }
      }
    });

    /* Ao passar para desktop o menu não pode ficar preso aberto. */
    var largo = window.matchMedia("(min-width: 54.0625rem)");
    var aoMudarLargura = function (mq) {
      if (mq.matches && menu.getAttribute("data-aberto") === "true") {
        fechaMenu(false);
      }
    };
    if (largo.addEventListener) {
      largo.addEventListener("change", aoMudarLargura);
    } else if (largo.addListener) {
      largo.addListener(aoMudarLargura);
    }
  }

  /* ------------------------------------------------------------------------
     REVELAÇÃO POR SCROLL — a partir de um padrão já visível.
     Sem IntersectionObserver (ou com movimento reduzido), tudo já está lá.
     ------------------------------------------------------------------------ */
  var aRevelar = document.querySelectorAll("[data-revelar]");

  if (aRevelar.length) {
    if (reduzido || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(aRevelar, function (el) {
        el.classList.add("revelado");
      });
    } else {
      var olho = new IntersectionObserver(
        function (entradas) {
          entradas.forEach(function (entrada) {
            if (!entrada.isIntersecting) return;
            entrada.target.classList.add("revelado");
            olho.unobserve(entrada.target);
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
      );

      Array.prototype.forEach.call(aRevelar, function (el) {
        /* O que já está no primeiro viewport não espera scroll nenhum. */
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
          el.classList.add("revelado");
        } else {
          olho.observe(el);
        }
      });
    }
  }

  /* ------------------------------------------------------------------------
     VOLTAR AO TOPO
     ------------------------------------------------------------------------ */
  var aoTopo = document.querySelector("[data-ao-topo]");

  if (aoTopo) {
    var travadoTopo = false;

    var atualizaTopo = function () {
      travadoTopo = false;
      aoTopo.setAttribute(
        "data-visivel",
        window.scrollY > window.innerHeight ? "true" : "false"
      );
    };

    window.addEventListener(
      "scroll",
      function () {
        if (travadoTopo) return;
        travadoTopo = true;
        window.requestAnimationFrame(atualizaTopo);
      },
      { passive: true }
    );

    aoTopo.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduzido ? "auto" : "smooth" });
    });

    atualizaTopo();
  }

  /* ------------------------------------------------------------------------
     ANO DO RODAPÉ
     ------------------------------------------------------------------------ */
  var ano = document.querySelector("[data-ano]");
  if (ano) ano.textContent = String(new Date().getFullYear());

  /* ------------------------------------------------------------------------
     NEWSLETTER — sem backend nesta fase.
     Valida, confirma e deixa claro que o envio ainda não está conectado.
     ------------------------------------------------------------------------ */
  var news = document.querySelector("[data-news]");
  var newsEstado = document.querySelector("[data-news-estado]");

  if (news && newsEstado) {
    news.addEventListener("submit", function (e) {
      e.preventDefault();
      var campo = news.querySelector('input[type="email"]');
      newsEstado.hidden = false;

      if (!campo.value || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(campo.value)) {
        newsEstado.textContent = "Confira o e-mail: parece estar incompleto.";
        campo.focus();
        return;
      }

      /* WP: trocar por wp_ajax_ ou pelo endpoint do plugin de e-mail. */
      newsEstado.textContent =
        "Pronto. Assim que o envio for conectado, você recebe as próximas turmas.";
      news.reset();
    });
  }
})();

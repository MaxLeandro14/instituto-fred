/* ==========================================================================
   COMPONENTES — Instituto Isabelle Arrivabene
   Acordeão, carrossel, filtro de catálogo, busca de professores, modal de
   ficha docente, validação de formulário.

   Zero dependência. Cada componente só se instala se o seu marcador existir
   na página, e todos degradam para conteúdo legível sem JS.

   WP: enfileirar com wp_enqueue_script('iia-componentes', ..., [], null, true).
   ========================================================================== */
(function () {
  "use strict";

  var reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ========================================================================
     ACORDEÃO — FAQ e grade curricular.
     Um item aberto por grupo quando o grupo pede exclusividade.
     ======================================================================== */
  Array.prototype.forEach.call(
    document.querySelectorAll("[data-acordeao]"),
    function (grupo) {
      var exclusivo = grupo.getAttribute("data-acordeao") === "exclusivo";
      var gatilhos = grupo.querySelectorAll("[data-acordeao-gatilho]");

      Array.prototype.forEach.call(gatilhos, function (gatilho) {
        var painel = document.getElementById(
          gatilho.getAttribute("aria-controls")
        );
        if (!painel) return;

        /* Estado inicial: fechado, salvo quem já vem marcado como aberto. */
        var aberto = gatilho.getAttribute("aria-expanded") === "true";
        painel.setAttribute("data-aberto", aberto ? "true" : "false");

        gatilho.addEventListener("click", function () {
          var vaiAbrir = gatilho.getAttribute("aria-expanded") !== "true";

          if (exclusivo && vaiAbrir) {
            Array.prototype.forEach.call(gatilhos, function (outro) {
              if (outro === gatilho) return;
              var outroPainel = document.getElementById(
                outro.getAttribute("aria-controls")
              );
              outro.setAttribute("aria-expanded", "false");
              if (outroPainel) outroPainel.setAttribute("data-aberto", "false");
            });
          }

          gatilho.setAttribute("aria-expanded", vaiAbrir ? "true" : "false");
          painel.setAttribute("data-aberto", vaiAbrir ? "true" : "false");
        });
      });
    }
  );

  /* ========================================================================
     CARROSSEL — depoimentos.
     Rola por página real de itens, respeita o snap nativo e desabilita os
     botões nas pontas em vez de fingir um laço infinito.
     ======================================================================== */
  Array.prototype.forEach.call(
    document.querySelectorAll("[data-carrossel]"),
    function (carrossel) {
      var trilha = carrossel.querySelector("[data-carrossel-trilha]");
      var anterior = carrossel.querySelector("[data-carrossel-ant]");
      var proximo = carrossel.querySelector("[data-carrossel-prox]");
      var progresso = carrossel.querySelector("[data-carrossel-progresso]");
      if (!trilha) return;

      var itens = trilha.children;
      var total = itens.length;

      var passo = function () {
        if (!total) return trilha.clientWidth;
        var primeiro = itens[0];
        var estilo = window.getComputedStyle(trilha);
        var vao = parseFloat(estilo.columnGap || estilo.gap || "0") || 0;
        return primeiro.getBoundingClientRect().width + vao;
      };

      var atualiza = function () {
        var max = trilha.scrollWidth - trilha.clientWidth;
        var pos = trilha.scrollLeft;

        if (anterior) anterior.disabled = pos <= 2;
        if (proximo) proximo.disabled = pos >= max - 2;

        if (progresso) {
          var p = passo();
          var atual = p ? Math.round(pos / p) + 1 : 1;
          var visiveis = p ? Math.max(1, Math.round(trilha.clientWidth / p)) : 1;
          var paginas = Math.max(1, total - visiveis + 1);
          progresso.textContent =
            String(Math.min(atual, paginas)) + " / " + String(paginas);
        }
      };

      var move = function (direcao) {
        trilha.scrollBy({
          left: passo() * direcao,
          behavior: reduzido ? "auto" : "smooth"
        });
      };

      if (anterior) anterior.addEventListener("click", function () { move(-1); });
      if (proximo) proximo.addEventListener("click", function () { move(1); });

      var travado = false;
      trilha.addEventListener(
        "scroll",
        function () {
          if (travado) return;
          travado = true;
          window.requestAnimationFrame(function () {
            travado = false;
            atualiza();
          });
        },
        { passive: true }
      );

      window.addEventListener("resize", atualiza);

      /* Setas do teclado quando a trilha tem o foco. */
      trilha.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") { e.preventDefault(); move(1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); move(-1); }
      });

      atualiza();
    }
  );

  /* ========================================================================
     FILTRO DE CATÁLOGO — só visual, sem backend.
     Reflete o recorte na URL para que o estado seja compartilhável, e conta
     em voz alta para leitores de tela.
     ======================================================================== */
  var filtro = document.querySelector("[data-filtro]");

  if (filtro) {
    var botoes = filtro.querySelectorAll("[data-filtro-btn]");
    var alvos = document.querySelectorAll("[data-nivel]");
    var contador = document.querySelector("[data-filtro-contagem]");

    var aplica = function (valor, mexeUrl) {
      var visiveis = 0;

      Array.prototype.forEach.call(alvos, function (alvo) {
        var casa = valor === "todos" || alvo.getAttribute("data-nivel") === valor;
        alvo.hidden = !casa;
        if (casa) visiveis++;
      });

      Array.prototype.forEach.call(botoes, function (btn) {
        btn.setAttribute(
          "aria-pressed",
          btn.getAttribute("data-filtro-btn") === valor ? "true" : "false"
        );
      });

      if (contador) {
        contador.textContent =
          visiveis === 1 ? "1 curso" : String(visiveis) + " cursos";
      }

      if (mexeUrl && window.history && window.history.replaceState) {
        var url = new URL(window.location.href);
        if (valor === "todos") {
          url.searchParams.delete("nivel");
        } else {
          url.searchParams.set("nivel", valor);
        }
        window.history.replaceState({}, "", url);
      }
    };

    Array.prototype.forEach.call(botoes, function (btn) {
      btn.addEventListener("click", function () {
        aplica(btn.getAttribute("data-filtro-btn"), true);
      });
    });

    /* O recorte é endereçável: ?nivel=pos-graduacao abre já filtrado. */
    var inicial = new URL(window.location.href).searchParams.get("nivel");
    aplica(inicial || "todos", false);
  }

  /* ========================================================================
     MODAL — ficha do professor.
     Aqui o modal se justifica: é foco protegido sobre um item de uma grade,
     e voltar à grade na mesma posição é o comportamento certo.
     ======================================================================== */
  var modal = document.querySelector("[data-modal]");

  if (modal) {
    var caixa = modal.querySelector("[data-modal-caixa]");
    var fechar = modal.querySelector("[data-modal-fechar]");
    var devolver = null;

    var abre = function (gatilho) {
      var fonte = document.getElementById(
        gatilho.getAttribute("data-modal-abrir")
      );
      if (!fonte || !caixa) return;

      devolver = gatilho;
      var conteudo = caixa.querySelector("[data-modal-conteudo]");
      if (conteudo) conteudo.innerHTML = fonte.innerHTML;

      modal.setAttribute("data-aberto", "true");
      document.body.classList.add("menu-aberto");
      if (fechar) fechar.focus();
    };

    var fecha = function () {
      modal.setAttribute("data-aberto", "false");
      document.body.classList.remove("menu-aberto");
      if (devolver) {
        devolver.focus();
        devolver = null;
      }
    };

    Array.prototype.forEach.call(
      document.querySelectorAll("[data-modal-abrir]"),
      function (gatilho) {
        gatilho.addEventListener("click", function () { abre(gatilho); });
      }
    );

    if (fechar) fechar.addEventListener("click", fecha);

    /* Clique fora da caixa fecha. */
    modal.addEventListener("mousedown", function (e) {
      if (caixa && !caixa.contains(e.target)) fecha();
    });

    document.addEventListener("keydown", function (e) {
      if (modal.getAttribute("data-aberto") !== "true") return;

      if (e.key === "Escape") {
        fecha();
        return;
      }

      if (e.key === "Tab" && caixa) {
        var itens = Array.prototype.filter.call(
          caixa.querySelectorAll(
            'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ),
          function (el) { return el.offsetParent !== null; }
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
  }

  /* ========================================================================
     FORMULÁRIO — validação no cliente, sem backend nesta fase.
     Cada erro nomeia o problema E a correção. O primeiro campo inválido
     recebe o foco: ninguém deve caçar o erro na página.
     ======================================================================== */
  Array.prototype.forEach.call(
    document.querySelectorAll("[data-form]"),
    function (form) {
      var estado = form.querySelector("[data-form-estado]");

      var regras = {
        nome: function (v) {
          if (!v.trim()) return "Informe seu nome completo.";
          if (v.trim().split(/\s+/).length < 2)
            return "Inclua nome e sobrenome.";
          return "";
        },
        telefone: function (v) {
          var so = v.replace(/\D/g, "");
          if (!so) return "Informe um telefone com DDD.";
          if (so.length < 10)
            return "O telefone está curto. Inclua o DDD — 11 dígitos com o 9.";
          return "";
        },
        email: function (v) {
          if (!v.trim()) return "Informe seu e-mail.";
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()))
            return "Esse e-mail parece incompleto. Confira o trecho depois do @.";
          return "";
        },
        curso: function (v) {
          if (!v) return "Escolha o curso de interesse.";
          return "";
        },
        mensagem: function () { return ""; }
      };

      var valida = function (campo) {
        var input = campo.querySelector("input, select, textarea");
        if (!input) return true;

        var nome = input.getAttribute("name");
        var regra = regras[nome];
        var erro = regra ? regra(input.value) : "";

        var caixaErro = campo.querySelector("[data-erro]");
        campo.setAttribute("data-invalido", erro ? "true" : "false");
        input.setAttribute("aria-invalid", erro ? "true" : "false");
        if (caixaErro) caixaErro.textContent = erro;

        return !erro;
      };

      /* Valida ao sair do campo, nunca a cada tecla. */
      Array.prototype.forEach.call(
        form.querySelectorAll(".campo"),
        function (campo) {
          var input = campo.querySelector("input, select, textarea");
          if (!input) return;

          input.addEventListener("blur", function () { valida(campo); });

          /* Depois de errar, limpa o erro assim que o campo melhora. */
          input.addEventListener("input", function () {
            if (campo.getAttribute("data-invalido") === "true") valida(campo);
          });
        }
      );

      /* Máscara de telefone leve: formata sem impedir a digitação. */
      var tel = form.querySelector('input[name="telefone"]');
      if (tel) {
        tel.addEventListener("input", function () {
          var so = tel.value.replace(/\D/g, "").slice(0, 11);
          var saida = so;
          if (so.length > 2) {
            saida = "(" + so.slice(0, 2) + ") " + so.slice(2);
          }
          if (so.length > 6) {
            var corte = so.length > 10 ? 7 : 6;
            saida =
              "(" + so.slice(0, 2) + ") " + so.slice(2, corte) + "-" + so.slice(corte);
          }
          tel.value = saida;
        });
      }

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        var campos = form.querySelectorAll(".campo");
        var primeiroRuim = null;

        Array.prototype.forEach.call(campos, function (campo) {
          if (!valida(campo) && !primeiroRuim) primeiroRuim = campo;
        });

        if (primeiroRuim) {
          if (estado) estado.setAttribute("data-visivel", "false");
          var alvo = primeiroRuim.querySelector("input, select, textarea");
          if (alvo) alvo.focus();
          return;
        }

        /* WP: substituir pelo envio real (admin-post.php, WPForms, CF7...).
           Até então, o formulário é honesto sobre não ter backend. */
        if (estado) {
          var texto = estado.querySelector("[data-form-msg]");
          if (texto) {
            texto.textContent =
              "Dados validados. O envio ainda não está conectado a um servidor — " +
              "use o WhatsApp para falar com um consultor agora.";
          }
          estado.setAttribute("data-visivel", "true");
          estado.setAttribute("role", "status");
        }
      });
    }
  );
})();

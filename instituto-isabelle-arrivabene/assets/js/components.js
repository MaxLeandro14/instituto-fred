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
     CARROSSEL — cursos e depoimentos, sobre a Embla Carousel.
     A lib vem de assets/js/vendor/embla-carousel.umd.js (carregada só na
     home). Sem ela, a janela continua rolando com scroll-snap nativo e as
     setas usam o modo de reserva logo abaixo: nada depende da lib existir.

     data-carrossel="cursos"       alinhado ao texto, para nas pontas, régua
                                   de posição e paralaxe nas fotos.
     data-carrossel="depoimentos"  laço centrado, vizinhos recuam, pontos e
                                   passagem automática com pausa.
     ======================================================================== */
  var limita = function (v, min, max) {
    return Math.min(max, Math.max(min, v));
  };

  /* Modo de reserva: rolagem nativa da janela, por passo de item. */
  var carrosselNativo = function (janela, trilha, anterior, proximo, progresso) {
    var itens = trilha.children;
    var total = itens.length;

    var passo = function () {
      if (total > 1) return itens[1].offsetLeft - itens[0].offsetLeft;
      return janela.clientWidth;
    };

    var atualiza = function () {
      var max = janela.scrollWidth - janela.clientWidth;
      var pos = janela.scrollLeft;
      if (anterior) anterior.disabled = pos <= 2;
      if (proximo) proximo.disabled = pos >= max - 2;

      if (progresso) {
        var p = passo();
        var atual = p ? Math.round(pos / p) + 1 : 1;
        var visiveis = p ? Math.max(1, Math.round(janela.clientWidth / p)) : 1;
        var paginas = Math.max(1, total - visiveis + 1);
        progresso.textContent =
          String(Math.min(atual, paginas)) + " / " + String(paginas);
      }
    };

    var move = function (direcao) {
      janela.scrollBy({
        left: passo() * direcao,
        behavior: reduzido ? "auto" : "smooth"
      });
    };

    if (anterior) anterior.addEventListener("click", function () { move(-1); });
    if (proximo) proximo.addEventListener("click", function () { move(1); });

    var travado = false;
    janela.addEventListener(
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

    janela.addEventListener("keydown", function (e) {
      if (e.target !== janela) return;
      if (e.key === "ArrowRight") { e.preventDefault(); move(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); move(-1); }
    });

    atualiza();
  };

  /* Passagem automática dos depoimentos. Escrita aqui (e não com o plugin
     de autoplay) para que a pausa do botão vença hover, foco e arrasto, e o
     cronômetro do ponto congele e retome exatamente de onde parou.
     Nunca liga com movimento reduzido. */
  var passagemAutomatica = function (carrossel, api, pausa, progresso) {
    var DURACAO = 7000;
    var timer = 0;
    var inicio = 0;
    var restante = DURACAO;
    var pausadoPeloUsuario = false;
    var sobre = false;
    var focado = false;
    var arrastando = false;
    var naTela = true;

    carrossel.style.setProperty("--tempo", DURACAO + "ms");

    var podeCorrer = function () {
      return !pausadoPeloUsuario && !sobre && !focado && !arrastando && naTela &&
        document.visibilityState !== "hidden";
    };

    var congela = function () {
      if (!timer) return;
      window.clearTimeout(timer);
      timer = 0;
      restante = Math.max(0, restante - (Date.now() - inicio));
    };

    var avanca = function () {
      timer = 0;
      if (api.canScrollNext()) api.scrollNext();
      else api.scrollTo(0);
    };

    var sincroniza = function () {
      var corre = podeCorrer();
      if (pausadoPeloUsuario) {
        congela();
        carrossel.removeAttribute("data-tempo");
      } else if (corre) {
        if (!timer) {
          inicio = Date.now();
          timer = window.setTimeout(avanca, restante);
        }
        carrossel.setAttribute("data-tempo", "corre");
      } else {
        congela();
        carrossel.setAttribute("data-tempo", "pausa");
      }
      /* Enquanto passa sozinho, o contador não fala a cada troca. */
      if (progresso) progresso.setAttribute("aria-live", corre ? "off" : "polite");
    };

    /* Cada troca de depoimento, venha de onde vier, recomeça o relógio. */
    api.on("select", function () {
      window.clearTimeout(timer);
      timer = 0;
      restante = DURACAO;
      carrossel.removeAttribute("data-tempo");
      void carrossel.offsetWidth; /* reinicia a animação do ponto */
      sincroniza();
    });

    api.on("pointerDown", function () { arrastando = true; sincroniza(); });
    api.on("pointerUp", function () { arrastando = false; sincroniza(); });

    /* Só o mouse pausa por estar em cima: no toque, "hover" não sai nunca. */
    carrossel.addEventListener("pointerenter", function (e) {
      if (e.pointerType !== "mouse") return;
      sobre = true;
      sincroniza();
    });
    carrossel.addEventListener("pointerleave", function (e) {
      if (e.pointerType !== "mouse") return;
      sobre = false;
      sincroniza();
    });

    /* Foco de teclado dentro do carrossel pausa; clique de mouse não. */
    carrossel.addEventListener("focusin", function (e) {
      var teclado = true;
      try { teclado = e.target.matches(":focus-visible"); } catch (erro) {}
      focado = teclado;
      sincroniza();
    });
    carrossel.addEventListener("focusout", function (e) {
      if (carrossel.contains(e.relatedTarget)) return;
      focado = false;
      sincroniza();
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entradas) {
        naTela = entradas[0].isIntersecting;
        sincroniza();
      }, { threshold: 0.35 }).observe(carrossel);
    }

    document.addEventListener("visibilitychange", sincroniza);

    if (pausa) {
      pausa.hidden = false;
      pausa.addEventListener("click", function () {
        pausadoPeloUsuario = !pausadoPeloUsuario;
        if (!pausadoPeloUsuario) restante = DURACAO;
        pausa.setAttribute("data-pausado", pausadoPeloUsuario ? "true" : "false");
        pausa.setAttribute(
          "aria-label",
          pausadoPeloUsuario
            ? "Retomar a passagem automática"
            : "Pausar a passagem automática"
        );
        sincroniza();
      });
    }

    sincroniza();
  };

  var carrosselEmbla = function (carrossel, janela, trilha, anterior, proximo, progresso) {
    var depoimentos = carrossel.getAttribute("data-carrossel") === "depoimentos";
    var slides = Array.prototype.slice.call(trilha.children);
    var regua = carrossel.querySelector("[data-carrossel-regua]");

    /* O CSS do modo Embla entra antes da medição: corte, sem snap, e nos
       depoimentos a trilha perde o recuo inicial (o laço é centrado). */
    carrossel.setAttribute("data-embla", "");
    janela.scrollLeft = 0;

    /* Cursos: cada parada alinha a ficha ao gutter da página, que é o
       recuo da trilha. Recalculado a cada reInit (resize). */
    var folga = function () {
      return parseFloat(window.getComputedStyle(trilha).paddingLeft) || 0;
    };

    var api = window.EmblaCarousel(
      janela,
      depoimentos
        ? { loop: true, align: "center", duration: 32 }
        : {
            align: function () { return folga(); },
            containScroll: "trimSnaps",
            duration: 30
          }
    );

    var atualizaControles = function () {
      if (anterior) anterior.disabled = !api.canScrollPrev();
      if (proximo) proximo.disabled = !api.canScrollNext();
      if (progresso) {
        progresso.textContent =
          String(api.selectedScrollSnap() + 1) + " / " +
          String(api.scrollSnapList().length);
      }
    };

    /* Régua dos cursos: largura = parte visível da trilha; posição = progresso. */
    var atualizaRegua = function () {
      if (!regua) return;
      var vista = janela.clientWidth;
      var percurso = api.internalEngine().limit.length;
      var porcao = percurso > 1 ? vista / (vista + percurso) : 1;
      var p = limita(api.scrollProgress(), 0, 1);
      regua.style.setProperty("--porcao", (porcao * 100).toFixed(2) + "%");
      regua.style.setProperty(
        "--deslize",
        (p * (1 / porcao - 1) * 100).toFixed(2) + "%"
      );
    };

    /* Paralaxe dos cursos: a foto corre contra o arrasto, na medida da
       distância da ficha ao centro da janela. */
    var paralaxe = function () {
      if (reduzido) return;
      var caixa = janela.getBoundingClientRect();
      if (!caixa.width) return;
      var centro = caixa.left + caixa.width / 2;
      var desvios = slides.map(function (slide) {
        var r = slide.getBoundingClientRect();
        return (r.left + r.width / 2 - centro) / caixa.width;
      });
      desvios.forEach(function (d, i) {
        slides[i].style.setProperty("--paralaxe", (limita(d, -1, 1) * -6).toFixed(2) + "%");
      });
    };

    /* Depoimentos: --perto em cada cartão (1 no centro, 0 a um passo),
       calculado sobre o progresso da trilha, inclusive nos itens que o
       laço reposiciona (receita de "tween" da documentação da Embla). */
    var cartoes = slides.map(function (slide) {
      return slide.querySelector(".depoimento") || slide;
    });

    var aproxima = function (evento) {
      var engine = api.internalEngine();
      var progressoAtual = api.scrollProgress();
      var naVista = api.slidesInView();
      var rolando = evento === "scroll";
      var snaps = api.scrollSnapList();
      var fator = snaps.length;

      snaps.forEach(function (snap, iSnap) {
        engine.slideRegistry[iSnap].forEach(function (iSlide) {
          if (rolando && naVista.indexOf(iSlide) === -1) return;
          var diferenca = snap - progressoAtual;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach(function (ponto) {
              var alvo = ponto.target();
              if (iSlide === ponto.index && alvo !== 0) {
                if (alvo < 0) diferenca = snap - (1 + progressoAtual);
                if (alvo > 0) diferenca = snap + (1 - progressoAtual);
              }
            });
          }

          var perto = limita(1 - Math.abs(diferenca * fator), 0, 1);
          cartoes[iSlide].style.setProperty("--perto", perto.toFixed(3));
        });
      });
    };

    /* Pontos dos depoimentos: um botão por parada. */
    var pontos = [];
    var caixaPontos = carrossel.querySelector("[data-carrossel-pontos]");
    var montaPontos = function () {
      if (!depoimentos || !caixaPontos) return;
      caixaPontos.innerHTML = "";
      var total = api.scrollSnapList().length;
      pontos = api.scrollSnapList().map(function (_, i) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "carrossel__ponto";
        b.setAttribute("aria-label", "Depoimento " + (i + 1) + " de " + total);
        b.innerHTML =
          '<span class="carrossel__ponto-barra" aria-hidden="true">' +
          '<span class="carrossel__ponto-tempo"></span></span>';
        b.addEventListener("click", function () { api.scrollTo(i, reduzido); });
        caixaPontos.appendChild(b);
        return b;
      });
      caixaPontos.hidden = total < 2;
      marcaPonto();
    };
    var marcaPonto = function () {
      var atual = api.selectedScrollSnap();
      pontos.forEach(function (b, i) {
        if (i === atual) b.setAttribute("aria-current", "true");
        else b.removeAttribute("aria-current");
      });
    };

    if (anterior) anterior.addEventListener("click", function () { api.scrollPrev(reduzido); });
    if (proximo) proximo.addEventListener("click", function () { api.scrollNext(reduzido); });

    janela.addEventListener("keydown", function (e) {
      if (e.target !== janela) return;
      if (e.key === "ArrowRight") { e.preventDefault(); api.scrollNext(reduzido); }
      if (e.key === "ArrowLeft") { e.preventDefault(); api.scrollPrev(reduzido); }
    });

    api.on("pointerDown", function () { carrossel.setAttribute("data-arrastando", ""); });
    api.on("pointerUp", function () { carrossel.removeAttribute("data-arrastando"); });

    api.on("select", atualizaControles).on("reInit", atualizaControles);

    if (depoimentos) {
      if (progresso) progresso.classList.add("vis-oculto");
      api.on("select", marcaPonto).on("reInit", montaPontos);
      api.on("scroll", aproxima).on("reInit", aproxima).on("slideFocus", aproxima);
      montaPontos();
      aproxima();
      if (!reduzido) {
        passagemAutomatica(
          carrossel,
          api,
          carrossel.querySelector("[data-carrossel-pausa]"),
          progresso
        );
      }
    } else {
      api.on("scroll", atualizaRegua).on("reInit", atualizaRegua);
      api.on("scroll", paralaxe).on("reInit", paralaxe);
      atualizaRegua();
      paralaxe();
    }

    atualizaControles();
  };

  Array.prototype.forEach.call(
    document.querySelectorAll("[data-carrossel]"),
    function (carrossel) {
      var janela = carrossel.querySelector("[data-carrossel-janela]");
      var trilha = carrossel.querySelector("[data-carrossel-trilha]");
      var anterior = carrossel.querySelector("[data-carrossel-ant]");
      var proximo = carrossel.querySelector("[data-carrossel-prox]");
      var progresso = carrossel.querySelector("[data-carrossel-progresso]");
      if (!janela || !trilha) return;

      if (typeof window.EmblaCarousel === "function") {
        carrosselEmbla(carrossel, janela, trilha, anterior, proximo, progresso);
      } else {
        carrosselNativo(janela, trilha, anterior, proximo, progresso);
      }
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

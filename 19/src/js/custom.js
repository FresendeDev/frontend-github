// ******* MINHAS CONFIGURACOES
// jQuery(function ($) {});
// $(document).ready(function () {});

// $(".owl-carousel").owlCarousel({
//   //   items: 3,
//   lazyLoad: true,
//   //   loop: true,
//   //   margin: 10,
// });

// $(".featured-item a").addClass("btn btn-primary");
// $(".featured-item").addClass("p-2");

// $(".featured-item h4").click(function () {
//   $(this).css({
//     color: "#f00",
//   });
// });

// $(".featured-item h4").dblclick(function () {
//   $(this).css({
//     color: "white",
//     background: "black",
//   });
// });

// $(".featured-item a").click(function (e) {
//   e.preventDefault();
//   alert("produto esgotado");
// });

// $(".owl-stage>.owl-item:nth-child(3)>.featured-item a").click(function (e) {
//   e.preventDefault();
//   alert("produto esgotado");
// });

// ******************  PROFESSOR
// instancia jquery e evita conflitos
// jQuery( function($){

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    stagePadding: 50,
    loop: true,
    margin: 10,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      600: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 3,
        nav: true,
      },
    },
  });

  let titulos = $("h4"); // tag

  let itens = $(".featured-items"); // class

  let destaques = $("#featured"); // id

  console.log(titulos.first());

  // Configuração de produtos

  $(".featured-item a").addClass("btn btn-dark stretch-link");

  $(".featured-item:first h4").append(
    '<span class="badge bg-secondary">Novo</span>'
  );
  // $('.featured-item:first h4').start('<span class="badge bg-secondary">Novo</span>')
  // $('.featured-item:first h4').html('<span class="badge bg-secondary">Novo</span>')
  // $('.featured-item:first h4').addClass('active')
  // $('.featured-item:first h4').removeClass('active')
  // $('.featured-item:first h4').toggleClass('active')
  // $('.featured-item:first h4').hide()
  // $('.featured-item:first h4').show()
  // $('.featured-item:first h4').fadeIn(2000)
  // $('.featured-item:first h4').fadeOut()
  //  $('.featured-item:first h4').css('color', '#f00')

  $("#form-submit").on("click", function (e) {
    e.preventDefault();

    if ($("#email").val() != "") {
      $("#email").animate(
        {
          opacity: "toggle",
          top: "-50",
        },
        500,
        function () {
          console.log($(this).val());
        }
      );
    }
  });

  $(".featured-item h4").dblclick(function () {
    $(this).css({
      color: "#f00",
      background: "#ff0",
      "font-weight": "100",
    });
  });

  /*
   * Manipulação de eventos
   */
  $(".featured-item a").on("blur", function (event) {
    event.preventDefault();
    alert("Produto esgotado");
  });

  /*
   * Ouvinte de eventos .nav-modal-open
   */
  $(".nav-modal-open").on("click", function (e) {
    e.preventDefault();

    let elem = $(this).attr("rel");

    $(".modal-body").html($("#" + elem).html());
    $(".modal-title").html($(this).text());
  });

  /*
   * Ouvinte de eventos submit
   */

  // adicioneu esse bloco

  // add

  /*
   * Ouvinte de eventos submit modal
   */

  function validate(elem) {
    if (elem.val() == "") {
      console.log("o campo de " + elem.attr("name") + " é obrigatório");

      elem.parent().find(".text-muted").show();

      elem.addClass("invalid");

      return false;
    } else {
      elem.parent().find(".text-muted").hide();
      elem.removeClass("invalid");
    }
  }

  $("body").on("submit", ".modal-body .form", function (e) {
    e.preventDefault();

    const inputName = $("#nome");
    const inputEmail = $("#email");

    validate(inputName);
    validate(inputEmail);

    if (inputEmail.hasClass("invalid") || inputName.hasClass("invalid")) {
      console.log("verificar campos obrigatórios");
      return false;
    } else {
      $(this).submit();
    }
  });

  $("body").on("blur", "#nome", function () {
    validate($(this));
  });

  $("body").on("blur", "#email", function () {
    validate($(this));
  });

  $("body").on("focus", "#date", function () {
    $(this).datepicker();
  });

  $("body").on("blur", "#date", function () {
    validate($(this));
    $(this).mask("00/00/0000");
  });

  $("body").on("blur", "#time", function () {
    validate($(this));
    $(this).mask("00:00");
  });

  $("body").on("blur", "#cep", function () {
    validate($(this));
    $(this).mask("00000-000");
  });

  $("body").on("blur", "#phone", function () {
    validate($(this));
    $(this).mask("00000-0000");
  });

  $("body").on("blur", "#cpf", function () {
    // valid cpf

    let value_cpf = document.querySelector("#cpf");
    console.log(value_cpf);

    value_cpf.addEventListener("keydown", function (e) {
      if (e.key > "a" && e.key < "z") {
        e.preventDefault();
      }
    });
    value_cpf.addEventListener("blur", function (e) {
      //Remove tudo o que não é dígito
      let validar_cpf = this.value.replace(/\D/g, "");

      //verificação da quantidade números
      if (validar_cpf.length == 11) {
        // verificação de CPF valido
        var Soma;
        var Resto;

        Soma = 0;
        for (i = 1; i <= 9; i++)
          Soma = Soma + parseInt(validar_cpf.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if (Resto == 10 || Resto == 11) Resto = 0;
        if (Resto != parseInt(validar_cpf.substring(9, 10)))
          return console.log("cpf invalido-1"), $("#cpf").addClass("invalid");
        // alert("CPF Inválido!");

        Soma = 0;
        for (i = 1; i <= 10; i++)
          Soma = Soma + parseInt(validar_cpf.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if (Resto == 10 || Resto == 11) Resto = 0;
        if (Resto != parseInt(validar_cpf.substring(10, 11)))
          return console.log("cpf invalido-2"), $("#cpf").addClass("invalid");
        // alert("CPF Inválido!");

        //formatação final
        cpf_final = validar_cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf_final = cpf_final.replace(/(\d{3})(\d)/, "$1.$2");
        cpf_final = cpf_final.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        (document.getElementById("cpf").value = cpf_final),
          $("#cpf").removeClass("invalid");
      } else {
        // alert("CPF Inválido! É esperado 11 dígitos numéricos.");
        console.log("Necessário 11 digitos");
        $("#cpf").addClass("invalid");
      }
    });

    // end cpf
  });
});

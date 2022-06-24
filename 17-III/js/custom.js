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

  /*
   * Ouvinte de eventos submit modal
   */

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
});

/**
 * 
 * 


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


// callback

$(document).ready(function () {
  $(".featured-item:nth(5)")
    .hide(1000, function () {
      console.log($(this).find("h4").text() + " esgotado");
    })
    .show(1000, function () {
      console.log($(this).find("h4").text() + " em estoque");
    });

  // animacoes
  const duracao = 1000;
  $(".featured-item:nth(6)")
    .hide(duracao)
    .show(duracao)
    .fadeOut(duracao)
    .fadeIn(duracao)
    .toggle(duracao)
    .toggle(duracao);
});
*/

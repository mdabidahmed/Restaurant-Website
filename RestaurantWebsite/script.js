$(document).ready(function () {
  $(".dropdown, .btn-group").hover(function () {
    var dropdownMenu = $(this).children(".dropdown-menu");
    if (dropdownMenu.is(":visible")) {
      dropdownMenu.parent().toggleClass("open");
    }
  });
});
$("#page").hide();
$(document).ready(function () {
  console.log("dom is ready");

  $("#search-btn").click(function () {
    console.log("button clicked");

    var searchQuery = $("#search-query").val();
    getData(searchQuery);
    $("#page").show();
    document.getElementById("results").remove();
    $("#page").css("margin-left", "1100px");

    console.log("query: ", searchQuery);
  });
});

function getData(searchQuery) {
  var remImg = document.getElementById("bgImage");
  remImg.classList.remove("bgImage");
  var url = "https://forkify-api.herokuapp.com/api/search";

  $.getJSON(
    url,
    {
      q: searchQuery,
      format: "json",
      pretty: 1,
    },
    function (response) {
      console.log(response.recipes[0]);
      //document.body.backgroundImage = "none";
      var remImg = document.getElementById("bgImage");
      remImg.classList.remove("bgImage");
      var k = 0;

      for (let i = 0; i < response.recipes.length; i++) {
        var container1 = document.getElementById("cont");
        var row1 = document.createElement("div");
        row1.className = "row d-flex justify-content-center";
        row1.style = "display:flex";
        container1.appendChild(row1);
        // console.log("for i :" + i);
        for (let j = 1; j <= 3; j++) {
          if (k < 10) {
            var col1 = document.createElement("div");
            col1.className = "col ";
            // col1.innerHTML = `col-${k}`;
            row1.appendChild(col1);
            var a = document.createElement("a");
            a.className = "content-wrapper";
            var url = response.recipes[i].source_url;
            // console.log(url);
            a.setAttribute("href", url);
            // imgDiv.appendChild(a);

            col1.appendChild(a);
            var imgDiv = document.createElement("div");
            imgDiv.className = "image";
            imgDiv.id = "imgId";
            var ImgUrl = response.recipes[k].image_url;
            imgDiv.style.backgroundImage = `url('${ImgUrl}')`;

            imgDiv.style.width = "370px";
            imgDiv.style.height = "250px";
            imgDiv.style.margin = "20px";
            imgDiv.innerHTML = `click see details${k + 1}`;
            a.appendChild(imgDiv);
            var title = document.createElement("h3");
            title.className = "title";
            title.innerHTML = response.recipes[k].title;
            title.style.marginLeft = "20px";
            //////////////////////////////////////// recipe_id
            var publisher = document.createElement("h4");
            publisher.className = "publisher";
            publisher.innerHTML = "By:" + response.recipes[j].publisher;
            publisher.style.marginLeft = "20px";
            /////////////////////////////////////
            var recipeid = document.createElement("p");
            recipeid.id = "recId";
            recipeid.className = "recipe_id";
            recipeid.innerHTML = "recipe id:" + response.recipes[k].recipe_id;
            recipeid.style.marginLeft = "20px";
            recipeid.style.marginTop = "20px";
            a.before(recipeid);

            a.after(publisher);
            a.after(title);
            var button1 = document.createElement("button");
            button1.id = "btn";
            button1.className = "btn btn-primary";
            button1.style.marginLeft = "20px";
            button1.innerHTML = "see recipes";
            button1.value = response.recipes[k].recipe_id;
            button1.setAttribute("onclick", "seeRecipes();");

            a.after(button1);
            var x = document.createElement("hr");

            a.after(x);
            recipeid.before(x);

            k++;
          }
        }
      }
    }
  );
}

// function seeRecipes() {
//   // console.log("click", recipeid);
//   document.getElementById("cont").remove();
//   // var clickedButton = document.getElementById("[Button=value]").value;
//   console.log("clickedButton");
//   fetch("https://forkify-api.herokuapp.com/api/get?rId=47746")
//     .then(response => {
//       return response.json();
//     })
//     .then(myJson => {
//       console.log(myJson);
//       // console.log(recId1);
//     });
//   // var searchquery = document.getElementById("search-query").value();
//   // console.log(searchQuery);
//   var baseURL = "https://forkify-api.herokuapp.com/api/search?q=";

//   fetch("https://forkify-api.herokuapp.com/api/search?q=pizza")
//     .then(response => {
//       return response.json();
//     })
//     .then(myJson => {
//       console.log(myJson);
//       for (var i = 0; i < myJson.recipes.length; i++) {
//         var recId1 = myJson.recipes[i].recipe_id;
//         console.log(recId1);
//       }
//     });
// }

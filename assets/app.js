var myIndex = 0;
carousel();
function carousel() {
  const x = document.getElementsByClassName("slide-img");
  for (let i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 3000); // Change image every 3 seconds
}
//let buyButton = document.getElementById("buy-now1");
var buyDashboards = document.querySelectorAll(".buy-now2");//dashboard
var buyIndexs = document.querySelectorAll(".buy-now");
var reports = document.querySelectorAll(".flagger");
var modal = document.getElementById("myModal");
var buyModal = document.getElementById("buyModal");
var profileModal = document.getElementById("profileModal");
var view_profile = document.getElementById("view_profile");
//var sellBtn = document.querySelector('#sellBtn');
var close_buy = document.querySelector('#close-buy');


buyDashboards.forEach( btn_buy => {
  btn_buy.addEventListener('click', () => { 
    console.log('hello');
    buyModal.style.display = "block";
   close_buy.addEventListener('click', () => {
      console.log('goodbye')
      buyModal.style.display = "none";
    })
    window.addEventListener('click', (event) => {
      if (event.target == buyModal) {
        buyModal.style.display = "none";
      }
    })  
   
  })
})



view_profile.addEventListener('click', () => { 
  console.log('hello');
  profileModal.style.display = "block";
 close_buy.addEventListener('click', () => {
    console.log('goodbye')
    profileModal.style.display = "none";
  })
  window.addEventListener('click', (event) => {
    if (event.target == profileModal) {
      profileModal.style.display = "none";
    }
  })  
 
})






buyIndexs.forEach( buy_btn => {
  buy_btn.addEventListener('click', () => {
    modal.style.display = "block";

    close_buy.addEventListener('click', () => {
      console.log('hello world')
      modal.style.display = "none";
    }) 
  
    window.addEventListener('click', (event) => {
      if (event.target == buyModal) {
        buyModal.style.display = "none";
      }
    })  
 
  })
 
})

/*sellBtn.addEventListener('click', () => {
  modal.style.display = "block"; 
  close_buy.addEventListener('click', () => {
    console.log('hello world')
    modal.style.display = "none";
  }) 
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
})*/

reports.forEach( report => {
  report.addEventListener('click', () => {
    modal.style.display = "block";
    close_buy.addEventListener('click', () => {
      console.log('hello world')
      modal.style.display = "none";
    }) 
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  })
})

function myFunction1() {
  document.getElementById("t01").deleteRow(1);
}
function myFunction2() {
  document.getElementById("t01").deleteRow(2);
}
function myFunction3() {
  document.getElementById("t01").deleteRow(3);
}
function myFunction4() {
  document.getElementById("t01").deleteRow(4);
}

function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#blah')
              .attr('src', e.target.result)
              .width(200)
              .height(100);
      };

      reader.readAsDataURL(input.files[0]);
  }
}



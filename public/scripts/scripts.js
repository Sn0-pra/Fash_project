// const authroute = require('../routes/auth');

// function func(){

//         $.get('/trial-2', function () {
//         console.log("Done");
//       });

// }

function signUpfunc(){
    //   window.location.href = '/signUppage'
    $( "#sign_block" ).load( "/signUppage" );
  console.log("Done");
}

function signInfunc(){
    // window.location.href = '/signInpage'
    $( "#sign_block" ).load( "/signInpage" );

    console.log("Done");
}

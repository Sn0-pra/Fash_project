
const firebaseConfig = {
    apiKey: "AIzaSyA3D_xlgu84N6tCxbsck2GPznZNbqi0rb8",
    authDomain: "web-trial-35ee1.firebaseapp.com",
    projectId: "web-trial-35ee1",
    storageBucket: "web-trial-35ee1.appspot.com",
    messagingSenderId: "343717021088",
    appId: "1:343717021088:web:319595f686920a9ad7d0c5",
    measurementId: "G-WFTRX0LW8N"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// contst analytics = getAnalytics(firebaseapp);

function signIn(){
    var email = document.getElementById('iemail').value;
    var pass = document.getElementById('ipassword').value;
    
    console.log("signin clicked : ",email,pass);
    
    firebase.auth().signInWithEmailAndPassword(email, pass).then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        window.location.href = '/content';
    })
       .catch(function(error) {
            // Handle Errors here.
           let errorCode = error.code;
           let errorMessage = error.MESSAGE;
           console.log(errorCode);
           console.log(errorMessage);
        });
}

function signUp(){
    var email = document.getElementById('uemail').value;
    var pass = document.getElementById('upassword').value;
    
    console.log("signup clicked : ",email,pass);
    
    firebase.auth().createUserWithEmailAndPassword(email, pass).then((userCredential) => {
        const user = userCredential.user
        console.log(user);
        window.location.href = '/content';
    })
       .catch(function(error) {
            // Handle Errors here.
           let errorCode = error.code;
           let errorMessage = error.MESSAGE;
           console.log(errorCode);
           console.log(errorMessage);
        });
}

function signOut(){
    firebase.auth().signOut(auth).then(()=>{
        console.log("Sign Out Successfull");
    }).catch((error) => {
        console.log(error);
    });
}
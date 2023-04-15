function passcheck() {
    var password = document.getElementById("pass").value;
    var confirm_password = document.getElementById("cpass").value;
  
    if (password != confirm_password) {
      alert("Passwords do not match.");
    }
  }
  
import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import '../css/main.css'
import '../css/util.css'

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      isWait: false,
      waitingTime: 0,
      countError: 0,
      errorMessage: "",
      isRecaptchaClicked:false
    };
    this._reCaptchaRef = React.createRef();
  }
  render() {
    const handleClickRecaptcha = (event) => {
      this.setState({ isRecaptchaClicked: true });
    }
    const handleSubmit = (event) => {
      event.preventDefault();

      var { inputUsername, inputPassword } = document.forms[0];
      var username = inputUsername.value;
      var password = inputPassword.value;

      if (username !== "tasyaamalia") {
        this.setState({ isError: true, errorMessage: "Username salah" , isRecaptchaClicked:false});
        event.target.reset();
        this.captcha.reset()
      } else if (password !== "qwerty123") {
        this.setState({ isError: true, errorMessage: "Password salah", isRecaptchaClicked:false});
        event.target.reset();
        this.captcha.reset()
      } else if(this.state.isRecaptchaClicked === false){
        this.setState({ isError: true, errorMessage: "You must confirm you are not a robot" });
        event.target.reset();
      }
      else {
        window.open("/dashboard", "_self").focus();
      }

      if (this.state.isError) {
        this.setState({ countError: this.state.countError + 1 });
        if (this.state.countError === 2) {
          this.setState({
            waitingTime: 30,
            countError: 0,
            errorMessage: "Percobaan Login salah 3 kali. Silakan menunggu 30 detik.",
          });
          setTimeout(() => {
            this.setState({ waitingTime: 0, isError: false });
          }, 30000);
        }
      } else {
      }
    };
    return (
        <div class="limiter">
          <div class="container-login100">
            <div class="wrap-login100">
              <form class="login100-form validate-form" onSubmit={handleSubmit}>
                <span class="login100-form-title">
                  Login
                </span>
                {this.state.isError ? (
                    <div class="alert alert-danger" role="alert">
                      {this.state.errorMessage}
                    </div>
                  ) : null}
                <div class="wrap-input100 validate-input">
                  <input class="input100" type="text" placeholder="Username" name="inputUsername" required></input>
                  <span class="focus-input100"></span>
                  <span class="symbol-input100">
                    <i class="bi bi-person-circle" aria-hidden="true"></i>
                  </span>
                </div>

                <div class="wrap-input100 validate-input">
                  <input class="input100" type="password" placeholder="Password" id="password-field" name="inputPassword" required></input>
                  <span class="focus-input100"></span>
                  <span class="symbol-input100">
                    <i class="bi bi-file-lock-fill" aria-hidden="true"></i>
                  </span>
                </div>

                <div class="container-login100-form-btn">
                <ReCAPTCHA sitekey="6LePlRYkAAAAAG3QDW-jP6ygk1p7e3zTfdStfSV3" onChange={handleClickRecaptcha} ref={(r) => this.captcha = r}/>
                  <button type="submit" class="login100-form-btn"  disabled={this.state.waitingTime > 0}>
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

export default Login;

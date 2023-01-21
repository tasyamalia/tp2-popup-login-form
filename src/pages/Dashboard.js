import React, { Component } from "react";
// import { Button, Card, Form } from "react-bootstrap";
import { IdleTimerProvider } from "react-idle-timer";
import Swal from "sweetalert2";
// import withReactContent from 'sweetalert2-react-content'

function Home() {
  return (
    <div className="app">
      <div class="container-login100">
      <div class="wrap-login100">
        <h1 className="text-center mt-3 mb-4">Welcome,</h1>
        <h1 className="text-center mt-3 mb-4">2301968954</h1>
        <h1 className="text-center mt-3 mb-4">Tasya Amalia Salsabila</h1>
        </div>
      </div>
    </div>
  );
}


export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.idleTimer = null;
    this.handleOnIdle = this.handleOnIdle.bind(this);
  }
  render() {
    return (
      <div>
        <IdleTimerProvider
          ref={(ref) => {
            this.idleTimer = ref;
          }}
          timeout={1000 * 30}
          onIdle={this.handleOnIdle}
          debounce={250}
        />
        <Home />
      </div>
    );
  }

  handleOnIdle(event) {
    Swal.fire({
        title:'Peringatan',
        html:'Tidak ada kegiatan selama 30 detik, silahkan login kembali',
        icon:'question',
        allowOutsideClick:false
    }
      ).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            window.open('/', '_self').focus();
            window.open('/', '_self').focus();
        } 
      })
  }
}

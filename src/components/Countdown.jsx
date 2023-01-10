import React, { Component } from "react";
import "./Countdown.css";

class Countdown extends Component {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    const christmasDay = new Date("December 24, 2023");
    const differenceInTime = christmasDay.getTime() - currentDate.getTime();
    this.state = {
      count: Math.floor(differenceInTime / 1000),
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }
  render() {
    const { days, hours, minutes, seconds } = this.state;
    return (
      <div>
        <h1 className="countdownHeader">Countdown to Christmas:</h1>
        <p className="countdownText">
          {days} days, {hours} hours, {minutes} minutes, {seconds} seconds.
        </p>
      </div>
    );
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ count: this.state.count - 1 });
      this.calculateCountdown();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  calculateCountdown() {
    const { count } = this.state;
    this.setState({
      days: Math.floor(count / 86400),
      hours: Math.floor((count % 86400) / 3600),
      minutes: Math.floor(((count % 86400) % 3600) / 60),
      seconds: count % 864,
    });
  }
}

export default Countdown;

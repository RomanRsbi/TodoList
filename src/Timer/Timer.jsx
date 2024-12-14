import { Component } from 'react';

export default class Timer extends Component {
  timeCount = Number(this.props.sec) + Number(this.props.min) * 60;

  state = {
    seconds: this.timeCount,
    isActive: false,
  };

  interval = null;

  nilFirst(t) {
    if (t.toString().length === 1) return '0' + t;
    return t.toString();
  }

  toTime(sec) {
    return this.nilFirst(Math.trunc(sec / 60)) + ':' + this.nilFirst(sec % 60);
  }

  oneTick = () => {
    if (this.state.seconds === 0) return;
    this.setState(prevState => {
      return {
        seconds: prevState.seconds - 1,
      };
    });
  };

  startTimer = () => {
    this.setState({ isActive: true });
    if (!this.interval) {
      this.interval = setInterval(this.oneTick, 1000);
    }
  };

  stopTimer = () => {
    this.setState({ isActive: false });
    clearInterval(this.interval);
    this.interval = null;
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <span className="description">
        <button className="icon icon-play" onClick={this.startTimer}></button>
        <button className="icon icon-pause" onClick={this.stopTimer}></button>
        {this.state.seconds === 0 ? 'Time is up' : this.toTime(this.state.seconds)}
      </span>
    );
  }
}

import { Component } from 'react';

export default class Timer extends Component {
  state = {
    seconds: Number(this.props.sec) + Number(this.props.min) * 60,
    isActive: false,
  };

  interval = null;

  nullFirst(t) {
    if (t.toString().length === 1) return '0' + t;
    return t.toString();
  }

  toTime(sec) {
    return this.nullFirst(Math.trunc(sec / 60)) + ':' + this.nullFirst(sec % 60);
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

  componentDidUpdate(prevProps) {
    if (prevProps.min !== this.props.min || prevProps.sec !== this.props.sec) {
      this.setState({
        seconds: Number(this.props.sec) + Number(this.props.min) * 60,
      });
    }
  }

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

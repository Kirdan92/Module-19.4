import React from 'react';
import ReactDOM from 'react-dom';

class Stopwatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			running: false,
			results: [],
			times: {
	            minutes: 0,
	            seconds: 0,
	            miliseconds: 0
	        }		
		};	
	}

  reset = () => {
    this.setState({
		  times: { 
		  	minutes: 0,
            seconds: 0,
         	miliseconds: 0
           }
        });
	}

	format(times) {
		return `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.miliseconds))}`;
	}

	pad0 = (value) => {
		let result = value.toString();
		if (result.length < 2) {
			result = '0' + result;
		}
		return result;
	}

	start = () => {
		if  (!this.state.running) { //czy timer nie jest juz uruchomiony
			this.setState({running: true});
			this.watch = setInterval(() => this.step(), 10); // co 10 ms odpala metode step()
		}
	}

	stop = () => {
		this.setState({running: false});
		clearInterval(this.watch);
	}

	step = () => {
		if (!this.state.running) return;
		this.calculate();
	}

	calculate = () => {
		//this.times = Object.Assign({}, this.state.times);
	    if (!this.state.running) return;
	    let ms = this.state.times.miliseconds;
	    let sec = this.state.times.seconds;
	    let min = this.state.times.minutes;

	    ms +=1;

	    if (ms >= 100) {
	      sec += 1;
	      ms = 0;
	    }
	    if (sec >= 60) {
	      min += 1;
	      sec = 0;
	    }

	    this.setState({
	      times: {
	        minutes: min,
	        seconds: sec,
	        miliseconds: ms
	      }
	    })
	    this.format(this.times)
    }

	resetTimer = () => {
		this.reset();	
	}

	saveTime = () => {
		if (this.state.times.minutes === 0 && this.state.times.seconds === 0 && this.state.times.miliseconds === 0) return;
		this.state.results.push(this.format(this.times).toString());
		console.log(this.state.results);
	}

	clearTimers = () => {
		this.setState({results: []})
	//albo nadpisanie do pustej tablicy albo przy komponencie li usuwac je osobno
	}

	render() {
		return(
			<div className="wrapper">
	      		<nav className="controls">
	      			<a
		              href="#"
		              className="button"
		              id="start"
		              onClick={this.start}>
		              Start
		            </a>
		            <a
		              href="#"
		              className="button"
		              id="start"
		              onClick={this.stop}>
		              Stop
		            </a>
		            <a
		              href="#"
		              className="button"
		              id="start"
		              onClick={this.resetTimer}>
		              Reset
		            </a>
		            <a
		              href="#"
		              className="button"
		              id="start"
		              onClick={this.saveTime}>
		              Save
		            </a>
	      		</nav>
	      		<div className="stopwatch">
	      			{this.format(this.times)}
	      		</div>
	      		<div className="saved-times">
	      			<a
	      				href="#"
	      				className="button"
	      				id="clear"
	      				onClick={this.clearTimers}>
	      				Clear
	      			</a>
	      			<h2>Lista czasów</h2>
	      			<ul className="results">
  				    	{this.state.results.map((time) =>
		                	{ return (
			                  <li key={time}>
			                    {time}
			                  </li>)
			                })
		              }
	      			</ul>
	      		</div>	
	      	</div>
		);
	}

}


ReactDOM.render(<Stopwatch />, document.getElementById('root'));
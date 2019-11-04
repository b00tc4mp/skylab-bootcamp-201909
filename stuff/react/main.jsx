const { Component } = React

class Calculin extends Component { // smart
    constructor() {
        super()

        this.state = { result: null }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()

        const { num1: { value: num1 }, num2: { value: num2 } } = event.target

        this.setState({ result: Number(num1) + Number(num2) })
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <input type="number" name="num1" /><input type="number" name="num2" />
            <button>=</button>
            {this.state.result && <Result value={this.state.result} />}
        </form>
    }
}

function Result(props) {
    return <span className="panel">{props.value}</span>
}

ReactDOM.render(<>
    <Calculin />
</>, document.getElementById('root'))